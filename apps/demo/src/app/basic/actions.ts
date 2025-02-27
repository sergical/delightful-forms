"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type FormState = { error: string } | null;

export async function submitForm(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Extract form data
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Simple validation
  if (!name || !email || !message) {
    return { error: "All fields are required" };
  }

  // Process the submission (in a real app, this would save to a database)
  console.log("Form submitted:", { name, email, message });

  // Revalidate the current path before redirecting
  revalidatePath("/basic");
  redirect("/basic/success");
}
