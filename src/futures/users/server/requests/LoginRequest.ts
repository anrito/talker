import { z } from "zod";

export const LoginRequest = z.object({
  email: z.string().email({ message: "არასწორი ელფოსტის ფორმატი" }).trim(),
  password: z
    .string()
    .min(6, { message: "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს" })
    .trim(),
});
