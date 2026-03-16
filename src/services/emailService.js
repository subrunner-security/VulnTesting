export async function sendEmail(to, subject, body) {
    /**
     * VULNERABILITY: SSRF
     * This might call an internal service based on 'to' address or configuration.
     */
    console.log(`[EMAIL] Sending to ${to}: ${subject}`);
}
