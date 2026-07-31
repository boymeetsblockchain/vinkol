"use client";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";

const services = [
  { name: "Book a Delivery", path: "/book-a-delivery" },
  { name: "Bulk Delivery", path: "/bulk-delivery" },
  { name: "Personal Shopper", path: "/become-a-personal-shopper" },
  { name: "Track a Package", path: "/" },
  { name: "Explore Stores", path: "/explore-shop" },
];

const partners = [
  { name: "Become a Rider", path: "/become-a-rider" },
  { name: "Register a Store", path: "/shop" },
  { name: "Become a Shopper", path: "/become-a-personal-shopper" },
];

const company = [
  { name: "About Vinkol", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Product Support", path: "/product-support" },
  { name: "Security & Privacy", path: "/security-privacy" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms of Service", path: "/terms-and-conditions" },
];

export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] w-full text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-20 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand column */}
          <div className="space-y-5">
            <Link href="/">
              <img src="/logo.png" alt="Vinkol" className="w-28 h-12 brightness-0 invert" />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-[200px]">
              Fast, verified, and insured delivery across Lagos.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <IoMdMail size={16} />
              <a href="mailto:vinkollogistics@gmail.com" className="hover:text-white transition-colors">
                vinkollogistics@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://x.com/vinkolltd?s=21&t=fwDDLMrWPBCeOetcu1W7Gw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
              >
                <RiTwitterXLine size={18} />
              </a>
              <a
                href="https://www.instagram.com/vinkollogistics?igsh=cHFveTlnY2Fuc3Mw&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/vinkol-materials-and-commercial-ventures-ltd-8224441b6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
              For Partners
            </p>
            <ul className="space-y-3">
              {partners.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
              Company
            </p>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-white/30">
          <p>© 2025 Vinkol Logistics Ltd. All rights reserved.</p>
          <p>Lagos, Nigeria</p>
        </div>
      </div>
    </footer>
  );
};
