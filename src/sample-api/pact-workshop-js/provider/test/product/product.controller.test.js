const controller = require('../../product/product.controller');
const Product = require('../../product/product');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe('product.controller', () => {
    beforeEach(() => {
        controller.repository.products = new Map([
            ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")],
        ]);
    });

    describe('create', () => {
        test('returns 201 with the created product when body is valid', async () => {
            const req = { body: { type: 'CREDIT_CARD', name: 'New Card', version: 'v1' } };
            const res = mockResponse();

            await controller.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ type: 'CREDIT_CARD', name: 'New Card', version: 'v1' }));
        });

        test('returns 400 when required fields are missing', async () => {
            const req = { body: { version: 'v1' } };
            const res = mockResponse();

            await controller.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

    describe('update', () => {
        test('returns the updated product when it exists', async () => {
            const req = { params: { id: '10' }, body: { type: 'CREDIT_CARD', name: 'Updated', version: 'v2' } };
            const res = mockResponse();

            await controller.update(req, res);

            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ id: '10', name: 'Updated' }));
        });

        test('returns 404 when the product does not exist', async () => {
            const req = { params: { id: 'missing' }, body: { type: 'CREDIT_CARD', name: 'X', version: 'v1' } };
            const res = mockResponse();

            await controller.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    describe('remove', () => {
        test('returns 204 when the product exists', async () => {
            const req = { params: { id: '10' } };
            const res = mockResponse();

            await controller.remove(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
        });

        test('returns 404 when the product does not exist', async () => {
            const req = { params: { id: 'missing' } };
            const res = mockResponse();

            await controller.remove(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });
});
