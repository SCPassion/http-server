import express from "express";
import { handlerReadiness } from "./app/api/readiness";

const app = express();
const PORT = 8080;

// Serve static files from the src/app directory
// app.use("/app" => http://localhost:8080/app/index.html
// express.static("./src/app") => serve static files from the src/app directory
app.use("/app", express.static("./src/app"));

app.get("/healthz", handlerReadiness);

// Start the server, listening for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

