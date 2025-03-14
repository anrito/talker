import { z } from "zod";

export const RegistrationRequest = z.object({
  name: z
    .string({ message: "name also require" })
    .min(1, { message: "Name cannot be empty" })
    .trim(),
  email: z
    .string()
    .email({ message: "Invalid email address rocks asd" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});
