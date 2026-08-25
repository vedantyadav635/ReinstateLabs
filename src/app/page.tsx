import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Positioning } from "@/components/sections/Positioning";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechEcosystem } from "@/components/sections/TechEcosystem";
import { CTASection } from "@/components/sections/CTASection";
import { marqueeItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "ReinstateLabs — Building What's Next",
  description:
    "ReinstateLabs is a technology studio building software, AI systems, cloud infrastructure and automation for companies that need technology to work in production.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* Pinned to the original ground colour so the hero is untouched by
          the darker/less-saturated palette used everywhere else on the site. */}
      <div style={{ backgroundColor: "#08080a" }}>
        <Hero />
      </div>
      <Marquee items={marqueeItems} />
      <ServicesSection index={1} />
      <Positioning />
      <ProcessSection index={3} />
      <TechEcosystem index={4} />
      <CTASection />
    </>
  );
}
