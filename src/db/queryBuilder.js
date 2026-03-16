import { connector } from './connector.js';

export function runRaw(sql) {
    /**
     * VULNERABILITY: Universal SQL Injection Sink
     * This function runs any SQL string provided to it.
     */
    return new Promise((resolve, reject) => {
        connector.getHandle().all(sql, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}
