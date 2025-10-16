import { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "./error.js";
import { getUserByEmail } from "../../db/queries/users.js";
import { checkPasswordHash } from "../../auth.js";
import { NewUser } from "../../db/schema.js";

export type UserResponse = Omit<NewUser, "hashed_password">;

export async function handleLogin(req:Request, res: Response) {
    type parameters = {
        email: string;
        password: string;
    };

    const body: parameters = req.body;

    if (!body.email || !body.password) {
        throw new BadRequestError("Email is required");
    }

    const user = await getUserByEmail(body.email);
    if (!user) {
        throw new BadRequestError("Invalid email or password");
    }

    const isValid = await checkPasswordHash(body.password, user.hashed_password);
    if (!isValid) {
        throw new UnauthorizedError("Invalid email or password");
    }

    const userResponse: UserResponse = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };

    res.status(200).json(userResponse);
}