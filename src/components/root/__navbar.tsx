"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiX } from "react-icons/bi";
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
];
export const Navbar: React.FC<{ shop?: boolean }> = ({ shop }) => {
  const [mobile, setMobile] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigate = () => {
    if (shop) {
      router.push("/shop");
    } else {
      router.push("/book-a-delivery");
    }
  };
  return (
    <nav className="h-auto w-full bg-white   z-10 ">
      <div className="flex justify-between items-center max-w-screen-2xl top-0 left-0 sticky  mx-auto py-2 px-4 md:px-10 w-full ">
        {/* logo */}
        <Link href={"/"}>
          <img src="/logo.png" alt="" className="w-28 h-12" />
        </Link>
        <div className=" hidden md:flex items-center space-x-4  ">
          {navbarArray.map((data, index) => (
            <Link
              key={index}
              href={`${data.path}`}
              className={`${
                pathname === data.path ? "text-blue-primary" : ""
              } text-sm font-medium`}
            >
              {data.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:block">
          <Button size="lg" onClick={navigate}>
            {shop ? "Register Store on Vinkol" : "Book a Delivery"}
          </Button>
        </div>
        {/* mobile nav */}
        <div onClick={() => setMobile(!mobile)} className="md:hidden block">
          {mobile ? (
            <BiX className="cursor-pointer" size={20} />
          ) : (
            <GiHamburgerMenu size={20} className="cursor-pointer" />
          )}
        </div>
      </div>
      {mobile && (
        <div className="md:hidden w-full mt-3 py-4 bg-white ">
          <div className="flex items-start space-y-6  flex-col">
            {navbarArray.map((data, index) => (
              <Link
                key={index}
                href={`${data.path}`}
                className={`${
                  pathname === data.path ? "text-blue-primary" : ""
                } text-sm font-medium`}
              >
                {data.name}
              </Link>
            ))}
            <div className="block md:hidden">
              <Button size="lg" onClick={navigate}>
                {shop ? "Register Store on Vinkol" : "Book a Delivery"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
