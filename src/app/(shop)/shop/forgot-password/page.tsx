"use client";

import { Button } from "@/components/button";
import { Header } from "@/components/shop/header";
import Link from "next/link";
import { useForgotPasswordMutation } from "@/services/shops/mutation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate, isPending } = useForgotPasswordMutation();

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    mutate(
      { email: data.email },
      {
        onSuccess: () => {
          setSubmitted(true);
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to send reset email. Please try again.");
        },
      }
    );
  };

  return (
    <section className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-6 text-center py-10">
          {submitted ? (
            <>
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-primary">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h1 className="text-black font-bold text-2xl">Check your email</h1>
                <p className="font-medium text-gray-500 mt-2 text-sm leading-relaxed">
                  We sent a password reset link to{" "}
                  <span className="text-gray-800 font-semibold">{getValues("email")}</span>.
                  Click the link in the email to reset your password.
                </p>
              </div>
              <Link
                href="/shop/login"
                className="text-sm text-blue-primary underline cursor-pointer"
              >
                Back to login
              </Link>
            </>
          ) : (
            <>
              <div>
                <h1 className="text-black font-bold text-3xl">Forgot Password</h1>
                <p className="font-medium text-gray-600 mt-1">
                  Enter your email to receive a reset link
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

                <Button
                  type="submit"
                  variant="auth"
                  size="lg"
                  className="rounded-[5px] w-full"
                  disabled={isPending}
                >
                  {isPending ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              <Link href="/shop/login" className="text-sm text-gray-400">
                Remember your password?{" "}
                <span className="text-blue-primary underline cursor-pointer">
                  Back to login
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;
