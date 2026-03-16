import { runRaw } from '../queryBuilder.js';

export async function createOrder(userId, productId, quantity) {
    await runRaw(`INSERT INTO orders (userId, productId, quantity, status) VALUES (${userId}, ${productId}, ${quantity}, 'PENDING')`);
}

export async function getOrdersByUserId(userId) {
    return await runRaw(`SELECT * FROM orders WHERE userId = ${userId}`);
}
