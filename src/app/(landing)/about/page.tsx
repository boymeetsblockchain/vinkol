import { AboutVinkol } from "@/components/about/about-vinkol";
import { AboutHero } from "@/components/shared/hero";

function About() {
  return (
    <section className="min-h-screen">
      <AboutHero />
      <AboutVinkol />
    </section>
  );
}
export default About;
