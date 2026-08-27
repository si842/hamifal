import { Container } from "@/components/layout/container";
import { YouTubeEmbed } from "@/components/podcast/youtube-embed";
import { MonoLabel } from "@/components/shared/mono-label";
import { Reveal } from "@/components/shared/reveal";
import { TextLink } from "@/components/shared/text-link";
import {
  episodeParagraphs,
  podcastEpisodes,
  podcastShow,
} from "@/lib/data/podcast";

export function IdeasPreview() {
  const latest = podcastEpisodes[0];
  const teaser = latest ? episodeParagraphs(latest.summary)[0] : null;

  return (
    <section className="border-b border-border">
      <Container className="py-20 md:py-28">
        <Reveal>
          <div className="site-grid gap-y-8">
            <div className="col-span-12 md:col-span-7">
              <MonoLabel className="mb-4 block">Writing / Podcast</MonoLabel>
            </div>
            <div className="col-span-12 max-w-md space-y-5 text-base leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:text-lg">
              <p>
                Essays, lessons, and conversations about company building,
                technology, product, execution, and founders.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-8">
                <TextLink href="/blog">Writing →</TextLink>
                <TextLink href="/podcast">Podcast →</TextLink>
              </div>
            </div>
          </div>
        </Reveal>

        {latest ? (
          <Reveal>
            <div className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
              <div className="site-grid items-start gap-y-8">
                <div className="col-span-12 md:col-span-5 lg:col-span-4">
                  <YouTubeEmbed
                    videoId={latest.youtubeId}
                    title={latest.title}
                    autoplayOnView
                  />
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-7">
                  <MonoLabel className="mb-4 block text-foreground">
                    Latest episode / {podcastShow.name}
                  </MonoLabel>
                  <p className="font-display text-3xl tracking-tight">
                    {latest.number}
                  </p>
                  <h2 className="mt-3 font-display text-2xl tracking-tight md:text-3xl">
                    {latest.title}
                  </h2>
                  {teaser ? (
                    <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                      {teaser}
                    </p>
                  ) : null}
                  <div className="mt-6">
                    <TextLink href="/podcast">All episodes →</TextLink>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
