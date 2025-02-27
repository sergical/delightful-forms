import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const examples = [
  {
    title: "1. Basic Form",
    description: "HTML form with Next.js Server Actions - The Foundation",
    href: "/basic",
    tags: ["Server Actions", "HTML Form"],
  },
  {
    title: "2. Basic Form with Pending State",
    description: "Form with pending state - The Better Way",
    href: "/basic-with-pending",
    tags: ["Server Actions", "Pending State"],
  },
  {
    title: "3. Schema Validation Form",
    description: "Form with schema validation - zod",
    href: "/zod-validation",
    tags: ["Server Actions", "Schema Validation"],
  },
  {
    title: "4. React Hook Form",
    description: "Form with React Hook Form + Zod validation",
    href: "/react-hook-form",
    tags: ["Zod", "Type Safety"],
  },
  {
    title: "5. ShadCN Form",
    description: "Form with ShadCN - Better UX",
    href: "/shadcn-form",
    tags: ["ShadCN", "Validation"],
  },
  {
    title: "6. Animated Form with Motion",
    description: "Form with Motion (previously Framer Motion) - Delightful UX",
    href: "/animated",
    tags: ["Framer Motion", "Multi-step"],
  },
  {
    title: "7. Multi-step Form with Zustand",
    description: "Multi-step form with Zustand - The Delightful Experience",
    href: "/multi-step",
    tags: ["Zustand", "Multi-step"],
  },
];

export default function HomePage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 border-b-4 border-primary pb-4 text-card-foreground">
          Form Examples
        </h1>
        <div className="grid gap-6">
          {examples.map((example) => (
            <Link key={example.href} href={example.href}>
              <Card className="hover:bg-accent transition-colors">
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {example.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-1 text-sm bg-secondary text-secondary-foreground rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
