const Product = require('./product');

class ProductRepository {

    constructor() {
        this.products = new Map([
            ["09", new Product("09", "CREDIT_CARD", "Gem Visa", "v1")],
            ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")],
            ["11", new Product("11", "PERSONAL_LOAN", "MyFlexiPay", "v2")],
        ]);
        this._nextId = 12;
    }

    async fetchAll() {
        return [...this.products.values()]
    }

    async getById(id) {
        return this.products.get(id);
    }

    async create({ type, name, version }) {
        const id = String(this._nextId++);
        const product = new Product(id, type, name, version);
        this.products.set(id, product);
        return product;
    }

    async update(id, { type, name, version }) {
        const existing = this.products.get(id);
        if (!existing) {
            return undefined;
        }
        const updated = new Product(
            id,
            type ?? existing.type,
            name ?? existing.name,
            version ?? existing.version
        );
        this.products.set(id, updated);
        return updated;
    }

    async remove(id) {
        return this.products.delete(id);
    }
}

module.exports = ProductRepository;
