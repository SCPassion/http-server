import { NextFunction, Response, Request } from "express";
import { APIConfig } from "../../config.js";
import { respondWithError } from "./json.js";

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


export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const statusCode = 500;
    const message = "Something went wrong on our end";

    console.error(err.message);
    respondWithError(res, statusCode, message);
}