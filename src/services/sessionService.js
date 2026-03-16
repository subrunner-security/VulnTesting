import { createSession, getSession } from '../db/models/index.js';
import { weakHash } from '../utils/crypto.js';

export async function startSession(userId) {
    const id = weakHash(`session-${userId}-${Date.now()}`);
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);
    await createSession(id, userId, expires);
    return id;
}

export async function checkSession(id) {
    const session = await getSession(id);
    if (session && new Date(session.expires) > new Date()) {
        return session.userId;
    }
    return null;
}
