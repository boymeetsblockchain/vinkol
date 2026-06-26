import Link from "next/link";
import { Button } from "../button";
import ImagesSlider from "./slider";
import { AnimateIn } from "../shared/animate-in";

export const Shop = () => {
  return (
    <section className="w-full bg-blue-primary h-auto md:h-[400px] py-8 md:py-0">
      <div className="max-w-screen-xl grid w-full mx-auto h-full p-4 md:p-10 gap-8 md:gap-10 grid-cols-1 md:grid-cols-2">
        <AnimateIn direction="left" className="flex justify-center items-center">
          <ImagesSlider />
        </AnimateIn>
        <AnimateIn direction="right" delay={0.1} className="flex justify-center gap-y-4 md:gap-y-6 flex-col">
          <h1 className="font-bold text-2xl md:text-4xl text-white leading-tight md:leading-[100%]">
            Your Favourite Stores, Delivered to You
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            <Button variant="secondary" size="md">
              <Link href={"/explore-shop"}>
                Explore supermarkets and stores
              </Link>
            </Button>
            <Button variant="secondary" size="md">
              <Link href={"/shop"}>Register Store on Vinkol</Link>
            </Button>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
};
