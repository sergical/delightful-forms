import type { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { signUpSchema } from "../zod-validation/schema";

type FormData = z.infer<typeof signUpSchema>;

export interface FormState {
  currentStep: number;
  formData: FormData;
  setField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}

// Create a single store instance
export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      currentStep: 0,
      formData: {
        email: "",
        password: "",
      },

      setField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 1),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0),
        })),

      resetForm: () =>
        set({
          currentStep: 0,
          formData: {
            email: "",
            password: "",
          },
        }),
    }),
    {
      name: "registration-form",
    }
  )
);
