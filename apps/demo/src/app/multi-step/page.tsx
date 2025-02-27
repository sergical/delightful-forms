"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState, type ComponentType } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { EmailPasswordStep } from "./components/EmailPasswordStep";
import { FormProgress } from "./components/FormProgress";
import { ReviewStep } from "./components/ReviewStep";
import { useFormStore } from "./store";

const steps: ComponentType[] = [EmailPasswordStep, ReviewStep];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

function MultiStepFormContent() {
  const currentStep = useFormStore((state) => state.currentStep);
  const [isHydrated, setIsHydrated] = useState(false);
  const StepComponent = steps[currentStep];

  // Wait for hydration to complete
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const direction = currentStep === 0 ? 1 : -1;

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
          <FormProgress currentStep={currentStep} totalSteps={steps.length} />

          {isHydrated && (
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {StepComponent && <StepComponent />}
              </motion.div>
            </AnimatePresence>
          )}
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

export default function MultiStepForm() {
  return <MultiStepFormContent />;
}
