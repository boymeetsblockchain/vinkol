"use client";
import React, { useState } from "react";
import { FaGooglePlay } from "react-icons/fa6";
import { IoLogoApple } from "react-icons/io";

import { Button } from "../button";
import { AppStoreCard } from "../shared/appstore";
import { RiderAuthModal } from "../modals/rider-auth-modal";
export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // distinguish between login/register

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
        className="relative text-white bg-cover bg-center md:h-[100vh] h-[600px]"
        style={{ backgroundImage: `url('/assets/hero.png')` }}
      >
        <div className="absolute bottom-10 left-4 md:left-20 px-4">
          <div className="space-y-4 max-w-2xl sm:max-w-3xl">
            <h1 className="font-bold text-3xl sm:text-5xl leading-tight">
              Earn On Vinkol
            </h1>
            <h1 className="font-bold text-3xl sm:text-5xl leading-tight">
              Become a Rider
            </h1>
            <p className="text-base sm:text-xl font-medium">
              Connect instantly with verified riders to deliver your goods or
              pick up purchases from any store.
            </p>
          </div>
          <div>
            <div className="mt-6 flex items-start sm:items-center gap-4">
              <Button size="lg" onClick={triggerRegisterModal}>
                Become a Rider
              </Button>
              <Button size="lg" variant="secondary" onClick={triggerLoginModal}>
                Login to Rider Forum
              </Button>
            </div>
          </div>

          <div className="mt-6 flex  items-start sm:items-center gap-4">
            <AppStoreCard
              platform="Google Play"
              icon={<FaGooglePlay color="black" size={24} />}
              link="https://play.google.com/store"
            />
            <AppStoreCard
              platform="App Store"
              icon={<IoLogoApple color="black" size={24} />}
              link="https://www.apple.com/app-store/"
            />
          </div>
        </div>
        {/* Auth Modal */}
        <RiderAuthModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          islogin={isLogin}
        />
      </div>
    </>
  );
};
