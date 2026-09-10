"use client";

import { Button } from "@/components/button";
import { Header } from "@/components/shop/header";
import Link from "next/link";
import { useShopLoginMutation } from "@/services/shops/mutation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  needsEmailVerification,
  verifyEmailPathFor,
} from "@/lib/auth/loginOutcome";
import { PasswordInput } from "@/components/ui/password-input";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

function ShopperAuth() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useShopLoginMutation();

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          reset();

          // The server accepts an unverified login and answers 200 with no
          // token, so this has to be checked before claiming success.
          if (needsEmailVerification(response)) {
            toast.info("Verify your email to finish signing in.");
            router.push(verifyEmailPathFor("store", data.email));
            return;
          }

          toast.success("Login successful! Welcome back.");
          router.push("/shop/dashboard");
        },
        onError: (error: any) => {
          console.error("Login failed:", error);
          toast.error(
            error.message || "Login failed. Please check your credentials."
          );
        },
      }
    );
  };

  return (
    <section className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow flex items-center justify-center px-4 overflow-y-auto">
        <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-6 text-center py-10">
          <div>
            <h1 className="text-black font-bold text-3xl">Welcome Back</h1>
            <p className="font-medium text-gray-600">
              Let’s Login to your Vinkol Account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <PasswordInput
                
                placeholder="Password"
                {...register("password")}
                className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="w-full text-right">
              <Link
                href={"/shop/forgot-password"}
                className="text-sm text-blue-primary underline cursor-pointer"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="w-full">
              <Button
                type="submit"
                variant="auth"
                size="lg"
                className="rounded-[5px] w-full"
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>

          <Link href={"/shop"} className="text-sm text-gray-400">
            Don’t have an account?{" "}
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
