export const Question = () => {
  return (
    <section className="max-w-screen-2xl w-full px-4 py-10 md:px-20 md:py-20 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-relaxed">
            Have questions About Vinkol?
          </h1>
          <p className="text-lg md:text-xl font-semibold text-gray-700">
            Contact us, we are always ready to help you. <br />
            <span className="">support@vinkol.com</span>
          </p>
        </div>

        {/* Right Side (FAQs) */}
        <div className="space-y-6">
          <div className="border-b-2 border-[#A5A4A0] pb-6">
            <div className="flex items-center justify-between">
              <p className="text-xl md:text-2xl font-bold max-w-md">
                Do I need a bike to become a rider?
              </p>
              <button className="border border-[#A5A4A0] text-[#A5A4A0] rounded px-4 py-1 text-sm">
                View More
              </button>
            </div>
          </div>

          <div className="border-b-2 border-[#A5A4A0] pb-6">
            <div className="flex items-center justify-between">
              <p className="text-xl md:text-2xl font-bold max-w-md">
                How do I get paid?
              </p>
              <button className="border border-[#A5A4A0] text-[#A5A4A0] rounded px-4 py-1 text-sm">
                View More
              </button>
            </div>
          </div>

          <div className="border-b-2 border-[#A5A4A0] pb-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xl md:text-2xl font-bold max-w-md">
                Can I choose which tasks to accept?
              </p>
              <button className="border border-[#A5A4A0] text-[#A5A4A0] rounded px-4 py-1 text-sm">
                View More
              </button>
            </div>
            <p className="text-base md:text-lg font-medium text-gray-700">
              Yes, you can choose to accept any task you wish to.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
