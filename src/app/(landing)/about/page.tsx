import { AboutVinkol } from "@/components/about/about-vinkol";
import { Achievement } from "@/components/about/achievement";
import { Mission } from "@/components/about/mission";
import { ShopList } from "@/components/about/shop-list";
import { Teams } from "@/components/about/team";
import { AboutHero } from "@/components/shared/hero";

function About() {
  return (
    <section className="min-h-screen">
      <AboutHero />
      <AboutVinkol />
      <Mission />
      <Teams />
      <Achievement />
      <ShopList />
    </section>
  );
}
export default About;
