"use client";
import { Button } from "@/components/button";
import { useResetPasswordMutation } from "@/services/rider/mutation";
import { resetPasswordSchema } from "@/types/rider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  //   const { token } = await params;
  const router = useRouter();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useResetPasswordMutation({
    onSuccess: (res) => {
      console.log("Password reset successful:", res);
    },
    onError: (err) => {
      console.error("Error resetting password:", err.message);
    },
  });

  const onSubmit = (data: ResetPasswordInput) => {
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data.message);
        router.push("/become-a-rider");
      },
      onError: (data) => {
        toast.error(data.message);
      },
    });
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Reset Password
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your new password to complete your password reset.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="email"
              {...register("password")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <input
              type="hidden"
              id="resetToken"
              value={params.token}
              {...register("resetToken")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            {isPending ? "Sending..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
