import { IoMdMail } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
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
              <p className="font-semibold">support@vinkol.com</p>
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
              <li>About Us</li>
              <li>Services</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-bold mb-4 text-lg">Legal</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Security & Privacy</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-6 flex justify-between py-3 md:px-10">
        <p className="text-sm">© 2025 vinkol | Terms & Privacy</p>
        <div className="flex gap-x-3 items-center ">
          <RiTwitterXLine color="black" />
          <FaInstagram color="black" />
          <FaLinkedin color="black" />
        </div>
      </div>
    </footer>
  );
};
