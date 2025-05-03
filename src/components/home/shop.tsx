import { Button } from "../button";

export const Shop = () => {
  return (
    <section className="hidden md:block w-full bg-blue-primary h-[400px]">
      <div className="max-w-screen-xl grid w-full mx-auto h-full p-10 gap-10 grid-cols-1 md:grid-cols-2">
        <img
          src="/assets/shop.jpg"
          alt="A shopper browsing products in a supermarket"
          className="h-3/4 object-cover w-full border-white border-2 rounded-3xl"
        />
        <div className="flex justify-center gap-y-6 flex-col">
          <h1 className="font-bold text-4xl text-white leading-[100%]">
            Shop from the comfort of your home from supermarkets around you
          </h1>
          <div>
            <Button variant="secondary" size="md">
              Explore Supermarket
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
