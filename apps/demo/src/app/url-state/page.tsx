import { Suspense } from "react";
import URLStateForm from "./components/url-state-form";

export default function URLStatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <URLStateForm />
    </Suspense>
  );
}
