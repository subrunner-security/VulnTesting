export function formatUser(user) {
    if (!user) return "Anonymous";
    return `${user.username} (${user.role})`;
}

export function logAction(action, user) {
    console.log(`[${new Date().toISOString()}] Action: ${action} by ${formatUser(user)}`);
}

/**
 * VULNERABILITY: Prototype Pollution
 * Recursively merges two objects without checking for __proto__.
 */
export function merge(target, source) {
    for (let key in source) {
        if (source[key] instanceof Object && key in target) {
            merge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}
