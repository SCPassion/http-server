import { Request, Response } from "express";
import { BadRequestError } from "./error.js";
import { createUser } from "../../db/queries/users.js";

export async function handleCreateUser(req:Request, res: Response) {
    type parameters = {
        email: string;
    };
    const  body: parameters = req.body;
    if (!body.email) {
        throw new BadRequestError("Email is required");
    }

    const user = await createUser({
        email: body.email,
    });

    res.status(201).json(user);
}