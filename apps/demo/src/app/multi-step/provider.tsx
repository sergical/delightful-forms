"use client";

import type { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

export function FormStoreProvider({ children }: ProviderProps) {
  return children;
}
