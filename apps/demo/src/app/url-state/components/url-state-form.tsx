"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { FormStatus } from "../../../components/form-status";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export default function URLStateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const message = searchParams.get("message") || "";
  const status = (searchParams.get("status") || "idle") as
    | "idle"
    | "submitting"
    | "success"
    | "error";

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        newSearchParams.set(key, value);
      });
      return newSearchParams.toString();
    },
    [searchParams],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Update URL with form data and "submitting" status
    startTransition(() => {
      router.push(
        "?" +
          createQueryString({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
            status: "submitting",
          }),
      );
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update status to success
    startTransition(() => {
      router.push(
        "?" +
          createQueryString({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
            status: "success",
          }),
      );
    });
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-card rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-card-foreground">
          Contact Form
        </h1>
        <p className="text-muted-foreground">
          Form with URL-based state management
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={name}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              defaultValue={email}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              name="message"
              rows={4}
              defaultValue={message}
              required
              className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <FormStatus status={status} />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <Link href="/" className="text-primary hover:text-primary/90 underline">
          ← Back to examples
        </Link>
      </div>
    </div>
  );
}
