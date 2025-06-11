import { IoMdMail } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
export const Footer = () => {
  return (
    <footer className="bg-white w-full text-black  py-10">
      <div className="max-w-screen-2xl mx-auto px-6 border-b pb-8 flex items-center justify-center md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 w-full">
          {/* Logo and Contact */}
          <div className="space-y-4">
            <img src="/logo.png" alt="Vinkol Logo" className="w-28 h-12" />
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <IoMdMail className="text-xl" />

              <a href="mailto:info@vinkol.ng" className="font-semibold">
                info@vinkol.ng
              </a>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <p className="font-bold mb-4 text-lg">Support</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Help Center</li>
              <li>Product Support</li>
              <li>Security & Privacy</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-bold mb-4 text-lg">Quick Links</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <Link href={"/about"}>About Us</Link>
              <li>Services</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-bold mb-4 text-lg">Legal</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <Link href={"/privacy-policy"}>Privacy Policy</Link>
              <Link href={"/terms-and-conditions"} className="block">
                Terms of Service
              </Link>
              <li>Security & Privacy</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-6 flex justify-between py-3 md:px-10">
        <p className="text-sm">© 2025 vinkol | Terms & Privacy</p>
        <div className="flex gap-x-3 items-center ">
          <a
            href="https://x.com/vinkolltd?s=21&t=fwDDLMrWPBCeOetcu1W7Gw"
            target="_blank"
          >
            {" "}
            <RiTwitterXLine color="black" />
          </a>
          <a
            href="https://www.instagram.com/vinkollogistics?igsh=cHFveTlnY2Fuc3Mw&utm_source=qr"
            target="_blank"
          >
            {" "}
            <FaInstagram color="black" />
          </a>
          <a
            href="https://www.linkedin.com/in/vinkol-materials-and-commercial-ventures-ltd-8224441b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
          >
            {" "}
            <FaLinkedin color="black" />
          </a>
        </div>
      </div>
    </footer>
  );
};
