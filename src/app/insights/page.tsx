import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { Reveal } from "@/components/shared/reveal";
import { TextLink } from "@/components/shared/text-link";
import { blogPosts, formatBlogDate } from "@/lib/data/blog";
import {
  formatEpisodeDate,
  podcastEpisodes,
  podcastShow,
} from "@/lib/data/podcast";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Essays, Bootstrapia, and selected research from HAMIFAL.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="border-b border-border">
        <Container className="py-16 md:py-24">
          <Reveal>
            <MonoLabel className="mb-4 block">Publication</MonoLabel>
            <h1 className="font-display text-5xl tracking-tight md:text-7xl">
              Insights
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Technical writing and conversations with builders. The
              publication layer of the studio.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-8">
              <TextLink href="/blog">Open the blog →</TextLink>
              <TextLink href="/podcast">Open the podcast →</TextLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-14 md:py-20">
          <Reveal>
            <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
              <div>
                <MonoLabel className="mb-3 block">Blog</MonoLabel>
                <h2 className="font-display text-3xl tracking-tight md:text-4xl">
                  Essays & research
                </h2>
              </div>
              <TextLink href="/blog">All posts →</TextLink>
            </div>
          </Reveal>
          <div className="border-t border-border">
            {blogPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.03}>
                <article className="site-grid border-b border-border py-8 md:py-10">
                  <div className="col-span-12 md:col-span-3">
                    <MonoLabel>
                      {post.category} / {formatBlogDate(post.date)}
                    </MonoLabel>
                  </div>
                  <div className="col-span-12 mt-3 md:col-span-8 md:col-start-5 md:mt-0">
                    <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition-opacity hover:opacity-60"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                      {post.summary}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-14 md:py-20">
          <Reveal>
            <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
              <div>
                <MonoLabel className="mb-3 block">Podcast</MonoLabel>
                <h2 className="font-display text-3xl tracking-tight md:text-4xl">
                  {podcastShow.name}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {podcastShow.description}
                </p>
              </div>
              <TextLink href="/podcast">All episodes →</TextLink>
            </div>
          </Reveal>
          <div className="border-t border-border">
            {podcastEpisodes.map((episode, index) => (
              <Reveal key={episode.slug} delay={index * 0.03}>
                <article className="site-grid border-b border-border py-8 md:py-10">
                  <div className="col-span-12 md:col-span-3">
                    <MonoLabel>
                      EP {episode.number} / {formatEpisodeDate(episode.date)}
                    </MonoLabel>
                  </div>
                  <div className="col-span-12 mt-3 md:col-span-8 md:col-start-5 md:mt-0">
                    <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                      <Link
                        href="/podcast"
                        className="transition-opacity hover:opacity-60"
                      >
                        {episode.title}
                      </Link>
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                      {episode.summary}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
