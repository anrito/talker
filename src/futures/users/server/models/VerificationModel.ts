import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const VerificationModel = pgTable("verification_codes", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 6 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});
