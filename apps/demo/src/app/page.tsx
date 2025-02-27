import Link from "next/link";

const examples = [
  {
    title: "1. Basic Form",
    description: "HTML form with Next.js Server Actions - The Foundation",
    href: "/basic",
    tags: ["Server Actions", "HTML Form"],
  },
  {
    title: "2. URL State Form",
    description: "Form with URL-based state management - The Common Approach",
    href: "/url-state",
    tags: ["URL State", "SearchParams"],
  },
  {
    title: "3. Client State Form",
    description: "Form with Zustand state management - The Better Way",
    href: "/client-state",
    tags: ["Zustand", "Cookie Store"],
  },
  {
    title: "4. Validated Form",
    description: "Form with Zod validation - Type-Safe Forms",
    href: "/validated",
    tags: ["Zod", "Type Safety"],
  },
  {
    title: "5. Enhanced Form",
    description: "Form with React Hook Form - Better UX",
    href: "/enhanced",
    tags: ["React Hook Form", "Validation"],
  },
  {
    title: "6. Animated Form",
    description: "Multi-step form with animations - The Delightful Experience",
    href: "/animated",
    tags: ["Framer Motion", "Multi-step"],
  },
  {
    title: "7. Bad Examples",
    description: "Collection of anti-patterns in forms",
    href: "/anti-patterns",
    tags: ["Anti-patterns", "UX"],
  },
];

export default function HomePage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 border-b-4 border-black pb-4">
          Form Examples
        </h1>
        <div className="grid gap-6">
          {examples.map((example) => (
            <Link
              key={example.href}
              href={example.href}
              className="block p-6 border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              <h2 className="text-2xl font-bold mb-2">{example.title}</h2>
              <p className="mb-4">{example.description}</p>
              <div className="flex gap-2">
                {example.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-sm border border-current"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
