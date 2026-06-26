"use client";
import { useSubscribe } from "@/services/rider/mutation";
import { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { AnimateIn } from "../shared/animate-in";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Deliver = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { mutate, isPending, isSuccess, isError, error } = useSubscribe();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setSubmitted(false);

    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    mutate(email, {
      onSuccess: () => {
        setEmail("");
        setSubmitted(true);
      },
    });
  };

  return (
    <section className="w-full relative">
      {/* Black section */}
      <div className="bg-black w-full py-16 md:py-0">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-4 h-auto md:h-[80vh]">
          {/* Text section */}
          <AnimateIn direction="left" className="max-w-2xl text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight">
              Deliver your every product with Vinkol
            </h2>

            <div className="w-full md:w-3/4 space-y-4 my-6 mx-auto md:mx-0">
              <p className="font-bold text-white text-base sm:text-lg">
                Want Vinkol to power your business deliveries?
              </p>
              <form onSubmit={handleSubmit} className="relative mb-2 w-full" noValidate>
                <label htmlFor="subscribe-email" className="sr-only">
                  Your business email
                </label>
                <input
                  id="subscribe-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                    if (submitted) setSubmitted(false);
                  }}
                  required
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "subscribe-error" : undefined}
                  className={`border-2 w-full rounded-full py-3 px-5 pr-12 bg-transparent text-white placeholder:text-white/70 transition ${
                    emailError ? "border-red-400" : "border-white"
                  }`}
                  disabled={isPending}
                />
                <button
                  type="submit"
                  className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-primary absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer disabled:opacity-50 transition"
                  disabled={isPending}
                  aria-label="Subscribe"
                >
                  {isPending ? (
                    <div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <GoArrowUpRight color="white" aria-hidden="true" />
                  )}
                </button>
              </form>

              {emailError && (
                <p id="subscribe-error" className="text-red-400 text-sm" role="alert">
                  {emailError}
                </p>
              )}
              {isPending && <p className="text-blue-300 text-sm">Subscribing...</p>}
              {submitted && (
                <p className="text-green-400 text-sm" role="status">
                  You&apos;re subscribed! We&apos;ll be in touch soon.
                </p>
              )}
              {isError && !isPending && (
                <p className="text-red-400 text-sm" role="alert">
                  {error?.message || "Something went wrong. Please try again."}
                </p>
              )}
            </div>
          </AnimateIn>

          {/* Image section */}
          <AnimateIn
            direction="right"
            delay={0.15}
            className="mt-10 md:mt-0 flex justify-center items-end h-full"
          >
            <img
              src="/assets/3d.png"
              alt="Vinkol delivery network illustration"
              className="h-64 sm:h-80 md:h-[500px] object-cover"
            />
          </AnimateIn>
        </div>
      </div>

      {/* Wave divider */}
      <div className="w-full -mt-[100px]">
        <img src="/assets/deliver.png" alt="" aria-hidden="true" className="h-[150px] w-full" />
      </div>
    </section>
  );
};
