const fs = require('fs');
const path = require('path');

const brokerUrl = (process.env.PACT_BROKER_URL || process.env.PACT_BROKER_BASE_URL || '').replace(/\/$/, '');
const brokerToken = process.env.PACT_BROKER_TOKEN;
const consumerVersion = process.env.GIT_COMMIT || 'local';
const branch = process.env.GIT_BRANCH || 'main';

if (!brokerUrl || !brokerToken) {
    console.error('ERROR: PACT_BROKER_URL (or PACT_BROKER_BASE_URL) and PACT_BROKER_TOKEN are required.');
    process.exit(1);
}

const pactsDir = path.resolve(__dirname, '../consumer/pacts');
const pactFiles = fs.readdirSync(pactsDir).filter(f => f.endsWith('.json'));

if (pactFiles.length === 0) {
    console.error('ERROR: No pact files found in', pactsDir);
    process.exit(1);
}

const headers = {
    'Authorization': `Bearer ${brokerToken}`,
    'Content-Type': 'application/json',
};

async function publishPact(file) {
    const content = fs.readFileSync(path.join(pactsDir, file), 'utf8');
    const pact = JSON.parse(content);
    const consumer = pact.consumer.name;
    const provider = pact.provider.name;

    const putUrl = `${brokerUrl}/pacts/provider/${encodeURIComponent(provider)}/consumer/${encodeURIComponent(consumer)}/version/${encodeURIComponent(consumerVersion)}`;
    console.log(`\nPublishing: ${consumer} → ${provider} @ ${consumerVersion} (branch: ${branch})`);

    const putRes = await fetch(putUrl, {
        method: 'PUT',
        headers: {
            ...headers,
            'X-Pact-Consumer-Version-Branch': branch,
        },
        body: content,
    });
    if (!putRes.ok) {
        const text = await putRes.text();
        throw new Error(`PUT ${putUrl} → ${putRes.status}: ${text}`);
    }
    console.log(`  ✓ Pact uploaded + branch set (${putRes.status})`);
}

(async () => {
    console.log(`Publishing pacts to: ${brokerUrl}`);
    console.log(`Consumer version: ${consumerVersion}  Branch: ${branch}`);
    for (const file of pactFiles) {
        await publishPact(file);
    }
    console.log('\n✓ All pacts published successfully!');
    console.log(`\nView on Pactflow: ${brokerUrl}`);
})().catch(e => {
    console.error('\n✗ Publish failed:', e.message);
    process.exit(1);
});
