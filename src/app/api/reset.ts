import { reset } from "../../db/queries/users.js";
import { config } from "../../config.js";
import { Request, Response } from "express";
import { ForbiddenError } from "./error.js";

export async function handlerReset(_: Request, res: Response) {
    config.api.fileserverHits = 0;

    if (config.api.platform !== "dev") {
      throw new ForbiddenError("Reset is only allowed in dev mode");
    }

    await reset();
    res.send(`Hits reset to 0`);

  }