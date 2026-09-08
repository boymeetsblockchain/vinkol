import { AboutVinkol } from "@/components/about/about-vinkol";
import { Achievement } from "@/components/about/achievement";
import { Mission } from "@/components/about/mission";
import { ShopList } from "@/components/about/shop-list";
import { Teams } from "@/components/about/team";
import { AboutHero } from "@/components/shared/hero";
import { Country } from "@/lib/markets/types";

export const AboutPage = ({ country }: { country: Country }) => (
  <section className="min-h-screen">
    <AboutHero />
    <AboutVinkol country={country} />
    <Mission />
    <Teams />
    <Achievement />
    <ShopList country={country} />
  </section>
);
