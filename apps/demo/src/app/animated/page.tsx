"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { signUpSchema } from "../zod-validation/schema";
import { submitForm } from "./actions";

type FormValues = z.infer<typeof signUpSchema>;

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimatedSignUpForm() {
  const [serverError, setServerError] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
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

  const onSubmit = async (data: FormValues) => {
    try {
      setServerError(undefined);
      const result = await submitForm(data);

      if (!result.success) {
        setServerError(result.error);
      }
      if (result.success) {
        form.reset();
      }
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong. Please try again.");
    }
  };

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
          <Form {...form}>
            <motion.form
              variants={formVariants}
              initial="hidden"
              animate="visible"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <AnimatePresence mode="wait">
                {serverError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="mb-4 p-2 text-destructive bg-destructive/10 rounded"
                  >
                    {serverError}
                  </motion.div>
                )}
              </AnimatePresence>

              <fieldset
                disabled={form.formState.isSubmitting}
                className="space-y-4"
              >
                <motion.div variants={itemVariants}>
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
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              {...field}
                            />
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
                </motion.div>
              </fieldset>

              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="submit"
                    className="w-full relative h-10 overflow-hidden"
                    disabled={form.formState.isSubmitting}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <AnimatePresence mode="wait" initial={false}>
                        {form.formState.isSubmitting ? (
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
                            Continue
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div layout>
                <AnimatePresence mode="wait" initial={false}>
                  {form.formState.isSubmitSuccessful && (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="text-green-500 text-sm"
                    >
                      Account created successfully
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.form>
          </Form>
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
