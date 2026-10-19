import { Container } from "@/components/layout/container";
import { YouTubeEmbed } from "@/components/podcast/youtube-embed";
import { MonoLabel } from "@/components/shared/mono-label";
import { Reveal } from "@/components/shared/reveal";
import { TextLink } from "@/components/shared/text-link";
import {
  episodeParagraphs,
  getPodcastEpisodes,
  podcastShow,
} from "@/lib/data/podcast";

export async function IdeasPreview() {
  const episodes = await getPodcastEpisodes();
  const latest = episodes[0];
  const teaser = latest ? episodeParagraphs(latest.summary)[0] : null;

  if (!latest) return null;

  return (
    <section className="border-b border-border">
      <Container className="py-20 md:py-28">
        <Reveal>
          <div className="site-grid items-start gap-y-8">
            <div className="col-span-12 min-w-0 md:col-span-5">
              <YouTubeEmbed
                videoId={latest.youtubeId}
                title={latest.title}
                autoplayOnView
                className="w-full max-w-full"
              />
            </div>
            <div className="col-span-12 min-w-0 md:col-span-6 md:col-start-7">
              <MonoLabel className="mb-4 block text-foreground">
                Latest episode / {podcastShow.name}
              </MonoLabel>
              <p className="font-display text-3xl tracking-tight">
                {latest.number}
              </p>
              <h2
                dir="auto"
                className="mt-3 font-display text-2xl tracking-tight md:text-3xl"
              >
                {latest.title}
              </h2>
              {teaser ? (
                <p
                  dir="auto"
                  className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground"
                >
                  {teaser}
                </p>
              ) : null}
              <div className="mt-6">
                <TextLink href="/podcast">All episodes →</TextLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
