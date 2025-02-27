"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { signUpSchema } from "../zod-validation/schema";

export type SignUpResponse = {
  success: boolean;
  error?: string;
};

export async function submitForm(
  data: z.infer<typeof signUpSchema>,
): Promise<SignUpResponse> {
  try {
    // Simulate server delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Validate with Zod schema (double validation for security)
    const validatedData = signUpSchema.parse(data);

    // Process the registration (in a real app, this would create a user in the database)
    console.log("User registration:", { email: validatedData.email });

    // Revalidate the current path before redirecting
    revalidatePath("/react-hook-form");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid form data",
      };
    }
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
