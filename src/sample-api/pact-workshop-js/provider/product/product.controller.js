const ProductRepository = require("./product.repository");

const repository = new ProductRepository();

exports.getAll = async (req, res) => {
    res.send(await repository.fetchAll())
};
exports.getById = async (req, res) => {
    const product = await repository.getById(req.params.id);
    product ? res.send(product) : res.status(404).send({message: "Product not found"})
};

exports.create = async (req, res) => {
    const { type, name, version } = req.body || {};
    if (!type || !name) {
        return res.status(400).send({ message: "type and name are required" });
    }
    const product = await repository.create({ type, name, version });
    res.status(201).send(product);
};

exports.update = async (req, res) => {
    const { type, name, version } = req.body || {};
    const updated = await repository.update(req.params.id, { type, name, version });
    updated ? res.send(updated) : res.status(404).send({ message: "Product not found" });
};

exports.remove = async (req, res) => {
    const deleted = await repository.remove(req.params.id);
    deleted ? res.status(204).send() : res.status(404).send({ message: "Product not found" });
};

exports.repository = repository;