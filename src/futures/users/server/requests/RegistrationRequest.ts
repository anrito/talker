import { z } from "zod";

export const RegistrationRequest = z.object({
  firstName: z
    .string()
    .min(1, { message: "სახელის მითითება აუცილებელია" })
    .trim(),
  lastName: z.string().min(1, { message: "LasT NAME cannot be empty" }).trim(),
  email: z
    .string()
    .email({ message: "Invalid email address rocks asd" })
    .trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters" })
    .trim(),
});
