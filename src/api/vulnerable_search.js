import express from 'express';
import { searchUsers } from '../services/searchService.js';
import { searchRequestLogger } from '../middleware/logger.js';
import http from 'http';

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

/**
 * VULNERABILITY: Server-Side Request Forgery (SSRF)
 */
vulnerableSearchRouter.get('/proxy', (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send('URL is required');

    http.get(targetUrl, (proxyRes) => {
        let data = '';
        proxyRes.on('data', (chunk) => {
            data += chunk;
        });
        proxyRes.on('end', () => {
            res.send(data);
        });
    }).on('error', (err) => {
        res.status(500).send(err.message);
    });
});

export { vulnerableSearchRouter };
