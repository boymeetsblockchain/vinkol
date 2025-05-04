import { CTA } from "@/components/home/cta";
import { Benefits } from "@/components/rider/benefits";
import { Hero } from "@/components/rider/hero";
import { Question } from "@/components/rider/questions";
import { Steps } from "@/components/rider/steps";

function BecomeARider() {
  return (
    <section>
      <Hero />
      <Steps />

      <Benefits />
      <Question />
      <CTA />
    </section>
  );
}
export default BecomeARider;
