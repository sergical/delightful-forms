import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "../components/theme-provider";
import { ModeToggle } from "../components/theme-toggle";
import { cn } from "../lib/utils";
import "./globals.css";
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
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
      <body className={cn(spaceMono.className, "brutalist antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="fixed top-0 left-0 w-full bg-background text-foreground p-4 border-b border-border z-50">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <Link href="/">
                  <h1 className="text-xl font-bold">Delightful Forms</h1>
                </Link>
                <div className="flex items-center gap-2">
                  <ModeToggle />
                  <a
                    href="https://github.com/sergical/delightful-forms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-muted-foreground"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main className="mt-20 max-w-7xl mx-auto px-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
