import crypto from 'crypto';

export function weakHash(data) {
    /**
     * FIX: Use SHA-256 instead of MD5 (strong cryptographic hash)
     */
    return crypto.createHash('sha256').update(data).digest('hex');
}

export function symmetricEncrypt(data, key) {
    /**
     * FIX: Use AES-256-GCM instead of DES (modern, authenticated encryption)
     */
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return iv.toString('hex') + ':' + authTag + ':' + encrypted;
}
