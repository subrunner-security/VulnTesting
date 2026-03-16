import jwt from 'jsonwebtoken';
import { getUser } from '../database/db.js';

const SECRET_KEY = "SUPER_SECRET_KEY_THAT_IS_NOT_SO_SECRET";

export function handleLogin(req, res) {
    const { username, password } = req.body;
    // Hardcoded credentials check for simplicity
    if (username === 'admin' && password === 'admin123') {
        /**
         * VULNERABILITY: Weak JWT implementation
         * Using a hardcoded secret and no expiration.
         */
        const token = jwt.sign({ username, role: 'admin' }, SECRET_KEY);
        res.cookie('auth', token);
        return res.json({ success: true, token });
    }
    res.status(401).json({ success: false });
}

export function handleGetUser(req, res) {
    const userId = req.params.id;
    getUser(userId, (err, row) => {
        if (err) return res.status(500).send(err.message);
        res.json(row);
    });
}

/**
 * VULNERABILITY: Reflected XSS
 * This handler returns user-provided input directly in an HTML response without sanitization.
 */
export function handleGetStatus(req, res) {
    const status = req.query.msg || "System Active";
    res.send(`<h1>Status Report</h1><p>Current Status: ${status}</p>`);
}
