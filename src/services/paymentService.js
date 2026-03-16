import { config } from '../config/index.js';
import { getUserOrders } from './orderService.js';
import { audit } from './loggingService.js';

export async function processPayment(userId, orderId, amount) {
    // Highly complex payment logic...
    await audit(userId, `Processing payment of ${amount} for order ${orderId}`);
    // VULNERABILITY: Insecure direct object reference (IDOR) could happen here
    const orders = await getUserOrders(userId);
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        return { status: 'PAID', transactionId: Math.random().toString(36).substring(7) };
    }
    return { status: 'FAILED' };
}
