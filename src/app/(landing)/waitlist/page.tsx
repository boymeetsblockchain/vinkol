import { RiderWaitlistForm } from "@/components/waitlist/rider-waitlist-form";

function WaitlistPage() {
  return (
    <main className="w-full">
      <section
        className="h-[420px] bg-cover bg-center relative flex items-center justify-center after:w-full after:h-full after:absolute after:inset-0 after:bg-black/50"
        style={{ backgroundImage: `url('/assets/trust.jpg')` }}
      >
        <div className="inset-0 absolute bg-black/45" />
        <div className="text-center text-white z-10 px-4">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Become a Vinkol Internal Rider
          </h1>
          <p className="mt-3 text-base sm:text-lg max-w-3xl mx-auto">
            Join a premium delivery force with branded Vinkol bikes and priority
            delivery assignments. Apply now to get approved and start earning
            daily.
          </p>
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4">About Internal Riders</h2>
            <p className="text-gray-700 mb-3">
              Vinkol internal riders are fully-equipped delivery partners who
              receive company-branded bikes, priority orders, and dedicated
              support. This program is for committed riders ready to deliver
              with speed, reliability, and brand excellence.
            </p>
            <p className="text-gray-700 mb-3">
              If accepted, you will be onboarded by our rider operations team,
              receive Vinkol-branded equipment, and access higher-value delivery
              opportunities.
            </p>
            <p className="text-gray-700">
              Fill in the form below to join the internal rider waitlist. Make
              sure to provide accurate details for fastest processing.
            </p>
          </div>
          <div className="w-full max-w-screen-xl mx-auto">
            <RiderWaitlistForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export default WaitlistPage;
