import express from "express";
import { handlerReadiness } from "./app/api/readiness.js";
import { middlewareLogFileserverHits, middlewareLogResponses } from "./app/api/middleware.js";
import { handlerReset } from "./app/api/reset.js";
import { handlerMetrics } from "./app/api/metrics.js";
import { handlerValidateChirp } from "./app/api/validate_chirp.js";

const app = express();
const PORT = 8080;

// Serve static files from the src/app directory
// app.use("/app" => http://localhost:8080/app/index.html
// express.static("./src/app") => serve static files from the src/app directory

// Use the middleware on the application leve, it will subsccribe to all finish events
app.use(middlewareLogResponses);

app.use("/app", middlewareLogFileserverHits, express.static("./src/app"));
app.use(express.json());
app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics", handlerMetrics);
app.post("/admin/reset", handlerReset);


app.post("/api/validate_chirp", handlerValidateChirp);

// Start the server, listening for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});