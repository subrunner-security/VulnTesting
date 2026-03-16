import express from 'express';
import { handleLogin, handleGetUser, handleGetStatus } from './handlers.js';

export const router = express.Router();

router.post('/login', handleLogin);
router.get('/user/:id', handleGetUser);
router.get('/status', handleGetStatus);
