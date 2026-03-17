export function formatUser(user) {
    if (!user) return "Anonymous";
    return `${user.username} (${user.role})`;
}

export function logAction(action, user) {
    console.log(`[${new Date().toISOString()}] Action: ${action} by ${formatUser(user)}`);
}

/**
 * Safe recursive merge that prevents Prototype Pollution
 * by blocking dangerous keys such as __proto__, constructor, and prototype.
 */
export function merge(target, source) {
    if (source === null || typeof source !== 'object') return target;
    for (let key of Object.keys(source)) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            continue;
        }
        if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key]) && Object.prototype.hasOwnProperty.call(target, key) && typeof target[key] === 'object') {
            merge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}
