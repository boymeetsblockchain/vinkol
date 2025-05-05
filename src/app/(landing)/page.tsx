import { CTA } from "@/components/home/cta";
import { Deliver } from "@/components/home/deliver";
import { Hero } from "@/components/home/hero";
import { HowitWorks } from "@/components/home/how-it-works";
import { Shop } from "@/components/home/shop";
import { Trust } from "@/components/home/trust-signal";
import { WhyChooseUs } from "@/components/home/why-choose-us";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Shop />
      <HowitWorks />
      <Trust />
      <WhyChooseUs />
      <CTA />
      <Deliver />
    </main>
  );
}
