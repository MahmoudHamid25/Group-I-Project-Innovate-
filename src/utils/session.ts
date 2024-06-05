import crypto from 'crypto';

export function generateToken(): string {
    return crypto.randomBytes(64).toString('hex');
}

export function verifyToken(token: string): boolean {
    // For simplicity, we just check the token length
    return token.length === 128;
}
