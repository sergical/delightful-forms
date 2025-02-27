import { CheckCircle, Loader2, XCircle } from "lucide-react";

type FormStatusProps = {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
};

export function FormStatus({ status, message }: FormStatusProps) {
  if (status === "idle") return null;

  return (
    <div
      className={`flex items-center gap-2 rounded-md p-3 ${
        status === "success"
          ? "bg-green-50 text-green-700"
          : status === "error"
            ? "bg-red-50 text-red-700"
            : "bg-blue-50 text-blue-700"
      }`}
    >
      {status === "submitting" ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : status === "success" ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <XCircle className="h-5 w-5" />
      )}
      <p>{message || getDefaultMessage(status)}</p>
    </div>
  );
}

function getDefaultMessage(status: FormStatusProps["status"]) {
  switch (status) {
    case "submitting":
      return "Submitting...";
    case "success":
      return "Form submitted successfully!";
    case "error":
      return "Something went wrong. Please try again.";
    default:
      return "";
  }
}
