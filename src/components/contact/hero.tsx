export const ContactHero = () => {
  return (
    <section
      className="relative h-[380px] md:h-[420px] bg-cover flex items-end pb-16"
      style={{ backgroundImage: `url('/assets/contact.jpg')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 w-full">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-primary mb-4">
          Get in touch
        </p>
        <h1 className="text-white text-4xl md:text-6xl font-black tracking-tight leading-tight">
          We&apos;d love to hear<br />from you.
        </h1>
        <p className="text-white/60 text-base mt-3">
          We respond to every message within 24 hours.
        </p>
      </div>
    </section>
  );
};
