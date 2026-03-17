import express from 'express';
import { authRouter } from './auth/routes.js';
import { userRouter } from './users/routes.js';
import { productRouter } from './products/routes.js';
import { orderRouter } from './orders/routes.js';
import { systemRouter } from './system/routes.js';
import { vulnerableSearchRouter } from './vulnerable_search.js';

export const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);
router.use('/system', systemRouter);
router.use('/vulnerable', vulnerableSearchRouter);
