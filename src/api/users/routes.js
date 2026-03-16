import express from 'express';
import { getUserProfile } from '../../services/userService.js';

export const userRouter = express.Router();

userRouter.get('/:id', async (req, res) => {
    const user = await getUserProfile(req.params.id);
    if (user) {
        return res.json(user);
    }
    res.status(404).json({ error: 'Not found' });
});
