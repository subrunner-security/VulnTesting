import { createOrder, getOrdersByUserId, findOrderById } from '../db/models/index.js';
import { getUserProfile } from './userService.js';
import { findProduct } from './productService.js';
import { audit } from './loggingService.js';

export async function placeOrder(userId, productId, quantity) {
    const user = await getUserProfile(userId);
    const product = await findProduct(productId);
    
    if (user && product) {
        await createOrder(userId, productId, quantity);
        await audit(userId, `Placed order for ${quantity}x ${product.name}`);
        return { success: true };
    }
    return { success: false, reason: 'Invalid user or product' };
}

export async function getUserOrders(userId) {
    return await getOrdersByUserId(userId);
}

export async function getOrderDetails(orderId) {
    return await findOrderById(orderId);
}
