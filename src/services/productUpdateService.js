import { findProduct } from './productService.js';
import { audit } from './loggingService.js';
import { runRaw } from '../db/queryBuilder.js';

export async function updatePrice(productId, newPrice, userId) {
    const product = await findProduct(productId);
    if (product) {
        await runRaw(`UPDATE products SET price = ${newPrice} WHERE id = ${productId}`);
        await audit(userId, `Updated price of ${product.name} to ${newPrice}`);
        return true;
    }
    return false;
}
