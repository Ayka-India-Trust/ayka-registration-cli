import { z } from "zod";
import { RegisterSchema } from "../schema";
import { db } from "./db";
import bcrypt from "bcrypt";
import { generatePasswordFunction } from "./password";

export async function AykaRegistration(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid input",
    };
  }

  const { name, email } = validatedFields.data;

  if (!name || !email) {
    return {
      error: "Name and email are required",
    };
  }

  const generatedPassword = generatePasswordFunction();

  if (!generatedPassword) {
    return {
      error: "Password generation failed",
    };
  }

  const hashedPassword = await bcrypt.hash(generatedPassword, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      error: "User already exists",
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: "User created Successfully",
    data: {
      email,
      password: generatedPassword,
    },
  };
}
