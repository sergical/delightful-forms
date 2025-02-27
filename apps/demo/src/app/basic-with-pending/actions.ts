"use server";

import { revalidatePath } from "next/cache";

export type FormErrors = {
  email?: string;
  password?: string;
};

export type FormState = {
  success?: boolean;
  error?: string;
  errors?: FormErrors;
} | null;

export async function submitForm(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Extract form data
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("email", email);
  console.log("password", password);
  // Validation
  const errors: FormErrors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = "Invalid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
    errors.password =
      "Password must contain at least one uppercase letter, one lowercase letter, and one number";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Process the registration (in a real app, this would create a user in the database)
  console.log("User registration:", { email });

  // Revalidate the current path before redirecting
  revalidatePath("/basic");
  return { success: true };
}
