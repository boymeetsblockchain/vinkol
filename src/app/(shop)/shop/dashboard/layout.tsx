"use client";
import { ShopHeader } from "@/components/shop-page/header";
import { ShopSideBar } from "@/components/shop-page/sidebar";
import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import { ShopperDashBoardSidebBar } from "@/components/shop/sidebar";
import { useGetStoreProfile } from "@/services/shops/query";
import { useBank } from "@/services/banks/query";
import { DashboardGate } from "@/components/onboarding/dashboard-gate";
import { ApiError } from "@/lib/interfaces/error";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, isLoading, error } = useGetStoreProfile();
  const { data: bank } = useBank("store");
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
        {/* Mobile Hamburger Skeleton */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <div className="w-7 h-7 bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* Sidebar Skeleton */}
        <div className="hidden md:block w-64 h-screen bg-white border-r border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-2">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area Skeleton */}
        <div className="flex-1 w-full p-4 md:p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Main Content Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Orders Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="h-64 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Earnings Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="h-32 w-full bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mt-1" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <DashboardGate
      role="store"
      profile={data?.data}
      hasBank={!!bank}
      unauthorized={(error as ApiError | null)?.status === 401}
      loginPath="/shop/login"
    >
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Mobile hamburger */}
      <div className="md:hidden fixed top-5 right-5 z-50">
        <button onClick={() => setIsSidebarOpen(true)} className="p-1.5 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 hover:bg-gray-50 transition-colors">
          <Menu size={24} className="text-gray-800" />
        </button>
      </div>

      {/* Sidebar - hidden on mobile unless opened */}
      <ShopperDashBoardSidebBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header would go here if you have one */}
        {/* <ShopHeader /> */}

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
    </DashboardGate>
  );
};

export default Layout;
