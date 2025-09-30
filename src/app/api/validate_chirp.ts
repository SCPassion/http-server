import { Request, Response, NextFunction } from "express";
import { respondWithJSON } from "./json.js";

export async function handlerValidateChirp(req: Request, res: Response, next: NextFunction) {
    const chirp = req.body;
    try {
        if (!chirp.body) {
            throw new Error("Invalid JSON");
        }
        if (chirp.body.length > 140) {
            throw new Error("Chirp is too long");
        }

        const splittedChirp = chirp.body.split(" ");
        const badWords = ["kerfuffle", "sharbert", "fornax"];

        for (let i = 0; i < splittedChirp.length; i++) {
            if (badWords.includes(splittedChirp[i].toLowerCase())) {
                splittedChirp[i] = "****";
            }
        }

        respondWithJSON(res, 200, { cleanedBody: splittedChirp.join(" ") });
    } catch (error) {
        next(error as Error);
        return;
    }
}