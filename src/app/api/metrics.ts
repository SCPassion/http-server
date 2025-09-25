import { APIConfig } from "../../config.js";
import { Request, Response } from "express";

export function handlerMetrics(
    req: Request,
    res: Response,
  ) {
      res.send(`Hits: ${APIConfig.fileserverHits}`);
  }
  