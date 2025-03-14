"use server";

// import { createSession, deleteSession } from "@/lib/session";
// import { redirect } from "next/navigation";
import { RegistrationRequest } from "../requests/RegistrationRequest";
import {
  create,
  getUserByEmail,
} from "@/futures/users/server/repositories/UserRepository";
import { genSaltSync, hashSync } from "bcrypt-ts";

// const testUser = {
//   id: "1",
//   email: "anrioboladze@gmail.com",
//   password: "12345678",
// };

export async function registrationAction(
  prevState: unknown,
  formData: FormData
) {
  const request = RegistrationRequest.safeParse(Object.fromEntries(formData));

  if (!request.success) {
    return {
      errors: request.error.flatten().fieldErrors,
    };
  }
  // check if user exists
  const checkExistingUser = await getUserByEmail(request.data.email);
  if (checkExistingUser?.id) {
    return {
      errors: {
        email: ["User with this email already exists"],
      },
    };
  }

  // hash the password
  request.data.password = hashSync(request.data.password, genSaltSync(10));

  // create the User database
  await create(request.data);

  // await createSession(testUser.id);
  // redirect("/dashboard");
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
