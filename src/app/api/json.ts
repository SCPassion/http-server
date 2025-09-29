import type { Response } from "express";

export function respondWithJSON(res: Response, code: number, pagload: any) {
    res.header("Content-Type", "application/json");
    const body = JSON.stringify(pagload);
    res.status(code).send(body);
}

export function respondWithError(res: Response, code: number, errorMsg: string) {
    respondWithJSON(res, code, { error: errorMsg });
}
