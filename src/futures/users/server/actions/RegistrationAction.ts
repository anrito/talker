"use server";

// import { createSession, deleteSession } from "@/lib/session";
import { RegistrationRequest } from "../requests/RegistrationRequest";
import { createUser, getUserByEmail } from "../repositories/UserRepository";
import { createVerification } from "../repositories/VerificationRepository";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";
import { SendVerificationEmail } from "./SendVerificationEmail";

/**
 * Registration action
 */
export async function registrationAction(
  prevState: unknown,
  formData: FormData
) {
  console.log(Object.fromEntries(formData));

  const request = RegistrationRequest.safeParse(Object.fromEntries(formData));

  if (!request.success) {
    return {
      errors: request.error.flatten().fieldErrors,
      values: Object.fromEntries(formData),
    };
  }
  // check if user exists
  const checkExistingUser = await getUserByEmail(request.data.email);
  if (checkExistingUser?.id) {
    return {
      errors: {
        email: ["User with this email already exists"],
      },
      values: Object.fromEntries(formData),
    };
  }

  // hash the password
  request.data.password = hashSync(request.data.password, genSaltSync(10));

  // create new User Repository
  const newUser = await createUser(request.data);
  // create new Verification Record
  const verificationCode = await createVerification(newUser.email);
  // send email with verification code
  await SendVerificationEmail(newUser.email, verificationCode.code);

  // await createSession(testUser.id);
  redirect("/verification?email=" + newUser.email);
}

// export async function login(prevState: unknown, formData: FormData) {
//   const result = loginSchema.safeParse(Object.fromEntries(formData));

//   if (!result.success) {
//     return {
//       errors: result.error.flatten().fieldErrors,
//     };
//   }

//   const { email, password } = result.data;

//   if (email !== testUser.email || password !== testUser.password) {
//     return {
//       errors: {
//         email: ["Invalid email or password"],
//       },
//     };
//   }

//   await createSession(testUser.id);

//   redirect("/dashboard");
// }

// export async function logout() {
//   await deleteSession();
//   redirect("/login");
// }
