"use client";
import { useSubscribe } from "@/services/rider/mutation";
import { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

export const Deliver = () => {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess, isError, error } = useSubscribe(); // Destructure more states for feedback

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email) {
      mutate(email);
    }
  };

  return (
    <section className="w-full relative">
      {/* Black section */}
      <div className="bg-[#0a0a0a] w-full py-16 md:py-0">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6 md:px-20 h-auto md:h-[75vh] gap-10 md:gap-0">
          {/* Text section */}
          <div className="max-w-2xl text-center md:text-left">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-primary mb-5">
              Stay in the loop
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-black leading-tight tracking-tight">
              Vinkol updates,
              <br />
              straight to you.
            </h2>

            <div className="w-full md:w-3/4 space-y-4 my-6 mx-auto md:mx-0">
              <p className="font-bold text-white text-base sm:text-lg">
                Get in Touch with Us
              </p>
              <form onSubmit={handleSubmit} className="relative mb-10 w-full">
                {" "}
                {/* Wrap in form and add onSubmit */}
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-2 border-white w-full rounded-full py-3 px-5 pr-12 bg-transparent text-white placeholder:text-white placeholder:font-bold"
                  disabled={isPending} // Disable input while pending
                />
                <button
                  type="submit" // Make it a submit button for the form
                  className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-primary absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  disabled={isPending} // Disable button while pending
                >
                  {isPending ? (
                    <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full text-white"></div> // Basic loading spinner
                  ) : (
                    <GoArrowUpRight color="white" />
                  )}
                </button>
              </form>

              {/* Provide user feedback */}
              {isPending && <p className="text-blue-300">Subscribing...</p>}
              {isSuccess && (
                <p className="text-green-400">Successfully subscribed!</p>
              )}
              {isError && (
                <p className="text-red-400">
                  Error: {error?.message || "Something went wrong."}
                </p>
              )}
            </div>
          </div>

          {/* Image section */}
          <div className="mt-10 md:mt-0 flex justify-center items-end h-full">
            <img
              src="/assets/3d.png"
              alt="3D Delivery Illustration"
              className="h-64 sm:h-80 md:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* White section */}
      <div className="w-full py-8 mt-[-100px]">
        <img src="/assets/deliver.png" className="h-[150px] w-full" />
      </div>
    </section>
  );
};
