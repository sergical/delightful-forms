"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { FormStatus } from "../../../components/form-status";

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
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Contact Form</h1>
        <p className="text-gray-600">Form with URL-based state management</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={name}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={email}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              defaultValue={message}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <FormStatus status={status} />

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <Link
          href="/"
          className="text-indigo-600 hover:text-indigo-800 underline"
        >
          ← Back to examples
        </Link>
      </div>
    </div>
  );
}
