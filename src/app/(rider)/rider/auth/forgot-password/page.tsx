"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPasswordSchema } from "@/types/rider";
import { useForgotPasswordMutation } from "@/services/rider/mutation";
import { Button } from "@/components/button";
import { toast } from "sonner";

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate, isPending } = useForgotPasswordMutation({
    onSuccess: (res) => {
      console.log("Forgot password email sent:", res);
    },
    onError: (err) => {
      console.error("Error sending forgot password email:", err.message);
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data.message);
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
          Forgot Password
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your registered email and we’ll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            {isPending ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPasswordForm;
