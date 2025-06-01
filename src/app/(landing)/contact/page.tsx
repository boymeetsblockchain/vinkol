import { ContactForm } from "@/components/contact/form";
import { ContactHero } from "@/components/contact/hero";
import { Socials } from "@/components/contact/socials";

function ContactPage() {
  return (
    <section className="min-h-screen w-full relative">
      <ContactHero />
      <div className="bg-[#f8f8f8] py-10">
        {" "}
        {/* Added vertical padding here */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {" "}
          {/* Added relative and z-10 */}
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <div className="w-full lg:w-2/3 xl:w-1/2  md:-mt-32 relative z-20">
              {" "}
              <ContactForm />
            </div>

            <div className="w-full lg:w-1/3 xl:w-1/2 ">
              <Socials />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ContactPage;
