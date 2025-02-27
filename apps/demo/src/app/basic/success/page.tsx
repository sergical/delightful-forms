import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export default function SuccessPage() {
  return (
    <div className="max-w-md mx-auto my-12">
      <Card className="text-center">
        <CardHeader>
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-2" />
          <CardTitle>Form Submitted!</CardTitle>
          <CardDescription>
            Thank you for your submission. We&apos;ll be in touch soon.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button asChild>
            <Link href="/basic">Submit Another Form</Link>
          </Button>
        </CardContent>

        <CardFooter className="justify-center">
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
