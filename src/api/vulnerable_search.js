import express from 'express';
import { runRaw } from '../db/queryBuilder.js';

const vulnerableSearchRouter = express.Router();

/**
 * VULNERABILITY: SQL Injection
 * This endpoint takes user input directly and executes it as a raw SQL query.
 * Example of exploitation: /search?query=admin' OR '1'='1
 */
vulnerableSearchRouter.get('/search', async (req, res) => {
    const query = req.query.query;
    try {
        const sql = `SELECT * FROM users WHERE username = '${query}'`;
        const results = await runRaw(sql);
        res.json({ success: true, data: results });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export { vulnerableSearchRouter };
