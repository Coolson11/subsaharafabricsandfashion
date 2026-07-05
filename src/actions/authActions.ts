"use server";

import { z } from "zod";
import { setSessionCookie, clearSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export async function login(prevState: any, formData: FormData) {
  const usernameInput = formData.get("username") as string;
  const passwordInput = formData.get("password") as string;

  const result = loginSchema.safeParse({
    username: usernameInput,
    password: passwordInput,
  });

  if (!result.success) {
    return { error: "Username and password are required" };
  }

  const { username, password } = result.data;
  
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD is not set in environment variables");
    return { error: "Server authentication error. Please contact the administrator." };
  }

  if (username !== adminUsername || password !== adminPassword) {
    return { error: "Invalid username or password" };
  }

  await setSessionCookie(username);
  
  redirect("/cms");
}

export async function logout() {
  await clearSessionCookie();
  const publicUrl = process.env.PUBLIC_WEBSITE_URL || "/";
  redirect(publicUrl);
}
