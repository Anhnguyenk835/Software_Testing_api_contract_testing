const ProductRepository = require('../../product/product.repository');

describe('ProductRepository', () => {
    let repository;

    beforeEach(() => {
        repository = new ProductRepository();
    });

    describe('create', () => {
        test('adds a new product with a generated id and returns it', async () => {
            const created = await repository.create({ type: 'CREDIT_CARD', name: 'New Card', version: 'v1' });

            expect(created.id).toBeDefined();
            expect(created.type).toBe('CREDIT_CARD');
            expect(created.name).toBe('New Card');
            expect(created.version).toBe('v1');
            expect(await repository.getById(created.id)).toEqual(created);
        });
    });

    describe('update', () => {
        test('updates an existing product and returns it', async () => {
            const updated = await repository.update('10', { type: 'CREDIT_CARD', name: 'Updated Name', version: 'v2' });

            expect(updated).toEqual({ id: '10', type: 'CREDIT_CARD', name: 'Updated Name', version: 'v2' });
            expect(await repository.getById('10')).toEqual(updated);
        });

        test('returns undefined when the product does not exist', async () => {
            const updated = await repository.update('does-not-exist', { type: 'CREDIT_CARD', name: 'X', version: 'v1' });

            expect(updated).toBeUndefined();
        });
    });

    describe('remove', () => {
        test('deletes an existing product and returns true', async () => {
            const result = await repository.remove('10');

            expect(result).toBe(true);
            expect(await repository.getById('10')).toBeUndefined();
        });

        test('returns false when the product does not exist', async () => {
            const result = await repository.remove('does-not-exist');

            expect(result).toBe(false);
        });
    });
});
