import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { YouTubeEmbed } from "@/components/podcast/youtube-embed";
import { MonoLabel } from "@/components/shared/mono-label";
import { Reveal } from "@/components/shared/reveal";
import {
  episodeParagraphs,
  formatEpisodeMeta,
  getPodcastEpisodes,
  PODCAST_REVALIDATE_SECONDS,
  podcastShow,
} from "@/lib/data/podcast";

export const revalidate = PODCAST_REVALIDATE_SECONDS;

export const metadata: Metadata = {
  title: "Bootstrapia",
  description: `${podcastShow.name}: ${podcastShow.description}`,
};

export default async function PodcastPage() {
  const podcastEpisodes = await getPodcastEpisodes();
  return (
    <>
      <section className="border-b border-border">
        <Container className="py-16 md:py-24">
          <Reveal>
            <div className="site-grid gap-y-8">
              <div className="col-span-12 md:col-span-7">
                <MonoLabel className="mb-4 block">Podcast</MonoLabel>
                <h1 className="font-display text-5xl tracking-tight md:text-7xl">
                  {podcastShow.name}
                </h1>
              </div>
              <div className="col-span-12 md:col-span-4 md:col-start-9 md:self-end">
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {podcastShow.description}
                </p>
                <div className="mt-8 space-y-2">
                  <MonoLabel className="block text-foreground">
                    Host / {podcastShow.host}
                  </MonoLabel>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-10 md:py-16">
          <MonoLabel className="mb-8 block">Episodes</MonoLabel>
          <div className="border-t border-border">
            {podcastEpisodes.map((episode) => (
              <article
                key={episode.slug}
                className="border-b border-border py-10 md:py-12"
              >
                <div className="site-grid items-start">
                  <div className="col-span-12 md:col-span-3">
                    <p className="font-display text-4xl tracking-tight">
                      {episode.number}
                    </p>
                    <MonoLabel className="mt-4 block">
                      {formatEpisodeMeta(episode)}
                    </MonoLabel>
                  </div>
                  <div className="col-span-12 mt-4 md:col-span-8 md:col-start-5 md:mt-0">
                    <h2
                      dir="auto"
                      className="font-display text-2xl tracking-tight md:text-4xl"
                    >
                      {episode.title}
                    </h2>
                    <div className="mt-6">
                      <YouTubeEmbed
                        videoId={episode.youtubeId}
                        title={episode.title}
                      />
                    </div>
                    <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground">
                      {episodeParagraphs(episode.summary).map((paragraph) => (
                        <p key={paragraph} dir="auto">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {episode.topics.length > 0 ? (
                      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                        {episode.topics.map((topic) => (
                          <MonoLabel key={topic}>{topic}</MonoLabel>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
