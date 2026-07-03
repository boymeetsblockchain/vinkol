"use client";
import { useState } from "react";
import { FaGooglePlay, FaStar } from "react-icons/fa6";
import { IoLogoApple } from "react-icons/io";
import { LuPackageCheck } from "react-icons/lu";
import { RiMotorbikeFill } from "react-icons/ri";
import { Button } from "../button";
import { AppStoreCard } from "../shared/appstore";
import { ShopperAuthModal } from "../modals/shopper-auth-modal.";

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const triggerRegisterModal = () => {
    setIsLogin(false);
    setIsModalOpen(true);
  };

  const triggerLoginModal = () => {
    setIsLogin(true);
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="relative text-white bg-cover bg-center min-h-[90vh] flex items-end"
        style={{ backgroundImage: "url('/assets/shopper.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/25" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 md:px-20 md:pb-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-blue-400" />
            For personal shoppers
          </p>
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl leading-tight max-w-3xl">
            Shop for others.{" "}
            <span className="text-[var(--color-blue-primary)]">Earn on every trip.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/80 max-w-xl">
            Join Vinkol as a personal shopper. Accept shopping tasks near you, pick
            up from stores, and get paid same day.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button size="lg" onClick={triggerRegisterModal} className="rounded-full px-8 font-semibold">
              Become a personal shopper
            </Button>
            <Button size="lg" variant="outline" onClick={triggerLoginModal}
              className="rounded-full px-8 font-semibold border-white/50 text-white hover:bg-white/10">
              Sign in to your account
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <FaStar className="text-yellow-400" />
              4.8 App Rating
            </span>
            <span className="w-px h-4 bg-white/30 hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <RiMotorbikeFill className="text-[var(--color-blue-primary)]"/>
              200+ Active Shoppers
            </span>
            <span className="w-px h-4 bg-white/30 hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <LuPackageCheck className="text-[var(--color-blue-primary)]"/>
              500+ Orders Fulfilled
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-start gap-4">
            <AppStoreCard
              platform="Google Play"
              icon={<FaGooglePlay color="black" size={24} />}
              link="https://play.google.com/store/apps/details?id=com.vinkol.go"
            />
            <AppStoreCard
              platform="App Store"
              icon={<IoLogoApple color="black" size={24} />}
              link="https://apps.apple.com/app/vinkol-go/id6670628538"
            />
          </div>
        </div>
      </div>
      <ShopperAuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        islogin={isLogin}
      />
    </>
  );
};
