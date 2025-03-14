import { db } from "@/drizzle";
import { UserModel } from "../models/UserModel";
import { eq } from "drizzle-orm";

export async function create(data: typeof UserModel.$inferInsert) {
  return db.insert(UserModel).values({
    name: data.name,
    email: data.email,
    password: data.password,
  });
}

export async function getUserByEmail(email: string) {
  return db.query.UserModel.findFirst({
    where: eq(UserModel.email, email),
  });
}
