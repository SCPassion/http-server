import { drizzle } from "drizzle-orm/node-postgres";
import postgres from "postgres";

import * as schema from "./schema";
import { config } from "../config";

const client = postgres(config.dbURL);

export const db = drizzle(client, { schema });