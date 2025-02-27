"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitForm, type FormState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

export default function BasicForm() {
  const [state, formAction] = useActionState<FormState, FormData>(
    submitForm,
    null,
  );

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Contact Form</h1>
        <p className="text-gray-600">
          Basic HTML form with NextJS Server Actions
        </p>
      </div>

      <form action={formAction}>
        {state?.error && (
          <div className="mb-4 p-2 text-red-700 bg-red-100 rounded">
            {state.error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
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
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <SubmitButton />
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
