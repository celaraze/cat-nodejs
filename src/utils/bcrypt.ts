import bcrypt from "bcryptjs";

/**
 * Encrypts a password.
 *
 * @param password - The password to encrypt.
 * @returns {string} - The encrypted password.
 */
const encrypt = (password: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

/**
 * Compares a password with a hashed password.
 *
 * @param password - The password to compare.
 * @param hashedPassword - The hashed password to compare.
 * @returns {boolean} - True if the password matches the hashed password, false otherwise.
 */
const compare = (password: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(password, hashedPassword);
}

export {encrypt, compare}