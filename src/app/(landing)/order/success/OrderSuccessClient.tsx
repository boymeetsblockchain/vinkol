"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2, HelpCircle, Clock } from "lucide-react";
import { useVerifyPaymentMutation } from "@/services/payments/mutation";
import { ApiError } from "@/lib/interfaces/error";
import { Button } from "@/components/button";
import { clearCart } from "@/config/storage";
import { clearCheckoutSession } from "@/config/checkout";

type Status =
  | "verifying"
  | "success"
  | "failed"
  | "pending"
  | "cancelled"
  | "error"
  | "invalid";

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  // Stripe returns here for a cancellation too, and the server marks which.
  const cancelled = searchParams.get("status") === "cancelled";
  const router = useRouter();

  const [status, setStatus] = useState<Status>("verifying");

  const { mutate: verify } = useVerifyPaymentMutation({
    // This page renders every outcome full-screen; a toast alongside it is
    // noise, and during a pending retry it would be wrong as well.
    silent: true,
    onSuccess: (res) => {
      if (!res.success) {
        setStatus("failed");
        return;
      }

      // Cleared here rather than when leaving for the gateway: a customer who
      // abandons the payment page still has their basket, and one who paid
      // does not carry the same items into their next order.
      clearCart();
      clearCheckoutSession();
      setStatus("success");
    },
    onError: (error) => {
      // Reached only once the retries are spent, so a pending payment here is
      // one that is taking unusually long, not one that failed.
      const reported =
        error instanceof ApiError ? error.data?.status : undefined;

      if (reported === "pending") setStatus("pending");
      else if (reported === "failed") setStatus("failed");
      else setStatus("error");
    },
  });

  useEffect(() => {
    if (cancelled) {
      setStatus("cancelled");
      return;
    }
    if (!reference) {
      setStatus("invalid");
      return;
    }
    verify(reference);
  }, [cancelled, reference, verify]);

  const home = (
    <Button className="py-2 px-4" onClick={() => router.push("/")}>
      Return Home
    </Button>
  );

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {status === "verifying" && (
          <State
            icon={<Loader2 className="animate-spin" size={48} />}
            title="Verifying payment"
            description="Please wait while we confirm your payment."
          />
        )}

        {status === "success" && (
          <State
            icon={<CheckCircle className="text-green-600" size={48} />}
            title="Order placed successfully 🎉"
            description={
              <>
                Your delivery order has been confirmed.
                <br />
                Please check your email for more details.
                <br />
                If you experience any issues, feel free to contact our support
                team.
              </>
            }
            actions={home}
          />
        )}

        {status === "pending" && (
          <State
            icon={<Clock className="text-blue-600" size={48} />}
            title="Still confirming your payment"
            description="Your bank has not finished confirming this yet. We will email you as soon as it clears — there is no need to pay again."
            actions={home}
          />
        )}

        {status === "cancelled" && (
          <State
            icon={<XCircle className="text-gray-500" size={48} />}
            title="Payment cancelled"
            description="You closed the payment page before it finished, so nothing was charged. Your basket is still where you left it."
            actions={
              <Button variant="outline" onClick={() => router.back()}>
                Back to checkout
              </Button>
            }
          />
        )}

        {status === "failed" && (
          <State
            icon={<XCircle className="text-red-600" size={48} />}
            title="Payment not completed"
            description="Your payment was not successful. No charges were made."
            actions={
              <Button variant="outline" onClick={() => router.push("/")}>
                Try again
              </Button>
            }
          />
        )}

        {status === "error" && (
          <State
            icon={<HelpCircle className="text-yellow-600" size={48} />}
            title="Something went wrong"
            description="We couldn’t verify your payment at the moment. Please contact support if you were charged."
            actions={
              <a href="mailto:vinkollogistics@gmail.com">
                <Button variant="outline" className="text-blue-600">
                  Contact Support
                </Button>
              </a>
            }
          />
        )}

        {status === "invalid" && (
          <State
            icon={<XCircle className="text-gray-500" size={48} />}
            title="Invalid payment reference"
            description="This page was accessed incorrectly."
            actions={home}
          />
        )}
      </div>
    </section>
  );
};

export default OrderSuccessPage;

interface StateProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  actions?: React.ReactNode;
}

const State = ({ icon, title, description, actions }: StateProps) => (
  <div className="space-y-4">
    <div className="flex justify-center">{icon}</div>
    <h1 className="text-2xl font-semibold">{title}</h1>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    {actions && <div className="pt-4">{actions}</div>}
  </div>
);
