import { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "./error.js";
import { createUser, getUserByEmail } from "../../db/queries/users.js";
import { checkPasswordHash, hashPassword } from "../../auth.js";
import { NewUser } from "../../db/schema.js";

export type UserResponse = Omit<NewUser, "hashed_password">;

export async function handleCreateUser(req:Request, res: Response) {
    type parameters = {
        email: string;
        password: string;
    };

    const  body: parameters = req.body;
    if (!body.email) {
        throw new BadRequestError("Email is required");
    }
    if (!body.password) {
        throw new BadRequestError("Password is required");
    }

    const hashedPassword = await hashPassword(body.password);
    if (!hashedPassword) {
        throw new BadRequestError("Failed to hash password");
    }
    const user = await createUser({
        email: body.email,
        hashed_password: hashedPassword as string,
    });

    const result = user.result;
    if (!result) {
        throw new BadRequestError("Failed to create user");
    }

    const userResponse: UserResponse = {
        id: result.id,
        email: result.email,
        createdAt: result.createdAt as Date,
        updatedAt: result.updatedAt as Date,
    };

    res.status(201).json(userResponse);
}