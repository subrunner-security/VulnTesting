import express from 'express';
import { getUserProfile } from '../../services/userService.js';
import { runRaw } from '../../db/queryBuilder.js';

export const userRouter = express.Router();

userRouter.get('/:id', async (req, res) => {
    const user = await getUserProfile(req.params.id);
    if (user) {
        return res.json(user);
    }
    res.status(404).json({ error: 'Not found' });
});

/**
 * VULNERABILITY: Raw SQL Injection
 */
userRouter.get('/raw-query', async (req, res) => {
    const query = req.query.query;
    try {
        const rows = await runRaw(query);
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
