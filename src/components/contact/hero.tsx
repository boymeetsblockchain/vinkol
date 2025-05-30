export const ContactHero = () => {
  return (
    <section
      className="h-[500px] bg-cover relative  flex items-center justify-center"
      style={{ backgroundImage: `url('/assets/contact-about.jpg')` }}
    >
      <div className="inset-0 absolute bg-black/40" />
      <div className="text-center text-white z-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 leading-tight">
          Contact Us
        </h1>

        <p className="text-lg sm:text-xl font-medium">Home \ Contact</p>
      </div>
    </section>
  );
};
