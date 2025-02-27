import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "../components/theme-provider";
import { ModeToggle } from "../components/theme-toggle";
import { cn } from "../lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Delightful Forms",
  description: "A journey from basic to delightful form experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-screen bg-background"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-border bg-card">
              <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                  <Link href="/" className="flex items-center space-x-3">
                    <span className="text-xl font-semibold">
                      Delightful Forms
                    </span>
                  </Link>
                </div>
                <nav className="flex items-center space-x-6">
                  <Link
                    href="https://github.com/sergical/delightful-forms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    GitHub
                  </Link>
                  <ModeToggle />
                </nav>
              </div>
            </header>
            <main className="flex-1 container py-8 px-4">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
