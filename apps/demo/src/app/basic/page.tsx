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
import { submitForm, type FormState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}

export default function BasicForm() {
  const [state, formAction] = useActionState<FormState, FormData>(
    submitForm,
    null
  );

  return (
    <div className="max-w-md mx-auto my-12">
      <Card>
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>
            Basic HTML form with NextJS Server Actions
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction}>
            {state?.error && (
              <div className="mb-4 p-2 text-destructive bg-destructive/10 rounded">
                {state.error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <SubmitButton />
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <Link
            href="/"
            className="text-primary hover:text-primary/90 underline"
          >
            ← Back to examples
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
