import express from 'express';
import { placeOrder, getUserOrders, getOrderDetails } from '../../services/orderService.js';

export const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    const result = await placeOrder(userId, productId, quantity);
    res.json(result);
});

orderRouter.get('/user/:userId', async (req, res) => {
    const orders = await getUserOrders(req.params.userId);
    res.json(orders);
});

orderRouter.get('/:orderId', async (req, res) => {
    const order = await getOrderDetails(req.params.orderId);
    if (order) {
        return res.json(order);
    }
    res.status(404).json({ error: 'Order not found' });
});
