import { motion } from "motion/react";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-2 rounded-full flex-1 mx-1 ${
              i <= currentStep ? "bg-primary" : "bg-muted"
            }`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Step {currentStep + 1} of {totalSteps}
      </p>
    </div>
  );
}
