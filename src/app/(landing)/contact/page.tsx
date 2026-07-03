import { ContactForm } from "@/components/contact/form";
import { ContactHero } from "@/components/contact/hero";
import { Socials } from "@/components/contact/socials";

function ContactPage() {
  return (
    <section className="min-h-screen w-full">
      <ContactHero />
      <div className="bg-[#f8f8f8] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="flex flex-col lg:flex-row items-start gap-10">
            <div className="w-full lg:w-3/5 md:-mt-24 relative z-20">
              <ContactForm />
            </div>
            <div className="w-full lg:w-2/5">
              <Socials />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ContactPage;
