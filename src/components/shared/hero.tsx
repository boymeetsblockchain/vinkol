export const AboutHero = () => {
  return (
    <section
      className="h-[500px] bg-cover relative  flex items-center justify-center"
      style={{ backgroundImage: `url('/assets/contact-about.jpg')` }}
    >
      {/* Darker overlay to dull the background */}
      <div className="absolute inset-0  bg-black/50" />

      {/* Content on top of the overlay */}
      <div className="text-center z-20">
        <h1 className="text-white text-3xl font-bold">About Us</h1>
      </div>
    </section>
  );
};
