export const ShopList = () => {
  return (
    <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          Shop your favorite stores in Nigeria
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 mt-8">
          {[...Array(9)].map((_, idx) => (
            <img
              key={idx}
              src="/assets/shop1.png"
              alt={`Shop ${idx + 1}`}
              className="h-20 w-20 md:h-32 md:w-32 rounded-full object-cover border shadow-sm hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
