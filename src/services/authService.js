import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { findUserByUsername } from '../db/models/index.js';
import { audit } from './loggingService.js';

export async function login(username, password) {
    const user = await findUserByUsername(username);
    if (user && user.password === password) {
        const token = jwt.sign({ id: user.id, role: user.role }, config.security.jwtSecret);
        await audit(user.id, 'Logged In');
        return { token, user };
    }
    return null;
}
