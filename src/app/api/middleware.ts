import { NextFunction, Response, Request } from "express";
import { APIConfig } from "../../config.js";

export function middlewareLogResponses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.on("finish", () => {
    const statusCode = res.statusCode;
    if (statusCode >= 300) {
      console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`);
    }
  });
  next();
}

export function middlewareLogFileserverHits(
  req: Request,
  res: Response,
  next: NextFunction
) {
  APIConfig.fileserverHits++;
  next();
}


