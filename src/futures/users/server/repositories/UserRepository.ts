import { db } from "@/drizzle";
import { UserModel } from "../models/UserModel";
import { eq } from "drizzle-orm";

export async function create(data: typeof UserModel.$inferInsert) {
  const result = await db
    .insert(UserModel)
    .values({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })
    .returning({ email: UserModel.email });
  return result[0];
}

export async function getUserByEmail(email: string) {
  return db.query.UserModel.findFirst({
    where: eq(UserModel.email, email),
  });
}
