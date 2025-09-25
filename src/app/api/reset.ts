import { APIConfig } from "../../config.js";
import { Request, Response } from "express";

export function handlerReset(req: Request, res: Response) {
    APIConfig.fileserverHits = 0;
    res.send(`Hits reset to 0`);
  }