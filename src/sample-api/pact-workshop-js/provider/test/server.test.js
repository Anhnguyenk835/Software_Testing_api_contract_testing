const { createApp } = require('../server');

describe('provider app wiring', () => {
    let server;
    let baseUrl;

    beforeAll((done) => {
        server = createApp().listen(0, () => {
            baseUrl = `http://127.0.0.1:${server.address().port}`;
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    test('GET /products without an Authorization header returns 401', async () => {
        const res = await fetch(`${baseUrl}/products`);

        expect(res.status).toBe(401);
    });

    test('GET /products with a valid Bearer timestamp returns 200', async () => {
        const res = await fetch(`${baseUrl}/products`, {
            headers: { Authorization: `Bearer ${new Date().toISOString()}` },
        });

        expect(res.status).toBe(200);
    });

    test('POST /products without Authorization returns 401', async () => {
        const res = await fetch(`${baseUrl}/products`, { method: 'POST' });

        expect(res.status).toBe(401);
    });

    test('POST /products with valid auth and body creates a product', async () => {
        const res = await fetch(`${baseUrl}/products`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${new Date().toISOString()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 'CREDIT_CARD', name: 'New Card', version: 'v1' }),
        });
        const body = await res.json();

        expect(res.status).toBe(201);
        expect(body).toMatchObject({ type: 'CREDIT_CARD', name: 'New Card', version: 'v1' });
    });

    test('POST /products with valid auth but missing fields returns 400', async () => {
        const res = await fetch(`${baseUrl}/products`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${new Date().toISOString()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ version: 'v1' }),
        });

        expect(res.status).toBe(400);
    });

    test('PUT /product/:id updates an existing product', async () => {
        const res = await fetch(`${baseUrl}/product/10`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${new Date().toISOString()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 'CREDIT_CARD', name: 'Updated Name', version: 'v2' }),
        });
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body).toMatchObject({ id: '10', name: 'Updated Name' });
    });

    test('PUT /product/:id returns 404 for an unknown id', async () => {
        const res = await fetch(`${baseUrl}/product/does-not-exist`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${new Date().toISOString()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 'CREDIT_CARD', name: 'X', version: 'v1' }),
        });

        expect(res.status).toBe(404);
    });

    test('DELETE /product/:id removes an existing product', async () => {
        const res = await fetch(`${baseUrl}/product/11`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${new Date().toISOString()}` },
        });

        expect(res.status).toBe(204);
    });

    test('DELETE /product/:id returns 404 for an unknown id', async () => {
        const res = await fetch(`${baseUrl}/product/does-not-exist`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${new Date().toISOString()}` },
        });

        expect(res.status).toBe(404);
    });
});
