import "dotenv/config";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

export const pool = new pg.Pool({
  connectionString: databaseUrl,
  // Local Coolify mapped ports often run without TLS.
  ssl: databaseUrl.includes("sslmode=require") ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pool, { schema });
