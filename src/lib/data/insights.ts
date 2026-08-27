/** @deprecated Prefer `@/lib/data/blog` and `@/lib/data/podcast`. Kept for any residual imports. */
export type InsightKind = "essay" | "podcast" | "research";

export type Insight = {
  slug: string;
  kind: InsightKind;
  title: string;
  summary: string;
  meta: string;
  language?: "en" | "he";
  href: string;
};

export const insightCategories = [
  {
    id: "essay" as const,
    label: "BLOG",
    description: "Technical and strategic writing.",
    href: "/blog",
  },
  {
    id: "podcast" as const,
    label: "HAMIFAL PODCAST",
    description: "Conversations with founders and builders.",
    href: "/podcast",
  },
];

export const insights: Insight[] = [
  {
    slug: "building-from-architecture",
    kind: "essay",
    title: "Build the architecture before you scale the team",
    summary:
      "Why early technical decisions compound faster than headcount, and how venture studios should think about systems from day one.",
    meta: "ESSAY / 2026",
    href: "/blog/building-from-architecture",
  },
  {
    slug: "operator-led-studios",
    kind: "essay",
    title: "Operator-led, not slide-led",
    summary:
      "A short note on what separates studios that ship companies from those that produce decks.",
    meta: "ESSAY / 2026",
    href: "/blog/operator-led-studios",
  },
  {
    slug: "bootstrapia-ep-01",
    kind: "podcast",
    title: "How to manage several companies with AI agents",
    summary:
      "In the first episode of Bootstrapia I host Ashley, who builds technology products for small businesses in parallel — from gel polish to payment solutions.",
    meta: "PODCAST / EP 01",
    href: "/podcast",
  },
];
