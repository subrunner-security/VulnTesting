import { getAllProducts, getProductById } from '../db/models/index.js';

export async function listProducts() {
    return await getAllProducts();
}

export async function findProduct(id) {
    return await getProductById(id);
}
