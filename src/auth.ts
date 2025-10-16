import { argon2id, hash, verify } from "argon2";

export async function hashPassword(password: string) {
    const hashedPassword = await hash(password);
    return hashedPassword;
}

export async function checkPasswordHash(password: string, hash: string) {
    const isValid = await verify(hash, password);
    return isValid;
}


