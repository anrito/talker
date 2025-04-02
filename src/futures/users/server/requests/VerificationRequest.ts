import { z } from "zod";

export const VerificationRequest = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  verificationCode: z
    .string()
    .regex(/^\d{6}$/, { message: "Verification code must be exactly 6 digits" })
    .trim(),
});
