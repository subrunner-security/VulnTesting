import { runRaw } from '../queryBuilder.js';

export async function findUserById(id) {
    const rows = await runRaw(`SELECT * FROM users WHERE id = ${id}`);
    return rows[0];
}

export async function findUserByUsername(username) {
    const rows = await runRaw(`SELECT * FROM users WHERE username = '${username}'`);
    return rows[0];
}

export async function createUser(username, password, role, email) {
    await runRaw(`INSERT INTO users (username, password, role, email) VALUES ('${username}', '${password}', '${role}', '${email}')`);
}
