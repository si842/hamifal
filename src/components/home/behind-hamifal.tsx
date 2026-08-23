import Image from "next/image";
import { Container } from "@/components/layout/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { Reveal } from "@/components/shared/reveal";
import { founder } from "@/lib/data/studio";

export function BehindHamifal() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 md:py-28">
        <Reveal>
          <div className="site-grid border border-border">
            <div className="col-span-12 border-b border-border p-6 md:col-span-4 md:border-r md:border-b-0 md:p-8">
              <MonoLabel className="mb-8 block">About</MonoLabel>
              <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden border border-border bg-background md:mx-0 md:max-w-none">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 280px, 33vw"
                  quality={90}
                />
              </div>
            </div>

            <div className="col-span-12 p-6 md:col-span-8 md:p-10">
              <h2 className="font-display text-4xl tracking-tight text-balance md:text-5xl">
                Behind HAMIFAL is Si Tadmor.
              </h2>
              <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                <p>
                  Si Tadmor is a Unit 8200 alumnus, recipient of the Israel
                  Defense Prize, and holds a B.Sc. in Computer Science.
                </p>
                <p>
                  He is the former Director of Research at Lab42, where he
                  built the research organization from the ground up.
                </p>
                <p>
                  His work has spanned technology and company building, from
                  building the technology itself to turning it into products,
                  teams, customers, and companies.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
