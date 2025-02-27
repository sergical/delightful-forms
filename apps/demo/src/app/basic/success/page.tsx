import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md text-center">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">Form Submitted!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your submission. We&apos;ll be in touch soon.
      </p>
      <Link
        href="/basic"
        className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Submit Another Form
      </Link>
      <div className="mt-4">
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
