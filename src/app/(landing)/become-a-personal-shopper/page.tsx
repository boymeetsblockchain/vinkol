import { CTA } from "@/components/home/cta";
import { Benefits } from "@/components/rider/benefits";
import { Question } from "@/components/rider/questions";
import { Steps } from "@/components/rider/steps";
import { Hero } from "@/components/shop/shop-hero";

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
