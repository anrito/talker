import { db } from "@/drizzle";
import { VerificationModel } from "../models/VerificationModel";
import moment from "moment";

export async function createVerification(email: string) {
  // Generate a random 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Set expiration to current time plus 10 minutes
  const expiresAt = moment().add(10, "minutes").toISOString();

  const result = await db
    .insert(VerificationModel)
    .values({
      email,
      code,
      expiresAt,
    })
    .returning({ code: VerificationModel.code });
  return result[0];
}
