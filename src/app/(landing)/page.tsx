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

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Shop />
      <HowitWorks />
      <Youtube />
      <Trust />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
      <Deliver />
    </main>
  );
}
