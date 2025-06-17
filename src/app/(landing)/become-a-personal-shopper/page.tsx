import { CTA } from "@/components/home/cta";
import { Benefits } from "@/components/rider/benefits";
import { Question } from "@/components/shop/questions";
import { Hero } from "@/components/shop/shop-hero";
import { Steps } from "@/components/shop/steps";

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
