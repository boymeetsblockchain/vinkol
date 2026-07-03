import Link from "next/link";
import { Button } from "../button";
import ImagesSlider from "./slider";

export const Shop = () => {
  return (
    <section className="w-full bg-blue-primary">
      <div className="max-w-7xl grid w-full mx-auto px-6 py-16 md:px-20 md:py-20 gap-12 md:gap-16 grid-cols-1 md:grid-cols-2 items-center">
        <div className="flex justify-center items-center">
          <ImagesSlider />
        </div>
        <div className="flex justify-center gap-y-5 flex-col">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-200">
            Shop from home
          </p>
          <h2 className="font-bold text-3xl md:text-4xl text-white leading-snug tracking-tight">
            Order from stores near you &mdash; without leaving home.
          </h2>
          <p className="text-blue-100 text-base leading-relaxed">
            Browse supermarkets, grocery stores, and specialty shops around
            you. A personal shopper picks up your order and delivers it fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="secondary" size="md">
              <Link href="/explore-shop">Browse stores near you</Link>
            </Button>
            <Button variant="secondary" size="md">
              <Link href="/shop">List your store &mdash; it&apos;s free</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
