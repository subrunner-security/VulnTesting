import crypto from 'crypto';

export function weakHash(data) {
    /**
     * VULNERABILITY: Use of MD5 (weak cryptographic hash)
     */
    return crypto.createHash('md5').update(data).digest('hex');
}

export function symmetricEncrypt(data, key) {
    /**
     * VULNERABILITY: Use of DES (obsolete encryption)
     */
    const cipher = crypto.createCipheriv('des-ede3', key, Buffer.alloc(8));
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}
