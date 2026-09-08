import { CTA } from "@/components/home/cta";
import { Benefits } from "@/components/rider/benefits";
import { Question } from "@/components/shop/questions";
import { Hero } from "@/components/shop/shop-hero";
import { Steps } from "@/components/shop/steps";
import { Country } from "@/lib/markets/types";

export const BecomeAPersonalShopperPage = ({
  country,
}: {
  country: Country;
}) => (
  <section>
    <Hero />
    <Steps />
    <Benefits
      country={country}
      title="What you get as a Vinkol personal shopper."
    />
    <Question country={country} />
    <CTA country={country} />
  </section>
);
