import { runRaw } from '../queryBuilder.js';

export async function getAllProducts() {
    return await runRaw('SELECT * FROM products');
}

export async function getProductById(id) {
    const rows = await runRaw(`SELECT * FROM products WHERE id = ${id}`);
    return rows[0];
}
