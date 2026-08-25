import type { Metadata } from "next";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: `That page does not exist on ${site.name}.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden pt-[var(--nav-h)]">
      <div
        aria-hidden
        className="tech-grid absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(90%_70%_at_30%_40%,black,transparent_75%)]"
      />
      <div aria-hidden className="noise-layer -z-10" />

      <div className="shell-wide py-20">
        <p className="label flex items-center gap-3 border-t border-line pt-4 text-mute">
          <span className="size-[5px] rounded-full bg-ember" aria-hidden />
          Error 404
        </p>

        <h1 className="display-lg mt-14 max-w-[14ch] uppercase">
          This route was never built
        </h1>

        <p className="lede mt-8 max-w-[46ch]">
          The address resolved, the page did not. It may have moved, or it may
          never have existed — either way, the links below still work.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <MagneticButton href="/" size="lg">
            Back to home
          </MagneticButton>
          <MagneticButton href="/what-we-do" size="lg" variant="outline" arrow={false}>
            What we do
          </MagneticButton>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-[0.9375rem] text-mute">
          Landed here from a link on our site?{" "}
          <TextLink href={`mailto:${site.email}`} className="text-paper-dim">
            Tell us where
          </TextLink>{" "}
          and we will fix it.
        </p>
      </div>
    </section>
  );
}
