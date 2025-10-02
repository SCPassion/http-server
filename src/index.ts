import express from "express";

import { middlewareLogResponse } from "./app/api/middleware.js";
import { middlewareMetricsInc } from "./app/api/middleware.js";
import { errorMiddleWare } from "./app/api/middleware.js";
import { handlerReadiness } from "./app/api/readiness.js";
import { handlerMetrics } from "./app/api/metrics.js";
import { handlerReset } from "./app/api/reset.js";
import { handlerChirpsValidate } from "./app/api/validate_chirp.js";


const app = express();
const PORT = 8080;

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

app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
