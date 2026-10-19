import { translateToEnglish } from "@/lib/translate-to-english";

export type PodcastEpisode = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  date: string;
  duration?: string;
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

/** https://www.youtube.com/@Habootstratpia */
const BOOTSTRAPIA_CHANNEL_ID = "UC4zgRKupldlyHXOevGWSp6g";

const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${BOOTSTRAPIA_CHANNEL_ID}`;

/** YouTube's public feed lists the 15 most recent uploads. */
export const PODCAST_REVALIDATE_SECONDS = 60 * 15;

const fallbackEpisodes: PodcastEpisode[] = [
  {
    slug: "O4OVf2dVO80",
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

export function formatEpisodeMeta(
  episode: Pick<PodcastEpisode, "date" | "duration">,
): string {
  const date = formatEpisodeDate(episode.date);
  return episode.duration ? `${date} / ${episode.duration}` : date;
}

export function episodeParagraphs(text: string): string[] {
  const normalized = text.replaceAll("\r\n", "\n").trim();
  if (!normalized) return [];

  const blocks = normalized
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (blocks.length > 1) return blocks;

  const lines = normalized
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);
  return lines.length > 0 ? lines : [normalized];
}

function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number(code)),
    )
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    );
}

function readTag(xml: string, tag: string): string {
  const match = xml.match(
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`),
  );
  return match ? decodeXml(match[1].trim()) : "";
}

export function parseYouTubeFeed(xml: string): PodcastEpisode[] {
  const entries = xml
    .split("<entry>")
    .slice(1)
    .map((chunk) => chunk.split("</entry>")[0] ?? "");

  const parsed = entries.flatMap((entry) => {
    const youtubeId = readTag(entry, "yt:videoId");
    const published = readTag(entry, "published");
    const title = readTag(entry, "title");
    if (!youtubeId || !published || !title) return [];

    const date = published.slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];

    return [
      {
        youtubeId,
        title,
        summary: readTag(entry, "media:description"),
        date,
        published,
      },
    ];
  });

  const chronological = [...parsed].sort((a, b) =>
    a.published.localeCompare(b.published),
  );
  const numberById = new Map(
    chronological.map((episode, index) => [
      episode.youtubeId,
      String(index + 1).padStart(2, "0"),
    ]),
  );

  return [...parsed]
    .sort((a, b) => b.published.localeCompare(a.published))
    .map((episode) => ({
      slug: episode.youtubeId,
      number: numberById.get(episode.youtubeId) ?? "01",
      title: episode.title,
      summary: episode.summary,
      date: episode.date,
      guests: [],
      topics: [],
      youtubeId: episode.youtubeId,
    }));
}

async function withEnglishCopy(
  episode: PodcastEpisode,
): Promise<PodcastEpisode> {
  const [title, summary] = await Promise.all([
    translateToEnglish(episode.title),
    translateToEnglish(episode.summary),
  ]);
  return { ...episode, title, summary };
}

export async function getPodcastEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const response = await fetch(YOUTUBE_FEED_URL, {
      next: {
        revalidate: PODCAST_REVALIDATE_SECONDS,
        tags: ["bootstrapia"],
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      throw new Error(`YouTube feed responded ${response.status}`);
    }

    const episodes = parseYouTubeFeed(await response.text());
    if (episodes.length === 0) {
      throw new Error("YouTube feed had no episodes");
    }
    return Promise.all(episodes.map(withEnglishCopy));
  } catch (error) {
    console.error("Failed to load Bootstrapia episodes from YouTube.", error);
    return fallbackEpisodes;
  }
}
