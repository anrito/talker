import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import env from "@/env";

export const client = postgres(env.DATABASE_URL!, {
  max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
});

export const db = drizzle(client, { schema });
