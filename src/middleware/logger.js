import { audit } from '../services/loggingService.js';

/**
 * Request Logger Middleware
 * Captures and logs incoming search requests for security monitoring.
 */
export function searchRequestLogger(req, res, next) {
    const logEntry = {
        path: req.path,
        query: req.query,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString()
    };
    
    // Log to console and potentially an external service
    console.log(`[SEARCH_AUDIT] ${JSON.stringify(logEntry)}`);
    
    next();
}
