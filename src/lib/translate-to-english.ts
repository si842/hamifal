const TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single";

/** Unchanged copy is cached for 30 days. A new YouTube title or description is a new request. */
const TRANSLATION_REVALIDATE_SECONDS = 60 * 60 * 24 * 30;

const HEBREW = /[\u0590-\u05FF]/;

/**
 * Google's Hebrew transliteration misses these guests' usual English spellings.
 * כפיר גיא / שריאל מזוז
 */
const NAME_FIXES: Array<[RegExp, string]> = [
  [/\bKafir\b/g, "Kfir"],
  [/\bShariel\b/g, "Sariel"],
];

function applyNameFixes(text: string): string {
  return NAME_FIXES.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    text,
  );
}

function readTranslation(payload: unknown): string {
  if (!Array.isArray(payload) || !Array.isArray(payload[0])) {
    throw new Error("Unexpected translation response");
  }

  const text = payload[0]
    .map((part) =>
      Array.isArray(part) && typeof part[0] === "string" ? part[0] : "",
    )
    .join("")
    .trim();

  if (!text) throw new Error("Empty translation");
  return applyNameFixes(text);
}

async function translateChunk(text: string): Promise<string> {
  const params = new URLSearchParams({
    client: "gtx",
    sl: "he",
    tl: "en",
    dt: "t",
    q: text,
  });

  const response = await fetch(`${TRANSLATE_URL}?${params}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: TRANSLATION_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Translation responded ${response.status}`);
  }

  return readTranslation(await response.json());
}

export async function translateToEnglish(text: string): Promise<string> {
  if (!HEBREW.test(text)) return text;

  try {
    if (text.length <= 1800) return await translateChunk(text);

    const parts = text.split(/(\n{2,})/);
    const translated = await Promise.all(
      parts.map((part) =>
        part.trim() && HEBREW.test(part) ? translateChunk(part) : part,
      ),
    );
    return applyNameFixes(translated.join(""));
  } catch (error) {
    console.error("Failed to translate Bootstrapia text to English.", error);
    return text;
  }
}
