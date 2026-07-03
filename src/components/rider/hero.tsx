"use client";
import React, { useState } from "react";
import { FaGooglePlay } from "react-icons/fa6";
import { IoLogoApple } from "react-icons/io";
import { Button } from "../button";
import { AppStoreCard } from "../shared/appstore";
import { RiderAuthModal } from "../modals/rider-auth-modal";
import Link from "next/link";

export const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openModal = (mode: "login" | "register") => {
    setIsLogin(mode === "login");
    setIsOpen(true);
  };

  return (
    <>
      <div
        className="relative text-white bg-cover min-h-[620px] md:min-h-screen"
        style={{ backgroundImage: `url('/assets/rider.png')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/25" />

        <div className="relative z-10 flex flex-col justify-end min-h-[620px] md:min-h-screen pb-12 md:pb-20 px-6 md:px-20">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-blue-primary" />
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-300">
                For riders
              </p>
            </div>

            <h1 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight">
              Ride with Vinkol.
              <br />
              <span className="text-blue-primary">Earn on your terms.</span>
            </h1>

            <p className="text-base sm:text-lg font-medium text-white/80 max-w-lg leading-relaxed">
              Join 200+ verified riders delivering across Lagos. Set your own
              hours, accept tasks near you, and get paid fast.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button size="lg" className="rounded-full px-8 font-semibold" onClick={() => openModal("register")}>
                Become a Rider
              </Button>
              <Link href="/waitlist">
                <button className="border border-white/40 text-white rounded-full px-8 py-3 text-sm font-semibold hover:bg-white/10 transition-colors">
                  Join the Waitlist
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <AppStoreCard
                platform="Google Play"
                icon={<FaGooglePlay color="black" size={20} />}
                link="https://play.google.com/store/apps/details?id=app.vinkol.rider"
              />
              <AppStoreCard
                platform="App Store"
                icon={<IoLogoApple color="black" size={20} />}
                link="https://apps.apple.com/ng/app/vinkol-go/id6751474425"
              />
            </div>
          </div>
        </div>

        <RiderAuthModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          islogin={isLogin}
        />
      </div>
    </>
  );
};
