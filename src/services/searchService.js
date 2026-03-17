import { runRaw } from '../db/queryBuilder.js';
import { sanitizeSql } from '../utils/sanitizer.js';
import { audit } from './loggingService.js';

/**
 * Advanced Search Service
 * Handles multi-criteria user search with built-in sanitization.
 */
export async function searchUsers(criteria) {
    const { username, email, limit = 10 } = criteria;
    
    const sanitizedUsername = sanitizeSql(username);
    const sanitizedEmail = sanitizeSql(email);
    
    let query = `SELECT id, username, email, role FROM users WHERE 1=1`;
    
    if (sanitizedUsername) {
        query += ` AND username LIKE '%${sanitizedUsername}%'`;
    }
    
    if (sanitizedEmail) {
        query += ` AND email LIKE '%${sanitizedEmail}%'`;
    }
    
    query += ` LIMIT ${limit}`;
    
    // Log the search action for auditing
    await audit('SYSTEM', `User search performed with criteria: ${JSON.stringify(criteria)}`);
    
    return await runRaw(query);
}
