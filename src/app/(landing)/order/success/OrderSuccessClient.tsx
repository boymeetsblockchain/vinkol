"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2, HelpCircle } from "lucide-react";
import { useVerifyPaymentMutation } from "@/services/payments/mutation";
import { Button } from "@/components/button";

type Status = "verifying" | "success" | "failed" | "error" | "invalid";

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const router = useRouter();

  const [status, setStatus] = useState<Status>("verifying");

  const { mutate: verify } = useVerifyPaymentMutation({
    onSuccess: (res) => {
      // console.log({ response: res });
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("failed");
      }
    },
    onError: () => {
      setStatus("error");
    },
  });

  useEffect(() => {
    if (reference) {
      verify(reference);
    } else {
      setStatus("invalid");
      return;
    }
  }, [reference, verify]);

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
            actions={
              <Button className="py-2 px-4" onClick={() => router.push("/")}>
                Return Home
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
            actions={
              <Button className="py-2 px-4" onClick={() => router.push("/")}>
                Return Home
              </Button>
            }
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
