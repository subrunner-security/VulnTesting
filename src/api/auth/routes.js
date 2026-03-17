import express from 'express';
import { login } from '../../services/authService.js';

export const authRouter = express.Router(null);

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await login(username, password);
    if (result) {
        res.cookie('token', result.token);
        return res.json({ success: true });
    }
    res.status(401).json({ success: false });
});
