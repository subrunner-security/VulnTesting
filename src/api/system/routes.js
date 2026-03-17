import express from 'express';
import { exec } from 'child_process';

export const systemRouter = express.Router();

systemRouter.get('/ping', (req, res) => {
    const host = req.query.host;
    /**
     * VULNERABILITY: OS Command Injection
     */
    exec(`ping -c 1 ${host}`, (err, stdout, stderr) => {
        if (err) return res.status(500).send(err.message);
        res.send(stdout);
    });
});

/**
 * VULNERABILITY: Unsafe Eval
 */
systemRouter.get('/exec-eval', (req, res) => {
    const code = req.query.code;
    try {
        const result = eval(code);
        res.send(`Result: ${result}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
