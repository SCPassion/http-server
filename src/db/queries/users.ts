import { db } from "../index.js";
import { NewUser, users, chirps } from "../schema.js";
import { eq } from "drizzle-orm";


export async function createUser(user: NewUser) {
    try {
        const [result] = await db.insert(users).values(user).onConflictDoNothing().returning();
        if (!result) {
            // User already exists, return the existing user
            const existingUser = await getUserByEmail(user.email);
            if (!existingUser) {
                throw new Error("User with this email already exists but could not retrieve it");
            }
            return {
                result: existingUser,
            };
        }
        return {
            result,
        };
    } catch (error) {
        console.error("Error in createUser:", error);
        throw error;
    }
}

export async function getUserByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email));
    if (result.length === 0) {
        return null;
    }
    return result[0];
}

export async function reset() {
    try {
        // Delete chirps first due to foreign key constraint
        await db.delete(chirps);
        // Then delete users
        await db.delete(users);
    } catch (error) {
        console.error("Error during reset:", error);
        throw error;
    }
}
