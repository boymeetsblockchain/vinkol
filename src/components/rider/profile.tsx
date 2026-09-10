"use client";

import { useUserProfile } from "@/services/rider/query";

export const Profile = () => {
  const { data, isLoading } = useUserProfile();

  // Show a loading state or nothing if data is still fetching
  if (isLoading) {
    return (
      <header>
        <div className="flex items-center gap-x-4 animate-pulse">
          <div className="hidden md:block">
            <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>{" "}
            <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>{" "}
            {/* Skeleton for email */}
          </div>
          <div className="flex items-center gap-1">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>{" "}
            {/* Skeleton for avatar */}
          </div>
        </div>
      </header>
    );
  }

  // If data is not available after loading (e.g., error or no user)
  if (!data?.data) {
    return null; // Or render a placeholder/error message
  }

  // Destructure data for cleaner access
  const { email, avatar, firstname } = data.data;

  return (
    <header>
      <div className="flex items-center gap-x-4">
        <div className="hidden md:block">
          {/* Consider adding a name if available in the API response */}
          {/* <h1 className="text-sm font-bold">{data.data.name}</h1> */}
          <p className="text-sm font-medium text-gray-900 leading-tight">
            {firstname}
          </p>
          <p className="text-xs text-gray-400 leading-tight max-w-[180px] truncate">
            {email}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <img
            src={avatar?.imageUrl || "/assets/placeholder.png"}
            className="h-8 w-8 rounded-full object-cover bg-gray-100"
            alt=""
          />
        </div>
      </div>
    </header>
  );
};
