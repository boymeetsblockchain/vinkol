"use client";
import { Button } from "@/components/button";
import { Header } from "@/components/shop/header";
import Link from "next/link";

import { useRouter } from "next/navigation";

function ShopperAuth() {
  const router = useRouter();
  return (
    <section className="min-h-screen flex flex-col">
      <Header />

      {/* Scrollable container if needed */}
      <div className="flex-grow flex items-center justify-center px-4 overflow-y-auto">
        <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-6 text-center py-10">
          {/* Welcome Text */}
          <div>
            <h1 className="text-black font-bold text-3xl">Welcome Back</h1>
            <p className="font-medium text-gray-600">
              Let’s Login to your Vinkol Account
            </p>
          </div>

          {/* Input Fields */}
          <div className="w-full flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
            />
          </div>

          <div className="w-full text-right">
            <span className="text-sm text-blue-primary underline cursor-pointer">
              Forgot Password?
            </span>
          </div>

          {/* Submit Button */}
          <div className="w-full">
            <Button
              variant="auth"
              size="lg"
              className="rounded-[5px] w-full"
              onClick={() => router.push("/shop/setup-profile")}
            >
              Login
            </Button>
          </div>

          {/* Login Redirect */}
          <Link href={"/shop"} className="text-sm text-gray-400">
            Don’t have an account?
            <span className="text-blue-primary underline cursor-pointer">
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ShopperAuth;
