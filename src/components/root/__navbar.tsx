"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import { BiX } from "react-icons/bi";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTrackOrders } from "@/services/orders/query";
import { TrackingModal } from "../modals/trackingmodal";

const forBusinessesLinks = [
  { name: "Register Your Store", path: "/shop" },
  { name: "Bulk Delivery", path: "/bulk-delivery" },
];

const joinNetworkLinks = [
  { name: "Become a Rider", path: "/become-a-rider" },
  { name: "Become a Personal Shopper", path: "/become-a-personal-shopper" },
];

const bookLinks = [
  { name: "Book a Delivery", path: "/book-a-delivery" },
  { name: "Bulk Delivery", path: "/bulk-delivery" },
];

export const Navbar: React.FC<{ shop?: boolean }> = ({ shop }) => {
  const [mobile, setMobile] = useState(false);
  const [showBookDropdown, setShowBookDropdown] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const businessRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  const { data, isSuccess } = useTrackOrders(trackingId, { enabled });

  useEffect(() => {
    if (isSuccess && data) {
      setIsModalOpen(true);
      setEnabled(false);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    setShowBookDropdown(false);
    setShowBusinessDropdown(false);
    setShowNetworkDropdown(false);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }
    setEnabled(true);
  };

  const navigate = () => {
    router.push(shop ? "/shop" : "/book-a-delivery");
    setMobile(false);
  };

  return (
    <nav className="relative w-full bg-white z-10" aria-label="Main navigation">
      <div
        className={cn(
          "flex justify-between items-center max-w-screen-2xl sticky top-0 left-0 mx-auto py-2 px-4 md:px-10 w-full bg-white/95 backdrop-blur-sm z-20 transition-shadow duration-300",
          scrolled ? "shadow-md" : "shadow-sm",
        )}
      >
        {/* Logo */}
        <Link href="/" onClick={() => setMobile(false)} aria-label="Vinkol home">
          <img src="/logo.png" alt="Vinkol" className="w-28 h-12" />
        </Link>

        {/* Desktop: Compact tracking widget */}
        <form
          onSubmit={handleTrack}
          className="hidden lg:flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 bg-gray-50 hover:border-blue-primary/40 transition-colors"
          aria-label="Track a package"
        >
          <Search className="text-gray-400 shrink-0" size={15} aria-hidden="true" />
          <input
            type="text"
            placeholder="Enter tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            aria-label="Tracking ID"
            className="text-sm text-gray-700 bg-transparent outline-none placeholder-gray-400 w-40"
          />
          <button
            type="submit"
            className="text-xs font-semibold text-blue-primary hover:text-blue-700 transition-colors shrink-0"
            aria-label="Track package"
          >
            Track
          </button>
        </form>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:text-blue-primary hover:bg-blue-50",
              pathname === "/about" ? "text-blue-primary" : "text-gray-700",
            )}
          >
            About
          </Link>

          {/* For Businesses dropdown */}
          <div
            ref={businessRef}
            className="relative"
            onMouseEnter={() => setShowBusinessDropdown(true)}
            onMouseLeave={() => setShowBusinessDropdown(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:text-blue-primary hover:bg-blue-50",
                (pathname === "/shop" || pathname === "/bulk-delivery")
                  ? "text-blue-primary"
                  : "text-gray-700",
              )}
              aria-expanded={showBusinessDropdown}
              aria-haspopup="true"
            >
              For Businesses
              <ChevronDown
                size={14}
                className={cn("transition-transform duration-200", showBusinessDropdown && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            {showBusinessDropdown && (
              <div className="absolute left-0 top-full mt-1 w-52 rounded-xl border border-gray-100 bg-white shadow-lg z-50 py-1">
                {forBusinessesLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Join Our Network dropdown */}
          <div
            ref={networkRef}
            className="relative"
            onMouseEnter={() => setShowNetworkDropdown(true)}
            onMouseLeave={() => setShowNetworkDropdown(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:text-blue-primary hover:bg-blue-50",
                (pathname === "/become-a-rider" || pathname === "/become-a-personal-shopper")
                  ? "text-blue-primary"
                  : "text-gray-700",
              )}
              aria-expanded={showNetworkDropdown}
              aria-haspopup="true"
            >
              Join Our Network
              <ChevronDown
                size={14}
                className={cn("transition-transform duration-200", showNetworkDropdown && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            {showNetworkDropdown && (
              <div className="absolute left-0 top-full mt-1 w-56 rounded-xl border border-gray-100 bg-white shadow-lg z-50 py-1">
                {joinNetworkLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:text-blue-primary hover:bg-blue-50",
              pathname === "/contact" ? "text-blue-primary" : "text-gray-700",
            )}
          >
            Contact
          </Link>
        </div>

        {/* Desktop CTA: Book with dropdown */}
        <div
          ref={bookRef}
          className="hidden md:relative md:block"
          onMouseEnter={() => setShowBookDropdown(true)}
          onMouseLeave={() => setShowBookDropdown(false)}
        >
          <Button
            size="lg"
            className="flex items-center gap-1.5"
            aria-expanded={showBookDropdown}
            aria-haspopup="true"
            aria-label="Book a delivery"
          >
            Book a Delivery
            <ChevronDown
              size={14}
              className={cn("transition-transform duration-200", showBookDropdown && "rotate-180")}
              aria-hidden="true"
            />
          </Button>
          {showBookDropdown && (
            <div className="absolute right-0 top-full mt-1 w-52 rounded-xl border border-gray-100 bg-white shadow-lg z-50 py-1">
              {bookLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobile(!mobile)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={mobile ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobile}
          aria-controls="mobile-menu"
        >
          {mobile ? (
            <BiX className="text-blue-primary" size={22} aria-hidden="true" />
          ) : (
            <GiHamburgerMenu size={18} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobile && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-10 border-t border-gray-100"
        >
          <div className="flex flex-col px-4 py-5 space-y-1">

            {/* Mobile tracking */}
            <form
              onSubmit={(e) => { handleTrack(e); setMobile(false); }}
              className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 mb-3 bg-gray-50"
              aria-label="Track a package"
            >
              <Search className="text-gray-400 shrink-0" size={15} aria-hidden="true" />
              <input
                type="text"
                placeholder="Enter tracking ID"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                aria-label="Tracking ID"
                className="flex-1 text-sm text-gray-700 bg-transparent outline-none placeholder-gray-400"
              />
              <button
                type="submit"
                className="text-xs font-semibold text-blue-primary shrink-0"
                aria-label="Track package"
              >
                Track
              </button>
            </form>

            <Link
              href="/about"
              onClick={() => setMobile(false)}
              className={cn(
                "text-base font-medium px-2 py-2.5 rounded-lg transition-colors",
                pathname === "/about" ? "text-blue-primary bg-blue-50" : "text-gray-800 hover:text-blue-primary hover:bg-blue-50",
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobile(false)}
              className={cn(
                "text-base font-medium px-2 py-2.5 rounded-lg transition-colors",
                pathname === "/contact" ? "text-blue-primary bg-blue-50" : "text-gray-800 hover:text-blue-primary hover:bg-blue-50",
              )}
            >
              Contact
            </Link>

            {/* For Businesses group */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1">
                For Businesses
              </p>
              {forBusinessesLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobile(false)}
                  className={cn(
                    "block text-base font-medium px-2 py-2.5 rounded-lg transition-colors",
                    pathname === link.path ? "text-blue-primary bg-blue-50" : "text-gray-800 hover:text-blue-primary hover:bg-blue-50",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Join Our Network group */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1">
                Join Our Network
              </p>
              {joinNetworkLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobile(false)}
                  className={cn(
                    "block text-base font-medium px-2 py-2.5 rounded-lg transition-colors",
                    pathname === link.path ? "text-blue-primary bg-blue-50" : "text-gray-800 hover:text-blue-primary hover:bg-blue-50",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile CTAs */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 mt-2">
              <Button
                size="lg"
                className="w-full"
                onClick={navigate}
                aria-label={shop ? "Register Store on Vinkol" : "Book a Delivery"}
              >
                {shop ? "Register Store on Vinkol" : "Book a Delivery"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full text-blue-primary"
                onClick={() => { router.push("/explore-shop"); setMobile(false); }}
                aria-label="Explore stores"
              >
                Explore Stores
              </Button>
            </div>
          </div>
        </div>
      )}

      <TrackingModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setTrackingId(""); }}
        data={data?.data}
      />
    </nav>
  );
};
