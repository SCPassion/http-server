import { Request, Response } from "express";
import { respondWithJSON, respondWithError } from "./json.js";

export async function handlerValidateChirp(req: Request, res: Response) {
    const chirp = req.body;
    try {
        if (!chirp.body) {
            throw new Error("Invalid JSON");
        }
        if (chirp.body.length > 140) {
            throw new Error("Chirp is too long");
        }
        respondWithJSON(res, 200, { valid: true });
    } catch (error) {
        if (error instanceof Error) {
            respondWithError(res, 400, error.message);
        } else {
            respondWithError(res, 400, "Invalid JSON");
        }
    }
}