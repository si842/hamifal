import { BehindHamifal } from "@/components/home/behind-hamifal";
import { Hero } from "@/components/home/hero";
import { IdeasPreview } from "@/components/home/ideas-preview";
import { SelectedWork } from "@/components/home/selected-work";
import { Thesis } from "@/components/home/thesis";
import { PODCAST_REVALIDATE_SECONDS } from "@/lib/data/podcast";

export const revalidate = PODCAST_REVALIDATE_SECONDS;

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Thesis />
      <IdeasPreview />
      <BehindHamifal />
    </>
  );
}
