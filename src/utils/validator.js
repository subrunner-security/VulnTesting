export function validateEmail(email) {
    /**
     * VULNERABILITY: Flawed regex (potential ReDoS or bypass)
     */
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

export function validatePassword(pass) {
    return pass.length >= 8;
}
