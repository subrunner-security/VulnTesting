import { runRaw } from '../queryBuilder.js';

export async function createSession(id, userId, expires) {
    await runRaw(`INSERT INTO sessions (id, userId, expires) VALUES ('${id}', ${userId}, '${expires.toISOString()}')`);
}

export async function getSession(id) {
    const rows = await runRaw(`SELECT * FROM sessions WHERE id = '${id}'`);
    return rows[0];
}
