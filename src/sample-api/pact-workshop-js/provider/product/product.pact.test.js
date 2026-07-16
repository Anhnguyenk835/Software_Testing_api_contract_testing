const { Verifier } = require('@pact-foundation/pact');
const path = require('path');
const controller = require('./product.controller');
const Product = require('./product');
const { createApp } = require('../server');

// Setup provider server to verify
const server = createApp().listen("8080");

describe("Pact Verification", () => {
    it("validates the expectations of ProductService", () => {
        const opts = {
            logLevel: "INFO",
            providerBaseUrl: "http://127.0.0.1:8080",
            provider: "ProductService",
            providerVersion: process.env.GIT_COMMIT || "local",
            providerVersionBranch: process.env.GIT_BRANCH || "local",
            stateHandlers: {
                "product with ID 10 exists": () => {
                    controller.repository.products = new Map([
                        ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")]
                    ]);
                },
                "products exist": () => {
                    controller.repository.products = new Map([
                        ["09", new Product("09", "CREDIT_CARD", "Gem Visa", "v1")],
                        ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")]
                    ]);
                },
                "no products exist": () => {
                    controller.repository.products = new Map();
                },
                "product with ID 99 does not exist": () => {
                    controller.repository.products = new Map();
                },
                "a product can be created": () => {
                    controller.repository.products = new Map();
                },
                "product validation is enabled": () => {
                    controller.repository.products = new Map();
                },
            },
            requestFilter: (req, res, next) => {
                if (!req.headers["authorization"]) {
                    next();
                    return;
                }
                req.headers["authorization"] = `Bearer ${new Date().toISOString()}`;
                next();
            },
        };

        if (process.env.PACT_BROKER_URL) {
            Object.assign(opts, {
                pactBrokerUrl: process.env.PACT_BROKER_URL,
                pactBrokerUsername: process.env.PACT_BROKER_USERNAME,
                pactBrokerPassword: process.env.PACT_BROKER_PASSWORD,
                pactBrokerToken: process.env.PACT_BROKER_TOKEN,
                consumerVersionSelectors: [{ latest: true }],
                publishVerificationResult: process.env.PACT_PUBLISH_RESULTS === "true",
            });
        } else {
            opts.pactUrls = [
                path.resolve(
                    process.env.PACT_FILE ||
                    "../consumer/pacts/FrontendWebsite-ProductService.json"
                ),
            ];
        }

        return new Verifier(opts).verifyProvider().then(output => {
            console.log(output);
        }).finally(() => {
            server.close();
        });
    })
});
