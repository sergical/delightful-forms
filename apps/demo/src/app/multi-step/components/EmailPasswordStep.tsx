import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { signUpSchema } from "../../zod-validation/schema";
import { useFormStore } from "../store";

type FormValues = z.infer<typeof signUpSchema>;

export function EmailPasswordStep() {
  const [showPassword, setShowPassword] = useState(false);
  const formData = useFormStore((state) => state.formData);
  const setField = useFormStore((state) => state.setField);
  const nextStep = useFormStore((state) => state.nextStep);

  const form = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
    defaultValues: {
      email: formData.email,
      password: formData.password,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "password") {
        form.trigger("password");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (data: FormValues) => {
    setField("email", data.email);
    setField("password", data.password);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <motion.div layout>
                <AnimatePresence mode="wait" initial={false}>
                  {form.formState.errors.email && (
                    <motion.div
                      key={form.formState.errors.email.message}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <FormMessage />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} {...field} />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {showPassword ? (
                        <motion.div
                          key="eyeOff"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <EyeOff size={16} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="eye"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Eye size={16} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </FormControl>
              <motion.div layout>
                <AnimatePresence mode="wait" initial={false}>
                  {form.formState.errors.password && (
                    <motion.div
                      key={form.formState.errors.password.message}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <FormMessage />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </FormItem>
          )}
        />

        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
