"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BiX } from "react-icons/bi";
import { cn } from "@/lib/utils"; // Assuming you have this utility from your previous code

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const deliverLinks = [
  { name: "Book a Delivery", path: "/book-a-delivery" },
  { name: "Bulk Delivery", path: "/bulk-delivery" },
  { name: "Personal Shopper", path: "/become-a-personal-shopper" },
];

const partnerLinks = [
  { name: "Become a Rider", path: "/become-a-rider" },
  { name: "Register Your Store", path: "/shop" },
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
    <nav className="relative w-full bg-white z-[100]">
      {/* This div acts as the sticky header content */}
      <div className="flex justify-between items-center max-w-screen-2xl sticky top-0 left-0 mx-auto py-2 px-4 md:px-10 w-full bg-white z-20 shadow-sm">
        {/* logo */}
        <Link href={"/"} onClick={closeMobileMenu}>
          {" "}
          {/* Close mobile on logo click too */}
          <img src="/logo.png" alt="Company Logo" className="w-28 h-12" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {/* Deliveries dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowDeliveryDropdown(true)}
            onMouseLeave={() => setShowDeliveryDropdown(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-md transition-colors hover:text-blue-primary text-gray-700">
              Deliveries
              <svg className="h-3.5 w-3.5 opacity-60" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {showDeliveryDropdown && (
              <div className="absolute left-0 top-full w-52 pt-1 z-50">
              <div className="rounded-xl border bg-white shadow-lg py-1">
                {deliverLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setShowDeliveryDropdown(false)}
                    className={cn(
                      "block px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 hover:text-blue-primary",
                      pathname === link.path ? "text-blue-primary font-medium" : "text-gray-700"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>              </div>            )}
          </div>

          {/* Partners dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-md transition-colors hover:text-blue-primary text-gray-700">
              For Partners
              <svg className="h-3.5 w-3.5 opacity-60" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="absolute left-0 top-full w-52 pt-1 z-50 hidden group-hover:block">
            <div className="rounded-xl border bg-white shadow-lg py-1">
              {partnerLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "block px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 hover:text-blue-primary",
                    pathname === link.path ? "text-blue-primary font-medium" : "text-gray-700"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            </div>
          </div>

          {/* Static links */}
          {navLinks.map((data) => (
            <Link
              key={data.path}
              href={data.path}
              className={cn(
                "text-sm font-medium px-3 py-2 rounded-md transition-colors hover:text-blue-primary",
                pathname === data.path ? "text-blue-primary" : "text-gray-700",
              )}
            >
              {data.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Link href="/book-a-delivery">
            <Button size="lg" className="rounded-full font-semibold">
              Book a Delivery
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Icon — only show when menu is closed */}
        <div onClick={() => setMobile(!mobile)} className="md:hidden block">
          <GiHamburgerMenu size={20} className="cursor-pointer" />
        </div>
      </div>

      {/* Mobile Navigation Menu — full-screen overlay */}
      {mobile && (
        <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col">
          {/* Header row */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <Link href="/" onClick={closeMobileMenu}>
              <img src="/logo.png" alt="Vinkol" className="w-24 h-10 object-contain" />
            </Link>
            <button onClick={closeMobileMenu} className="p-2 text-gray-500 hover:text-gray-900">
              <BiX size={26} />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 px-2 pb-2">
              Deliveries
            </p>
            {deliverLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={closeMobileMenu}
                className={cn(
                  "block text-base font-medium transition-colors hover:text-blue-primary w-full px-2 py-3 rounded-lg",
                  pathname === link.path ? "text-blue-primary bg-blue-primary/5" : "text-gray-800",
                )}
              >
                {link.name}
              </Link>
            ))}

            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 px-2 pt-5 pb-2">
              Partners
            </p>
            {partnerLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={closeMobileMenu}
                className={cn(
                  "block text-base font-medium transition-colors hover:text-blue-primary w-full px-2 py-3 rounded-lg",
                  pathname === link.path ? "text-blue-primary bg-blue-primary/5" : "text-gray-800",
                )}
              >
                {link.name}
              </Link>
            ))}

            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 px-2 pt-5 pb-2">
              Company
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={closeMobileMenu}
                className={cn(
                  "block text-base font-medium transition-colors hover:text-blue-primary w-full px-2 py-3 rounded-lg",
                  pathname === link.path ? "text-blue-primary bg-blue-primary/5" : "text-gray-800",
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA pinned to bottom */}
          <div className="px-5 pb-8 pt-4 border-t border-gray-100">
            <Link href="/book-a-delivery" onClick={closeMobileMenu} className="block w-full">
              <Button size="lg" className="w-full rounded-full font-semibold">
                Book a Delivery
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
