import express from "express";

import { middlewareLogResponse } from "./app/api/middleware.js";
import { middlewareMetricsInc } from "./app/api/middleware.js";
import { errorMiddleWare } from "./app/api/middleware.js";
import { handlerReadiness } from "./app/api/readiness.js";
import { handlerMetrics } from "./app/api/metrics.js";
import { handlerReset } from "./app/api/reset.js";
import { handlerChirpsValidate } from "./app/api/validate_chirp.js";
import { config } from "./config.js";
import { handleCreateUser } from "./app/api/users.js";
import { handleCreateChirp, handleGetAllChirps, handleGetChirpById } from "./app/api/chirps.js";


const app = express();

app.use(middlewareLogResponse);
app.use(express.json());

app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", (req, res, next) => {
  Promise.resolve(handlerReadiness(req, res)).catch(next);
});
app.get("/admin/metrics", (req, res, next) => {
  Promise.resolve(handlerMetrics(req, res)).catch(next);
});
app.post("/admin/reset", (req, res, next) => {
  Promise.resolve(handlerReset(req, res)).catch(next);
});

app.post("/api/validate_chirp", (req, res, next) => {
  Promise.resolve(handlerChirpsValidate(req, res)).catch(next);
});

app.post("/api/users", (req, res, next) => {
  Promise.resolve(handleCreateUser(req, res)).catch(next);
});

app.post("/api/chirps", (req, res, next) => {
  Promise.resolve(handleCreateChirp(req, res)).catch(next);
});

app.get("/api/chirps", (req, res, next) => {
  Promise.resolve(handleGetAllChirps(req, res)).catch(next);
});

app.get("/api/chirps/:chirpId", (req, res, next) => {
  Promise.resolve(handleGetChirpById(req, res)).catch(next);
});

app.use(errorMiddleWare);

app.listen(config.api.port, () => {
  console.log(`Server is running at http://localhost:${config.api.port}`);
});
