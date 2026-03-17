import crypto from 'crypto';

const HASH_ALGORITHM = 'sha3-256';
const CIPHER_ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const SALT_LENGTH = 32;
const KEY_LENGTH = 32;
const PBKDF2_ITERATIONS = 310000;
const PBKDF2_DIGEST = 'sha512';

export function strongHash(data) {
    /**
     * Use SHA-3 (sha3-256) - stronger than SHA-256 and resistant to length-extension attacks
     */
    if (typeof data !== 'string' && !Buffer.isBuffer(data)) {
        throw new TypeError('Input must be a string or Buffer');
    }
    return crypto.createHash(HASH_ALGORITHM).update(data).digest('hex');
}

// Keep legacy export name for backward compatibility
export const weakHash = strongHash;

export function symmetricEncrypt(data, passphrase) {
    /**
     * AES-256-GCM with per-encryption key derivation via PBKDF2.
     * A unique salt is generated each call, eliminating IV/key reuse risk.
     * The authTag is validated on decryption to ensure integrity.
     * Output format: salt:iv:authTag:ciphertext (all hex-encoded)
     */
    if (typeof data !== 'string' && !Buffer.isBuffer(data)) {
        throw new TypeError('Data must be a string or Buffer');
    }
    if (typeof passphrase !== 'string' && !Buffer.isBuffer(passphrase)) {
        throw new TypeError('Passphrase must be a string or Buffer');
    }

    // Derive a unique key per encryption using a fresh random salt
    const salt = crypto.randomBytes(SALT_LENGTH);
    const key = crypto.pbkdf2Sync(passphrase, salt, PBKDF2_ITERATIONS, KEY_LENGTH, PBKDF2_DIGEST);

    // Generate a fresh IV for every encryption
    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, key, iv);
    const encrypted = Buffer.concat([
        cipher.update(typeof data === 'string' ? Buffer.from(data, 'utf8') : data),
        cipher.final()
    ]);

    // Retrieve the 16-byte GCM authentication tag
    const authTag = cipher.getAuthTag();

    // Encode all components as hex and join with ':'
    return [
        salt.toString('hex'),
        iv.toString('hex'),
        authTag.toString('hex'),
        encrypted.toString('hex')
    ].join(':');
}

export function symmetricDecrypt(payload, passphrase) {
    /**
     * Decrypts and authenticates data produced by symmetricEncrypt.
     * Throws if the authTag verification fails (tampered ciphertext).
     */
    if (typeof payload !== 'string') {
        throw new TypeError('Payload must be a string');
    }
    if (typeof passphrase !== 'string' && !Buffer.isBuffer(passphrase)) {
        throw new TypeError('Passphrase must be a string or Buffer');
    }

    const parts = payload.split(':');
    if (parts.length !== 4) {
        throw new Error('Invalid payload format');
    }

    const [saltHex, ivHex, authTagHex, encryptedHex] = parts;

    const salt = Buffer.from(saltHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');

    // Re-derive the same key using the stored salt
    const key = crypto.pbkdf2Sync(passphrase, salt, PBKDF2_ITERATIONS, KEY_LENGTH, PBKDF2_DIGEST);

    const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    // Will throw if authentication fails
    const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final()
    ]);

    return decrypted.toString('utf8');
}
