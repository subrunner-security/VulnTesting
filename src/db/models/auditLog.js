import { runRaw } from '../queryBuilder.js';

export async function logEvent(event, userId) {
    await runRaw(`INSERT INTO audit_logs (event, timestamp, userId) VALUES ('${event}', '${new Date().toISOString()}', ${userId})`);
}
