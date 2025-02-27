"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
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
import { FormErrors, submitForm, type FormState } from "./actions";

// Has to be inside the form tag as a separate component for useFormStatus to work
// https://react.dev/reference/react-dom/hooks/useFormStatus
function SignInFormFields({ errors }: { errors: FormErrors }) {
  const { pending } = useFormStatus();

  return (
    <div className="space-y-4">
      <fieldset disabled={pending} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input type="email" id="email" name="email" required />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" required />
          {errors.password && (
            <p className="text-destructive text-sm">{errors.password}</p>
          )}
        </div>
      </fieldset>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in..." : "Continue"}
      </Button>
    </div>
  );
}

export default function SignUpForm() {
  const [state, formAction] = useActionState<FormState, FormData>(
    submitForm,
    null,
  );

  console.log("state", state);

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
          <form action={formAction}>
            {state?.error && (
              <div className="mb-4 p-2 text-destructive bg-destructive/10 rounded">
                {state.error}
              </div>
            )}
            <SignInFormFields errors={state?.errors || {}} />
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
