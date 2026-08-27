export type PodcastEpisode = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  date: string;
  duration: string;
  guests: string[];
  topics: string[];
  youtubeId: string;
};

export const podcastShow = {
  name: "Bootstrapia",
  description:
    "Conversations with founders and builders about starting from zero, technical judgment, and the reality of building companies.",
  host: "Si Tadmor",
};

export const podcastEpisodes: PodcastEpisode[] = [
  {
    slug: "bootstrapia-ep-01",
    number: "01",
    title: "How to manage several companies with AI agents",
    summary:
      "In the first episode of Bootstrapia I host Ashley, who builds technology products for small businesses in parallel — from gel polish to payment solutions.\n\nWe talked about her way of identifying problems in traditional markets, launching products quickly, and running several initiatives in parallel with a system of AI agents. Alongside that, we also talked about how to build all of this around a lifestyle of freedom, travel, and enjoying the journey, rather than a life where the business takes over everything.\n\nHow do you decide what to build? What can you hand off to AI agents? How do you keep several products in the air without losing focus? And how do you build businesses that serve the life you want to live?",
    date: "2026-08-27",
    duration: "50 MIN",
    guests: ["Ashley"],
    topics: ["AI AGENTS", "COMPANIES", "LIFESTYLE"],
    youtubeId: "O4OVf2dVO80",
  },
];

export function formatEpisodeDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function episodeParagraphs(text: string): string[] {
  return text.split("\n\n").filter(Boolean);
}
