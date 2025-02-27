"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { signUpSchema } from "../zod-validation/schema";
import { submitForm } from "./actions";

type FormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const [serverError, setServerError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setServerError(undefined);
      const result = await submitForm(data);

      if (!result.success) {
        setServerError(result.error);
      }
      if (result.success) {
        reset();
      }
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-12">
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Get started by creating your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
              <div className="mb-4 p-2 text-destructive bg-destructive/10 rounded">
                {serverError}
              </div>
            )}

            <fieldset disabled={isSubmitting} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  className={errors.email ? "border-destructive" : ""}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className={errors.password ? "border-destructive" : ""}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </fieldset>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Continue"}
            </Button>
            {isSubmitSuccessful && (
              <p className="text-green-500 text-sm">
                Account created successfully
              </p>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Link
            href="/"
            className="text-primary hover:text-primary/90 underline text-sm"
          >
            ← Back to examples
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
