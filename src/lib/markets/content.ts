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
  role: string;
  /** Initials for the avatar circle. */
  avatar: string;
  rating: number;
  text: string;
  /** Tailwind background class for the avatar. */
  color: string;
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
  /**
   * The aggregate rating badge. Null where there is no real rating to show;
   * a made-up average is the same problem as a made-up review.
   */
  ratingSummary: { score: string; count: string } | null;

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
      role: "Small Business Owner",
      avatar: "AO",
      rating: 5,
      text: "Vinkol has completely changed how I manage deliveries for my store. Riders arrive in minutes and my customers are always satisfied. I can't imagine running my business without it.",
      color: "bg-blue-500",
    },
    {
      name: "Tunde Adeleke",
      role: "Frequent Shopper",
      avatar: "TA",
      rating: 5,
      text: "I placed an order and had it at my door in under an hour. The real-time tracking gave me peace of mind the whole time. Genuinely the best delivery app I've used in Lagos.",
      color: "bg-violet-500",
    },
    {
      name: "Ngozi Eze",
      role: "E-commerce Seller",
      avatar: "NE",
      rating: 5,
      text: "My customers love that I offer same-day delivery now. Vinkol's riders are professional and the app is super easy to use. My sales have gone up since I started using it.",
      color: "bg-emerald-500",
    },
    {
      name: "Chidi Nwosu",
      role: "Regular User",
      avatar: "CN",
      rating: 5,
      text: "The personal shopper feature is a game changer. I sent someone to pick up groceries and some items from two different stores — all in one trip. Absolutely seamless.",
      color: "bg-orange-500",
    },
    {
      name: "Fatima Aliyu",
      role: "Fashion Retailer",
      avatar: "FA",
      rating: 5,
      text: "Fast, reliable, and insured. I've sent fragile items multiple times and everything arrived perfectly. The customer support team is also very responsive whenever I need help.",
      color: "bg-pink-500",
    },
    {
      name: "Emeka Obi",
      role: "Tech Entrepreneur",
      avatar: "EO",
      rating: 5,
      text: "I use Vinkol every week. The tracking is accurate, the riders are always on time, and the pricing is fair. It's rare to find a service this consistent in Nigeria.",
      color: "bg-cyan-500",
    },
  ],
  testimonialsHeading: "Loved by thousands across Nigeria.",
  ratingSummary: { score: "4.8", count: "2,000+ ratings" },

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

  // Empty until a Toronto pilot produces real quotes we have permission to
  // publish. The section renders nothing rather than inventing any.
  testimonials: [],
  testimonialsHeading: "",
  ratingSummary: null,

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
