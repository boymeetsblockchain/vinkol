"use client";

import { KycStatus } from "@/components/dashboard/kyc-status";
import { useUserProfile } from "@/services/rider/query";

export default function DocumentsPage() {
  const { data, isLoading } = useUserProfile();

  return (
    <KycStatus
      profile={data?.data}
      isLoading={isLoading}
      uploadPath="/shopper/complete"
    />
  );
}
