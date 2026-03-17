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

/**
 * VULNERABILITY: IDOR / Improper Authentication
 * No session check or verification of the user being updated.
 */
export async function updateUserPassword(userId, newPassword) {
    // Directly updating password for any user ID provided
    await audit(userId, 'Password Reset via Insecure Debug Tool');
    // For testing purposes, we just log it as the actual DB update logic is simulated
    console.log(`Password updated for user ${userId} to ${newPassword}`);
}
