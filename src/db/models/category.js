import { runRaw } from '../queryBuilder.js';

export async function getAllCategories() {
    return await runRaw('SELECT * FROM categories');
}
