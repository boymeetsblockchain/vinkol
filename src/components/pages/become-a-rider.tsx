import { CTA } from "@/components/rider/cta";
import { Benefits } from "@/components/rider/benefits";
import { Hero } from "@/components/rider/hero";
import { Question } from "@/components/rider/questions";
import { Steps } from "@/components/rider/steps";
import { Country } from "@/lib/markets/types";

export const BecomeARiderPage = ({ country }: { country: Country }) => (
  <section>
    <Hero country={country} />
    <Steps />
    <Benefits country={country} />
    <Question country={country} />
    <CTA country={country} />
  </section>
);
