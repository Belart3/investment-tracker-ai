import 'server-only';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

function getKey(): Buffer {
    const base64Key = process.env.ENCRYPTION_KEY;
    if (!base64Key) {
        throw new Error('ENCRYPTION_KEY is not set');
    }
    const key = Buffer.from(base64Key, 'base64');
    if (key.length !== 32) {
        throw new Error('ENCRYPTION_KEY must be 32 bytes, base64-encoded');
    }
    return key;
}

// Returns "v1:<iv>:<authTag>:<encrypted>" — everything needed to decrypt later, except the key
export function encrypt(plainText: string): string {
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGORITHM, getKey(), iv);
    const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();

    return ['v1', iv.toString('base64'), authTag.toString('base64'), encrypted.toString('base64')].join(':');
}

export function decrypt(stored: string): string {
    const [version, iv, authTag, encrypted] = stored.split(':');
    if (version !== 'v1' || !iv || !authTag || !encrypted) {
        throw new Error('Not a value produced by encrypt()');
    }

    const decipher = createDecipheriv(ALGORITHM, getKey(), Buffer.from(iv, 'base64'));
    decipher.setAuthTag(Buffer.from(authTag, 'base64'));

    return Buffer.concat([decipher.update(Buffer.from(encrypted, 'base64')), decipher.final()]).toString('utf8');
}
