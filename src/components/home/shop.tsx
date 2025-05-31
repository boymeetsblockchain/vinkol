import Link from "next/link";
import { Button } from "../button";

export const Shop = () => {
  return (
    <section className="hidden md:block w-full bg-blue-primary h-[400px]">
      <div className="max-w-screen-xl grid w-full mx-auto h-full p-10 gap-10 grid-cols-1 md:grid-cols-2">
        <img
          src="https://i.guim.co.uk/img/media/bb5e732bdd0ae3bafca2ca7182232a562a824dfa/0_331_6541_3924/master/6541.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=2d7e945e63c81df2a9e3fdbf154c7958"
          alt="A shopper browsing products in a supermarket"
          className="h-3/4 object-cover w-full border-white border-2 rounded-3xl"
        />
        <div className="flex justify-center gap-y-6 flex-col">
          <h1 className="font-bold text-4xl text-white leading-[100%]">
            Shop from the comfort of your home from supermarkets around you
          </h1>
          <div>
            <Button variant="secondary" size="md">
              <Link href={"/explore-shop"}>Explore supermarket</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
