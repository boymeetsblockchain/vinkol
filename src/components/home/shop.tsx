import Link from "next/link";
import { Button } from "../button";

export const Shop = () => {
  return (
    <section className="w-full bg-blue-primary h-auto md:h-[400px] py-8 md:py-0">
      <div className="max-w-screen-xl grid w-full mx-auto h-full p-4 md:p-10 gap-8 md:gap-10 grid-cols-1 md:grid-cols-2">
        <div className="flex justify-center items-center">
          <img
            src="/assets/shop-from-home.jpg"
            alt="A shopper browsing products in a supermarket"
            className="w-full max-h-60 md:max-h-80 object-cover border-white border-2 rounded-3xl"
          />
        </div>
        <div className="flex justify-center gap-y-4 md:gap-y-6 flex-col">
          <h1 className="font-bold text-2xl md:text-4xl text-white leading-tight md:leading-[100%]">
            Shop from the comfort of your home from supermarkets around you
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            <Button variant="secondary" size="md">
              <Link href={"/explore-shop"}>
                Explore supermarkets and stores
              </Link>
            </Button>
            <Button variant="secondary" size="md">
              <Link href={"/shop"}>Register Store on Vinkol</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
