const bcrypt = require('bcrypt');

export default async function hashPassword(unHashedPassword: string): Promise<string> {
    try {
        return await bcrypt.hash(unHashedPassword, 10);
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error; // Or handle the error differently
    }
}
