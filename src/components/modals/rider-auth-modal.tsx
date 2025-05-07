"use client";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { Button } from "../button";
import { useState } from "react";

interface RiderAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  islogin: boolean;
}

export const RiderAuthModal = ({ isOpen, onClose }: RiderAuthModalProps) => {
  const [swithAuthType, setSwitchAuthType] = useState<"login" | "register">(
    "login"
  );

  if (!isOpen) return null;

  const isLogin = swithAuthType === "login";

  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-hidden text-black justify-center min-h-screen bg-black/80">
      <div className="w-full h-full flex md:items-end md:justify-end">
        <div className="w-full md:w-1/2 bg-white h-full flex flex-col p-8 gap-y-4 items-center justify-center">
          <div className="text-center">
            <h1 className="text-black font-bold text-3xl">Welcome</h1>
            <p className="font-medium">
              {isLogin
                ? "Log in to your account"
                : "Let’s Register you on Vinkol"}
            </p>
          </div>

          <div className="flex items-center gap-x-4">
            <div className="w-8 h-8 rounded-full border flex items-center justify-center border-[rgba(0,0,0,0.1)]">
              <FcGoogle />
            </div>
            <div className="w-8 h-8 rounded-full bg-black border flex items-center justify-center border-[rgba(0,0,0,0.1)]">
              <FaApple color="white" />
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-x-3">
            <div className="bg-[#A5A4A0] h-0.5 w-1/3" />
            <p className="text-[#A5A4A0] font-xs">or</p>
            <div className="bg-[#A5A4A0] h-0.5 w-1/3" />
          </div>

          <div className="w-full flex items-center gap-y-4 justify-center flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-3/4 py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-3/4 py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
            />

            {/* Confirm password only in register mode */}
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm password"
                className="w-3/4 py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
            )}

            {/* Forgot Password - Only in login mode */}
            {isLogin && (
              <div className="w-3/4 text-right">
                <span className="text-sm text-blue-primary underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
            )}
          </div>

          <Button size="lg" variant="auth" className="rounded-[5px] w-3/4 my-4">
            {isLogin ? "Log In" : "Sign Up"}
          </Button>

          <div>
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <span
                  className="text-blue-primary underline cursor-pointer"
                  onClick={() => setSwitchAuthType("register")}
                >
                  Register
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  className="text-blue-primary underline cursor-pointer"
                  onClick={() => setSwitchAuthType("login")}
                >
                  Log in
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
