import express from 'express';
import { listProducts, findProduct } from '../../services/productService.js';

export const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    const products = await listProducts();
    res.json(products);
});

productRouter.get('/:id', async (req, res) => {
    const product = await findProduct(req.params.id);
    if (product) {
        /**
         * VULNERABILITY: Potential XSS in description
         */
        res.send(`<h1>${product.name}</h1><p>${product.description}</p>`);
    } else {
        res.status(404).send('Product not found');
    }
});
