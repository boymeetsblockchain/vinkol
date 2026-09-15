"use client";

import { KycStatus } from "@/components/dashboard/kyc-status";
import { useGetStoreProfile } from "@/services/shops/query";

export default function StoreDocumentsPage() {
  const { data, isLoading } = useGetStoreProfile();

  return (
    <KycStatus
      profile={data?.data}
      isLoading={isLoading}
      uploadPath="/shop/complete"
    />
  );
}
