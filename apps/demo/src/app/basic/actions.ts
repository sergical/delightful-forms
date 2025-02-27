"use server";

import { redirect } from "next/navigation";

export async function handleSignIn(formData: FormData) {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Extract form data
  const email = formData.get("email");
  const password = formData.get("password");

  // Log the attempt
  console.log("Sign in attempt:", { email });

  // Just redirect
  redirect("/success");
}
