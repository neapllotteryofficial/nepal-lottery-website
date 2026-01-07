import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// "postgres" client connection pool handle karega
// prepare: false is often recommended for serverless environments like Vercel
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
