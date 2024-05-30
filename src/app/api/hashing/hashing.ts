const bcrypt = require('bcrypt');

export default function hashPassword(unHashedPassword: string): string {

    return bcrypt.hash(unHashedPassword, 10).then(function (hash: string) {
        return hash;
    });
}