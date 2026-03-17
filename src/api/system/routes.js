import express from 'express';
import { execFile } from 'child_process';
import { merge } from '../../utils/helper.js';

export const systemRouter = express.Router();

systemRouter.get('/ping', (req, res) => {
    const host = req.query.host;

    // Validate host to allow only safe hostnames/IPs
    // Strengthened regex: disallows leading/trailing dots/hyphens, consecutive dots,
    // and enforces reasonable length to reduce command injection surface.
    if (
        !host ||
        host.length > 253 ||
        !/^(?!-)[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/.test(host)
    ) {
        return res.status(400).send('Invalid host parameter.');
    }

    // Use execFile instead of exec to avoid shell injection
    execFile('ping', ['-c', '1', host], { timeout: 5000 }, (err, stdout, stderr) => {
        if (err) return res.status(500).send('Ping request failed.');
        res.send(stdout);
    });
});

/**
 * Removed unsafe eval; endpoint now returns an error indicating it is disabled.
 */
systemRouter.get('/exec-eval', (req, res) => {
    res.status(403).send('Code evaluation is disabled for security reasons.');
});

/**
 * Safe merge-settings using the fixed merge utility.
 */
systemRouter.post('/merge-settings', (req, res) => {
    const systemSettings = { version: '1.0.0' };
    const userSettings = req.body.settings;

    if (!userSettings || typeof userSettings !== 'object' || Array.isArray(userSettings)) {
        return res.status(400).json({ success: false, error: 'Invalid settings payload.' });
    }

    // Using the fixed merge function (prototype pollution safe)
    merge(systemSettings, userSettings);

    res.json({ success: true, settings: systemSettings });
});
