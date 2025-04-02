import { db } from "@/drizzle";
import { eq, and, gt } from "drizzle-orm";
import { VerificationModel } from "../models/VerificationModel";
import moment from "moment";

export async function create(email: string) {
  // Generate a random 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  // Set expiration to current time plus 10 minutes
  const expiresAt = moment().add(10, "minutes").toISOString();
  // create record and return the code
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

/**
 * @name checkVerificationCodeByEmail
 * @description Check if verification code is valid for the given email and has not expired
 * @returns The verification record if valid, null if invalid or expired
 */
export async function checkVerificationCodeByEmail(
  email: string,
  code: string
) {
  // get the current time
  const currentTime = moment().toISOString();
  return await db.query.VerificationModel.findFirst({
    where: and(
      eq(VerificationModel.email, email),
      eq(VerificationModel.code, code),
      gt(VerificationModel.expiresAt, currentTime)
    ),
  });
}
