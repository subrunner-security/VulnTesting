import express from 'express';
import { searchUsers } from '../services/searchService.js';
import { searchRequestLogger } from '../middleware/logger.js';

const vulnerableSearchRouter = express.Router();

/**
 * Advanced Search Endpoint
 * Now uses a service layer and sanitization.
 * NOTE: The 'limit' parameter is passed directly from user input.
 */
vulnerableSearchRouter.get('/search', searchRequestLogger, async (req, res) => {
    const { username, email, limit } = req.query;
    
    try {
        const results = await searchUsers({ username, email, limit });
        res.json({ success: true, count: results.length, data: results });
    } catch (err) {
        res.status(500).json({ success: false, error: "An unexpected error occurred." });
    }
});

export { vulnerableSearchRouter };
