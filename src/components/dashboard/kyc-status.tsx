"use client";

import Link from "next/link";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OnboardingProfile } from "@/lib/onboarding/steps";

/**
 * Verification status, read from the profile.
 *
 * The three document screens each hard-coded "Document Under Review" with no
 * data fetch at all, so a rejected rider was told their documents were fine
 * and never saw the reason. `kyc.status` and `kyc.remark` have always been
 * returned on the profile.
 */
export const KycStatus = ({
  profile,
  isLoading,
  uploadPath,
}: {
  profile: OnboardingProfile | null | undefined;
  isLoading?: boolean;
  uploadPath: string;
}) => {
  if (isLoading) {
    return (
      <Shell>
        <div className="h-6 w-48 bg-gray-100 rounded animate-pulse" />
      </Shell>
    );
  }

  if (profile?.isKYCVerified) {
    return (
      <Shell>
        <CheckCircle2 size={44} className="text-green-600" />
        <h1 className="text-2xl md:text-3xl font-bold">Verified</h1>
        <p className="text-sm md:text-base text-gray-600 max-w-md">
          Your documents have been approved. Nothing further is needed.
        </p>
      </Shell>
    );
  }

  if (profile?.kyc?.status === "rejected") {
    return (
      <Shell>
        <XCircle size={44} className="text-red-600" />
        <h1 className="text-2xl md:text-3xl font-bold">Documents rejected</h1>
        <p className="text-sm md:text-base text-gray-600 max-w-md">
          {profile.kyc.remark
            ? `Reason: ${profile.kyc.remark}`
            : "No reason was given. Please upload them again."}
        </p>
        <Button asChild className="mt-2">
          <Link href={uploadPath}>Re-upload documents</Link>
        </Button>
      </Shell>
    );
  }

  if (!profile?.kyc) {
    return (
      <Shell>
        <img
          src="/assets/document.png"
          alt=""
          className="w-40 h-40 object-contain"
        />
        <h1 className="text-2xl md:text-3xl font-bold">No documents yet</h1>
        <p className="text-sm md:text-base text-gray-600 max-w-md">
          Upload your ID so we can verify your account.
        </p>
        <Button asChild className="mt-2">
          <Link href={uploadPath}>Upload documents</Link>
        </Button>
      </Shell>
    );
  }

  return (
    <Shell>
      <Clock size={44} className="text-amber-500" />
      <h1 className="text-2xl md:text-3xl font-bold">Under review</h1>
      <p className="text-sm md:text-base text-gray-600 max-w-md">
        Your documents are being reviewed. You&rsquo;ll be ready to take orders
        in less than 20 minutes if everything checks out.
      </p>
    </Shell>
  );
};

const Shell = ({ children }: { children: React.ReactNode }) => (
  <section className="max-w-screen-2xl min-h-screen w-full px-4 md:px-20 py-10 mx-auto">
    <div className="flex flex-col items-center justify-center w-full min-h-[60vh] text-center gap-3">
      {children}
    </div>
  </section>
);
