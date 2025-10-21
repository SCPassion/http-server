import { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "./error.js";
import { getUserByEmail } from "../../db/queries/users.js";
import { checkPasswordHash, makeJWT } from "../../auth.js";
import { NewUser } from "../../db/schema.js";
import { config } from "../../config.js";

export type UserResponse = Omit<NewUser, "hashed_password">;

export async function handleLogin(req:Request, res: Response) {
    type parameters = {
        email: string;
        password: string;
        expiresInSeconds?: number;
    };

    const body: parameters = req.body;
    let expiresInSeconds; 

    if (!body.expiresInSeconds) {
        expiresInSeconds = 60 * 60;
    } else {
        if (body.expiresInSeconds > 60 * 60) {
            expiresInSeconds = 60 * 60;
        } else {
            expiresInSeconds = body.expiresInSeconds;
        }
    }

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
    const token = makeJWT(user.id, expiresInSeconds, config.api.jwtSecret);

    const userResponse: UserResponse = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: token,
    };

    res.status(200).json(userResponse);
}