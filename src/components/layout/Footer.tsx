import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/lib/content";
import { TextLink } from "@/components/ui/TextLink";
import { BackToTop } from "./BackToTop";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-ink">
      <div aria-hidden className="noise-layer -z-10" />

      <div className="shell relative pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="display-sm max-w-[18ch] font-display uppercase">
              {site.tagline}
            </p>
            <p className="mt-6 max-w-[38ch] text-[0.9375rem] leading-relaxed text-mute">
              A technology studio building software, AI systems, cloud
              infrastructure and automation for teams with real operational
              problems to solve.
            </p>
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="label text-mute-deep">Navigate</h2>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                {[...site.nav, site.cta].map((item) => (
                  <li key={item.href}>
                    <TextLink href={item.href}>{item.label}</TextLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="label text-mute-deep">Services</h2>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                {services.map((service) => (
                  <li key={service.id}>
                    <TextLink href={`/what-we-do#${service.anchor}`}>{service.title}</TextLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="label text-mute-deep">Contact</h2>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                <li>
                  <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
                </li>
                <li>
                  <TextLink href={`tel:${site.phoneHref}`}>{site.phone}</TextLink>
                </li>
                <li className="text-mute">{site.location}</li>
              </ul>

              <h2 className="label mt-8 text-mute-deep">Elsewhere</h2>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                {site.social.map((social) => (
                  <li key={social.label}>
                    <TextLink href={social.href} arrow>
                      {social.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/*
          Ghosted wordmark. Drawn as SVG with `textLength` so it spans the
          shell exactly at every viewport width instead of overflowing.
        */}
        <div className="relative mt-16 select-none md:mt-24" aria-hidden>
          <svg viewBox="0 0 100 13" className="w-full" role="presentation">
            <text
              x="0"
              y="11"
              textLength="100"
              lengthAdjust="spacingAndGlyphs"
              fontSize="13"
              fontWeight="600"
              className="font-display uppercase"
            >
              <tspan fill="none" stroke="#edeae4" strokeOpacity="0.17" strokeWidth="0.09">
                Reinstate
              </tspan>
              <tspan fill="#e2552b" fillOpacity="0.5">
                Labs
              </tspan>
            </text>
          </svg>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-mute-deep">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/book-appointment"
              className="label group inline-flex items-center gap-2 text-mute transition-colors hover:text-paper"
            >
              Book an appointment
              <ArrowUpRight
                aria-hidden
                strokeWidth={1.6}
                className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
              />
            </Link>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
