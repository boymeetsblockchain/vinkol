import type { Metadata } from "next";
import { CTA } from "@/components/home/cta";
import { Deliver } from "@/components/home/deliver";
import { Hero } from "@/components/home/hero";
import { HowitWorks } from "@/components/home/how-it-works";
import { Shop } from "@/components/home/shop";
import Stats from "@/components/home/stats";
import { Trust } from "@/components/home/trust-signal";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { TrustBar } from "@/components/home/trust-bar";
import { BusinessSection } from "@/components/home/business-section";
import { RecruitSection } from "@/components/home/recruit-section";
import { Testimonials } from "@/components/home/testimonials";

export const metadata: Metadata = {
  title: "Vinkol — Fast, Verified Delivery Across Nigeria",
  description:
    "Book on-demand deliveries, shop from your favourite stores, or power your business logistics with Vinkol. Verified riders, real-time tracking, and ₦50,000 guarantee.",
  openGraph: {
    title: "Vinkol — Fast, Verified Delivery Across Nigeria",
    description:
      "Book on-demand deliveries, shop from your favourite stores, or power your business logistics with Vinkol.",
    url: "https://vinkol.com",
    siteName: "Vinkol",
    images: [{ url: "/assets/hero.jpg", width: 1200, height: 630, alt: "Vinkol delivery service" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinkol — Fast, Verified Delivery Across Nigeria",
    description: "On-demand logistics for every Nigerian — individuals, businesses, and stores.",
    images: ["/assets/hero.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowitWorks />
      <BusinessSection />
      <Stats />
      <Shop />
      <WhyChooseUs />
      <Trust />
      <RecruitSection />
      <Testimonials />
      <CTA />
      <Deliver />
    </>
  );
}
