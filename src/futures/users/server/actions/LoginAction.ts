"use server";

import { createSession } from "@/lib/session";
import { LoginRequest } from "../requests/LoginRequest";
import { getUserByEmail } from "../repositories/UserRepository";
import { compareSync } from "bcrypt-ts";
import { redirect } from "next/navigation";

/**
 * Login action
 */
export async function loginAction(prevState: unknown, formData: FormData) {
  const request = LoginRequest.safeParse(Object.fromEntries(formData));

  if (!request.success) {
    return {
      errors: request.error.flatten().fieldErrors,
      values: Object.fromEntries(formData),
    };
  }

  // Find user by email
  const user = await getUserByEmail(request.data.email);

  // Check if user exists
  if (!user) {
    return {
      errors: {
        email: ["მომხმარებელი ამ ელფოსტით არ არსებობს"],
      },
      values: Object.fromEntries(formData),
    };
  }

  // Verify password
  const isPasswordValid = compareSync(request.data.password, user.password);
  if (!isPasswordValid) {
    return {
      errors: {
        password: ["არასწორი პაროლი"],
      },
      values: Object.fromEntries(formData),
    };
  }

  // Check if user is verified
  if (!user.isVerified) {
    redirect(`/verification?email=${user.email}`);
  }

  // Create session and redirect to dashboard
  await createSession(user.id.toString());
  redirect("/dashboard");
}
