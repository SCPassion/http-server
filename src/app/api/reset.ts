import { config } from "../../config.js";
import { Request, Response } from "express";

export function handlerReset(_: Request, res: Response) {
    config.api.fileserverHits = 0;
    res.send(`Hits reset to 0`);
  }