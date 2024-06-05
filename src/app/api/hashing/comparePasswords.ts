const bcrypt = require('bcrypt');

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch ( error ) {
        console.error('Error comparing passwords:', error);
        throw new Error('Failed to compare passwords');
    }
}
