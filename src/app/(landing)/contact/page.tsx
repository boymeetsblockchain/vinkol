import { ContactForm } from "@/components/contact/form";
import { ContactHero } from "@/components/contact/hero";
import { Form } from "react-hook-form";

function ContactPage() {
  return (
    <section className="min-h-screen w-full relative">
      <ContactHero />
      <div className="h-[800px] flex items-center justify-between">
        <div className="max-w-screen-lg mx-auto w-full absolute  transform -translate-y-32 px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
        <div></div>
      </div>
    </section>
  );
}
export default ContactPage;
