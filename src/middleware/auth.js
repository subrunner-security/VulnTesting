import { checkSession } from '../services/sessionService.js';

export async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    
    const userId = await checkSession(token);
    if (!userId) return res.status(401).json({ error: 'Session expired' });
    
    req.userId = userId;
    next();
}
