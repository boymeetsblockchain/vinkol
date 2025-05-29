import { AboutVinkol } from "@/components/about/about-vinkol";
import { Mission } from "@/components/about/mission";
import { AboutHero } from "@/components/shared/hero";

function About() {
  return (
    <section className="min-h-screen">
      <AboutHero />
      <AboutVinkol />
      <Mission />
    </section>
  );
}
export default About;
