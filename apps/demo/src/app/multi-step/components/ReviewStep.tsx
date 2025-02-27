import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { submitForm } from "../actions";
import { useFormStore } from "../store";

export function ReviewStep() {
  const formData = useFormStore((state) => state.formData);
  const prevStep = useFormStore((state) => state.prevStep);
  const resetForm = useFormStore((state) => state.resetForm);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(undefined);
      const result = await submitForm(formData);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setIsSuccess(true);
      resetForm();
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
          <p className="mt-1">{formData.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Password
          </h3>
          <p className="mt-1">••••••••</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="p-2 text-destructive bg-destructive/10 rounded"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={isSubmitting}
          className="flex-1"
        >
          Back
        </Button>
        <motion.div
          className="flex-1"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full relative h-10 overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {isSubmitting ? (
                  <motion.div
                    key="submitting"
                    className="flex items-center justify-center"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    Create account
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Button>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="text-green-500 text-sm text-center"
          >
            Account created successfully!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
