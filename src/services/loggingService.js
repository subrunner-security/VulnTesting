import { logEvent } from '../db/models/index.js';

export async function audit(userId, event) {
    console.log(`[AUDIT] User ${userId}: ${event}`);
    await logEvent(event, userId);
}
