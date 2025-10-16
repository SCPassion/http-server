import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "./error.js";
import { createChirp, getAllChirps, getChirpById } from "../../db/queries/chirp.js";

export async function handleCreateChirp(req:Request, res: Response) {
    type parameters = {
        body: string;
        userId: string;
    }

    const body: parameters = req.body;
    if (!body.body) {
        throw new BadRequestError("Body is required");
    }
    if (!body.userId) {
        throw new BadRequestError("UserId is required");
    }

    if (!isChirpValid(body.body)) {
        throw new BadRequestError("Chirp is invalid");
    }

    const chirp = await createChirp({
        body: body.body,
        userId: body.userId,
    })

    res.status(201).json(chirp);
}

export async function isChirpValid(body: string) {

    const maxChirpLength = 140;
    if (body.length > maxChirpLength) {
      return false;
    }
  
    const words = body.split(" ");
    let isValid = true;
    const badWords = ["kerfuffle", "sharbert", "fornax"];
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const loweredWord = word.toLowerCase();
      if (badWords.includes(loweredWord)) {
        isValid = false;
      }
    }
    
    return isValid;
  }

export async function handleGetAllChirps(_:Request, res: Response) {
  const chirps = await getAllChirps();
  res.status(200).json(chirps);
}

export async function handleGetChirpById(req:Request, res: Response) {
  const chirp = await getChirpById(req.params.chirpId as string);
  if (!chirp) {
    throw new NotFoundError(`Chirp with chirpId: ${req.params.chirpId} not found`);
  }
  res.status(200).json(chirp);
}