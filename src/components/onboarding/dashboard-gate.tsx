"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  OnboardingProfile,
  OnboardingRole,
  nextRequiredStep,
  nextStep,
} from "@/lib/onboarding/steps";

/**
 * What a dashboard shows before onboarding is finished.
 *
 * Replaces three near-identical blocks that each got the order of checks
 * wrong. The rider and shopper layouts tested `!isKYCVerified` *before*
 * `!kyc` — and since an account with no documents at all is also unverified,
 * the "Upload Documents" branch was unreachable and a brand-new rider was told
 * their documents were under review, with no way to upload any.
 *
 * The order here is: nothing submitted, then rejected, then awaiting review.
 * Each state says what to do next and links to the step that does it, rather
 * than leaving someone on a wall with no exit.
 *
 * Only *required* steps hold the dashboard closed. Gating on `nextStep`, which
 * returns optional steps too, is what made the skip affordance pointless: the
 * skip landed here and this sent the user straight back to the step they had
 * just chosen to defer. Deferred steps are nudged on the dashboard instead.
 */

interface Props {
  role: OnboardingRole;
  profile: OnboardingProfile | null | undefined;
  hasBank: boolean;
  /** Set when the profile request failed with a 401. */
  unauthorized?: boolean;
  loginPath: string;
  children: React.ReactNode;
}

export const DashboardGate = ({
  role,
  profile,
  hasBank,
  unauthorized,
  loginPath,
  children,
}: Props) => {
  const router = useRouter();

  // In an effect, not during render. All three layouts previously cleared the
  // token and pushed a route from the render body, which React may run more
  // than once and which fires while the tree is still being built.
  useEffect(() => {
    if (!unauthorized) return;
    try {
      localStorage.removeItem("accessToken");
    } catch {
      // Nothing to clear.
    }
    router.replace(loginPath);
  }, [unauthorized, router, loginPath]);

  if (unauthorized) {
    return <Notice title="Signing you out…" body="Taking you to the login page." />;
  }

  if (!profile) return <>{children}</>;

  const outstanding = nextStep(role, profile, hasBank);
  const required = nextRequiredStep(role, profile, hasBank);
  const status = profile.kyc?.status;

  // No documents at all. Keyed on the KYC row rather than on the step list so
  // someone with nothing submitted is never told their documents are in review.
  if (!profile.kyc) {
    const target = required ?? outstanding;
    return (
      <Notice
        title="Finish setting up your account"
        body="You have a few steps left before you can start taking orders."
        action={
          target ? (
            <Button asChild>
              <Link href={target.path}>Continue setup</Link>
            </Button>
          ) : undefined
        }
      />
    );
  }

  if (!profile.isKYCVerified && status === "rejected") {
    return (
      <Notice
        title="Documents rejected"
        body={
          profile.kyc?.remark
            ? `Your documents were rejected: ${profile.kyc.remark}. Please upload them again.`
            : "Your documents were rejected. Please upload them again."
        }
        action={
          <Button asChild>
            <Link href={`/${role === "store" ? "shop" : role}/complete`}>
              Re-upload documents
            </Link>
          </Button>
        }
      />
    );
  }

  if (!profile.isKYCVerified) {
    return (
      <Notice
        title="Documents under review"
        body="Your documents are being reviewed. You'll be ready to take orders in less than 20 minutes if everything checks out."
        action={
          outstanding ? (
            <Button asChild variant="outline">
              <Link href={outstanding.path}>
                Finish the rest of your setup
              </Link>
            </Button>
          ) : undefined
        }
      />
    );
  }

  return <>{children}</>;
};

const Notice = ({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) => (
  <section className="max-w-screen-2xl min-h-screen w-full px-4 md:px-20 py-10 mx-auto">
    <div className="flex flex-col items-center justify-center w-full min-h-[60vh] text-center gap-3">
      <div className="w-40 h-40 md:w-64 md:h-64">
        <img
          src="/assets/document.png"
          alt=""
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
      <p className="text-sm md:text-base text-gray-700 max-w-md">{body}</p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  </section>
);
