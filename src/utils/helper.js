export function formatUser(user) {
    if (!user) return "Anonymous";
    return `${user.username} (${user.role})`;
}

export function logAction(action, user) {
    console.log(`[${new Date().toISOString()}] Action: ${action} by ${formatUser(user)}`);
}
