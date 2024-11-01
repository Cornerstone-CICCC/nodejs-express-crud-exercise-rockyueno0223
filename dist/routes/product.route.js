"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
// In-memory Database
let products = [];
// Get all products - B
productRouter.get('/', (req, res) => {
    res.status(200).json(products);
});
// Fetch product by search id query
productRouter.get('/search', (req, res) => {
    const { id } = req.query;
    const foundProduct = products.find(product => product.id === id);
    if (foundProduct) {
        res.status(200).json(foundProduct);
    }
    else {
        res.status(404).send('Search did not show any results...');
    }
});
// Edit product by id - E
productRouter.put('/:id', (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        const updatedProduct = Object.assign(Object.assign({}, products[productIndex]), { product_name: (_a = req.body.product_name) !== null && _a !== void 0 ? _a : products[productIndex].product_name, product_description: (_b = req.body.product_description) !== null && _b !== void 0 ? _b : products[productIndex].product_description, product_price: (_c = req.body.product_price) !== null && _c !== void 0 ? _c : products[productIndex].product_price });
        products[productIndex] = updatedProduct;
        res.status(201).json(updatedProduct);
    }
    else {
        res.status(404).send('Product item not found!');
    }
});
// Add product - A
productRouter.post('/', (req, res) => {
    const newProduct = {
        id: (0, uuid_1.v4)(),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price
    };
    products = [...products, newProduct];
    res.status(201).send('Product added successfully...');
});
// Delete product by id - D
productRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const findProduct = products.find(product => product.id === id);
    if (findProduct) {
        products = products.filter(product => product.id !== id);
        res.status(200).send(`Product was deleted successfully...`);
    }
    else {
        res.status(404).send(`Product not found!`);
    }
});
exports.default = productRouter;
