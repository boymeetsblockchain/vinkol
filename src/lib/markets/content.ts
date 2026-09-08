import { Country } from "./types";

/**
 * The copy that differs between markets, and only that.
 *
 * Deliberately not i18n. Everything genuinely shared stays as inline JSX in
 * the components; putting it all behind keys would make the site harder to read
 * for no benefit while we have one language. What lives here is the set of
 * strings that would be *wrong* in the other market — currency, coverage
 * amount, service area, payout mechanics, legal entity name, contact details.
 */

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
}

export interface MarketContent {
  /** Trading name. Canada operates as Vinkol Group. */
  brandName: string;
  legalName: string;
  /** Where we actually dispatch. Never broader than the truth. */
  serviceArea: string;
  /** For sentences like "delivering across {serviceAreaPhrase}". */
  serviceAreaPhrase: string;

  /** The item-protection promise, already formatted for display. */
  coverAmount: string;
  /** Same figure, spelled out for a stat counter. */
  coverStat: { value: number; suffix: string; label: string };

  contact: {
    email: string;
    /** Empty renders nothing rather than an empty row. */
    address: string;
    phones: string[];
  };

  payout: {
    /** One-line benefit-card version. */
    summary: string;
    /** Full FAQ answer for riders and shoppers. */
    riderFaq: string;
    /** Full FAQ answer for store owners. */
    storeFaq: string;
  };

  appStore: {
    customer: string;
    rider: string;
  };

  /**
   * Empty in Canada until there are real ones. The section renders nothing
   * rather than inventing quotes — fabricated reviews are a deception, and
   * Canada's Competition Act penalises the advertiser for them.
   */
  testimonials: Testimonial[];
  testimonialsHeading: string;

  meta: {
    titleSuffix: string;
    tagline: string;
    defaultDescription: string;
  };
}

const NIGERIA: MarketContent = {
  brandName: "Vinkol Logistics",
  legalName: "Vinkol Materials and Commercial Ventures Limited",
  serviceArea: "Nigeria",
  serviceAreaPhrase: "Nigeria",

  coverAmount: "₦50,000",
  coverStat: { value: 50, suffix: ",000+", label: "Naira in protected item value" },

  contact: {
    email: "vinkollogistics@gmail.com",
    address:
      "No 1 Sea Shopping Complex, Oko Afo along Badagry Express Way, Lagos",
    phones: ["+234 807 972 231", "+234 336 707 45"],
  },

  payout: {
    summary: "Earnings credited to your wallet, withdrawn to your bank account.",
    riderFaq:
      "Riders are paid daily or weekly via direct bank transfer. Daily payouts carry a processing fee under 1% of total daily income.",
    storeFaq: "You get paid daily or weekly via bank transfer.",
  },

  appStore: {
    customer: "https://apps.apple.com/app/vinkol/id6751447117",
    rider: "https://apps.apple.com/app/vinkol-go/id6751474425",
  },

  testimonials: [
    {
      name: "Amara Okafor",
      location: "Lagos",
      quote:
        "My package arrived within the hour and the rider called ahead. Genuinely the best delivery app I've used in Lagos.",
      rating: 5,
    },
    {
      name: "Tunde Adeleke",
      location: "Lagos",
      quote:
        "I run a small shop and Vinkol handles every order now. Tracking means I stop fielding calls asking where things are.",
      rating: 5,
    },
    {
      name: "Ngozi Eze",
      location: "Abuja",
      quote:
        "Booked a same-day pickup at short notice and it just worked. The price I was quoted was the price I paid.",
      rating: 5,
    },
    {
      name: "Chidi Nwosu",
      location: "Enugu",
      quote:
        "Fragile items, and everything arrived intact. Being able to note that at booking made the difference.",
      rating: 5,
    },
    {
      name: "Fatima Aliyu",
      location: "Kano",
      quote:
        "I use it weekly for my store's deliveries. Riders are verified, which matters when you're handing over stock.",
      rating: 5,
    },
    {
      name: "Emeka Obi",
      location: "Port Harcourt",
      quote:
        "Support actually answered when I needed them. It's rare to find a service this consistent in Nigeria.",
      rating: 5,
    },
  ],
  testimonialsHeading: "Loved by thousands across Nigeria.",

  meta: {
    titleSuffix: "Vinkol Logistics",
    tagline: "Think Vinkol, feel delivery valour.",
    defaultDescription:
      "Think Vinkol, feel delivery valour. Fast, verified and insured delivery across Nigeria — book a rider, send in bulk, or order from stores near you.",
  },
};

const CANADA: MarketContent = {
  brandName: "Vinkol Group",
  legalName: "Vinkol Group",
  serviceArea: "Toronto",
  serviceAreaPhrase: "Toronto",

  coverAmount: "CA$100",
  coverStat: { value: 100, suffix: "", label: "Dollars in protected item value" },

  contact: {
    // TODO_CA_CONTACT: supply the Canadian address and phone before launch.
    // Left blank rather than filled with a Lagos address; the footer and
    // contact page render nothing for an empty value.
    email: "vinkollogistics@gmail.com",
    address: "",
    phones: [],
  },

  payout: {
    summary:
      "Earnings land in your wallet as you complete jobs. Withdraw any time by Interac or bank deposit.",
    riderFaq:
      "There is no payout schedule to wait for. Your wallet is credited as soon as each delivery is completed, and you request a withdrawal whenever you want the money. Our team reviews the request and sends it by Interac e-Transfer or direct bank deposit. Vinkol charges no withdrawal fee.",
    storeFaq:
      "Your wallet is credited on every completed sale, with no payout schedule to wait for. Request a withdrawal whenever you like and our team sends it by Interac e-Transfer or direct bank deposit. Vinkol charges no withdrawal fee.",
  },

  appStore: {
    // TODO_CA_APPSTORE: verify Canadian App Store availability before launch.
    customer: "https://apps.apple.com/app/vinkol/id6751447117",
    rider: "https://apps.apple.com/app/vinkol-go/id6751474425",
  },

  testimonials: [],
  testimonialsHeading: "",

  meta: {
    titleSuffix: "Vinkol Group",
    tagline: "Think Vinkol, feel delivery valour.",
    defaultDescription:
      "Think Vinkol, feel delivery valour. Fast, verified and insured same-day delivery in Toronto — book a courier, send in bulk, or order from local stores.",
  },
};

export const MARKET_CONTENT: Record<Country, MarketContent> = {
  NG: NIGERIA,
  CA: CANADA,
};
