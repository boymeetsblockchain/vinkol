import { CTA } from "@/components/home/cta";
import { Deliver } from "@/components/home/deliver";
import { Hero } from "@/components/home/hero";
import { HowitWorks } from "@/components/home/how-it-works";
import { Shop } from "@/components/home/shop";
import { Youtube } from "@/components/home/youtube";
import Stats from "@/components/home/stats";
import { Trust } from "@/components/home/trust-signal";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { Country } from "@/lib/markets/types";

/**
 * Shared by / and /ca. The market arrives as a prop rather than from the path,
 * because these are server components and cannot read usePathname.
 */
export const HomePage = ({ country }: { country: Country }) => (
  <main>
    <Hero country={country} />
    <Stats country={country} />
    <Shop country={country} />
    <HowitWorks />
    <Youtube />
    <Trust country={country} />
    <WhyChooseUs country={country} />
    <Testimonials country={country} />
    <CTA country={country} />
    <Deliver />
  </main>
);
