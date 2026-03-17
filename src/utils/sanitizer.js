/**
 * SQL Sanitization Utility
 * Designed to escape single quotes to prevent basic SQL injection.
 * NOTE: This is a custom implementation and might have edge cases.
 */
export function sanitizeSql(input) {
    if (Array.isArray(input)) {
        return input.map(i => sanitizeSql(i));
    }
    if (typeof input !== 'string') return input;
    
    // Escaping single quotes by doubling them
    return input.replace(/'/g, "''");
}
