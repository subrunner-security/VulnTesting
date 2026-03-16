import { runRaw } from '../queryBuilder.js';

export async function getShippingInfo(orderId) {
    return await runRaw(`SELECT * FROM shipping WHERE orderId = ${orderId}`);
}
