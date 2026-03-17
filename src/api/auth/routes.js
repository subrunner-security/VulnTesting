import express from 'express';
import { login, updateUserPassword } from '../../services/authService.js';

export const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await login(username, password);
    if (result) {
        res.cookie('token', result.token);
        return res.json({ success: true });
    }
    res.status(401).json({ success: false });
});

/**
 * VULNERABILITY: IDOR (Insecure Direct Object Reference)
 * Allows resetting any user's password given their userId.
 */
authRouter.post('/reset-password', async (req, res) => {
    const { userId, newPassword } = req.body;
    await updateUserPassword(userId, newPassword);
    res.json({ success: true, message: 'Password reset' });
});
