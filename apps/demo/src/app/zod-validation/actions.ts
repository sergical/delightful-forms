"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { signUpSchema } from "./schema";

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
  const formValues = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    // Validate with Zod schema
    const validatedData = signUpSchema.parse(formValues);

    // Process the registration (in a real app, this would create a user in the database)
    console.log("User registration:", { email: validatedData.email });

    // Revalidate the current path before redirecting
    revalidatePath("/zod-validation");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convert Zod errors to our format
      const errors: FormErrors = {};
      error.errors.forEach((err) => {
        if (err.path[0] === "email" || err.path[0] === "password") {
          errors[err.path[0]] = err.message;
        }
      });
      return { errors };
    }
    return { error: "Something went wrong" };
  }
}
