const router = require('express').Router();
const controller = require('./product.controller');

router.get("/product/:id", controller.getById);
router.get("/products", controller.getAll);
router.post("/products", controller.create);
router.put("/product/:id", controller.update);
router.delete("/product/:id", controller.remove);

module.exports = router;