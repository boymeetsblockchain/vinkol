"use client";

import { Button } from "@/components/button";
import { Header } from "@/components/shop/header";
import Link from "next/link";
import { useResetPasswordMutation } from "@/services/shops/mutation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useResetPasswordMutation();

  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    if (!token) {
      toast.error("Invalid or missing reset token. Please request a new reset link.");
      return;
    }

    mutate(
      { resetToken: token, password: data.password },
      {
        onSuccess: () => {
          setSuccess(true);
          setTimeout(() => router.push("/shop/login"), 3000);
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to reset password. The link may have expired.");
        },
      }
    );
  };

  if (!token) {
    return (
      <section className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-6 text-center py-10">
            <div>
              <h1 className="text-black font-bold text-2xl">Invalid Link</h1>
              <p className="text-gray-500 mt-2 text-sm">
                This reset link is invalid or has expired.
              </p>
            </div>
            <Link
              href="/shop/forgot-password"
              className="text-sm text-blue-primary underline"
            >
              Request a new reset link
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-6 text-center py-10">
          {success ? (
            <>
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h1 className="text-black font-bold text-2xl">Password reset!</h1>
                <p className="text-gray-500 mt-2 text-sm">
                  Your password has been updated. Redirecting you to login...
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h1 className="text-black font-bold text-3xl">Reset Password</h1>
                <p className="font-medium text-gray-600 mt-1">
                  Enter your new password below
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4"
              >
                <div>
                  <input
                    type="password"
                    placeholder="New password"
                    {...register("password")}
                    className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    {...register("confirmPassword")}
                    className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                      {errors.confirmPassword.message}
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
                  {isPending ? "Resetting..." : "Reset Password"}
                </Button>
              </form>

              <Link href="/shop/login" className="text-sm text-gray-400">
                Back to{" "}
                <span className="text-blue-primary underline cursor-pointer">
                  login
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

export default ResetPasswordPage;
