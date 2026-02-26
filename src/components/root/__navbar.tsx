"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BiX } from "react-icons/bi";
import { cn } from "@/lib/utils"; // Assuming you have this utility from your previous code

const navbarArray = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
  {
    name: "Become a Rider",
    path: "/become-a-rider",
  },
  {
    name: "Become a Personal Shopper",
    path: "/become-a-personal-shopper",
  },
  {
    name: "Register Your Store on Vinkol",
    path: "/shop",
  },
];

export const Navbar: React.FC<{ shop?: boolean }> = ({ shop }) => {
  const [mobile, setMobile] = useState<boolean>(false);
  const [showDeliveryDropdown, setShowDeliveryDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigate = () => {
    if (shop) {
      router.push("/shop");
    } else {
      router.push("/book-a-delivery");
    }
    // No need to close mobile here as the button is not part of mobile nav links
  };

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setMobile(false);
  };

  useEffect(() => {
    setShowDeliveryDropdown(false);
  }, [pathname]);

  return (
    // The `h-auto` and `w-full` are usually sufficient for a `nav` element.
    // `z-10` is good for ensuring it stays above other content.
    <nav className="relative w-full bg-white z-10">
      {/* This div acts as the sticky header content */}
      <div className="flex justify-between items-center max-w-screen-2xl sticky top-0 left-0 mx-auto py-2 px-4 md:px-10 w-full bg-white z-20 shadow-sm">
        {/* logo */}
        <Link href={"/"} onClick={closeMobileMenu}>
          {" "}
          {/* Close mobile on logo click too */}
          <img src="/logo.png" alt="Company Logo" className="w-28 h-12" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navbarArray.map((data) => (
            <Link
              key={data.path} // Use path as key
              href={`${data.path}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-primary", // Added hover effect
                pathname === data.path ? "text-blue-primary" : "text-gray-700", // Explicit default text color
              )}
            >
              {data.name}
            </Link>
          ))}
        </div>

        {/* Desktop Button */}
        <div
          className="hidden md:relative md:block"
          onMouseEnter={() => setShowDeliveryDropdown(true)}
          onMouseLeave={() => setShowDeliveryDropdown(false)}
        >
          <Button size="lg" className="flex items-center gap-2">
            Book a Delivery
          </Button>

          {showDeliveryDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border bg-white shadow-lg z-50">
              <Link
                href="/book-a-delivery"
                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowDeliveryDropdown(false)}
              >
                Book a Delivery
              </Link>

              <Link
                href="/bulk-delivery"
                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowDeliveryDropdown(false)}
              >
                Bulk Delivery
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger/Close Icon */}
        <div onClick={() => setMobile(!mobile)} className="md:hidden block">
          {mobile ? (
            <BiX className="cursor-pointer text-blue-primary" size={24} /> // Slightly larger icon, primary color
          ) : (
            <GiHamburgerMenu size={20} className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobile && (
        <div className="md:hidden absolute top-full left-0 w-full py-4 px-4 bg-white shadow-lg z-10">
          {" "}
          {/* Added shadow-lg for separation */}
          <div className="flex flex-col items-start space-y-6">
            {navbarArray.map((data) => (
              <Link
                key={data.path} // Use path as key
                href={`${data.path}`}
                onClick={closeMobileMenu} // <-- IMPORTANT: Close mobile menu on click
                className={cn(
                  "text-base font-medium transition-colors hover:text-blue-primary w-full", // Increased font size, added w-full
                  pathname === data.path
                    ? "text-blue-primary"
                    : "text-gray-800",
                )}
              >
                {data.name}
              </Link>
            ))}
            <Link
              href="/bulk-delivery"
              onClick={closeMobileMenu} // <-- IMPORTANT: Close mobile menu on click
              className={cn(
                "text-base font-medium transition-colors hover:text-blue-primary w-full", // Increased font size, added w-full
                pathname === "/bulk-delivery"
                  ? "text-blue-primary"
                  : "text-gray-800",
              )}
            >
              Bulk Delivery
            </Link>
            <div className="flex items-center gap-4 md:hidden mt-6">
              {" "}
              {/* Added margin top for separation */}
              <Button size="lg" onClick={navigate}>
                {shop ? "Register Store on Vinkol" : "Book a Delivery"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-blue-500 rounded-4xl"
                onClick={() => router.push("/explore-shop")}
              >
                Explore Stores
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
