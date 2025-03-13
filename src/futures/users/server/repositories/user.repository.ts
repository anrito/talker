import { db } from "@/drizzle";
import users from "../models/users.model";

export async function create(data: { email: string; password: string }) {
  return db.insert(users).values({
    email: data.email,
    password: data.password,
  });
}
