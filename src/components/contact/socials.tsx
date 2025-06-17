import { Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";

const infoArray = [
  {
    name: "Office",
    desc: "No 1 Sea Shopping Complex, Oko Afo along badagry express way, Lagos",
    icon: MapPin,
    iconcolor: "#0E74D8",
  },
  {
    name: "Phone",
    desc: "+2349039106561",
    subdesc: "+2348033670745",
    icon: Phone,
    iconcolor: "#F8BD00",
  },
  {
    name: "Work Hours",
    desc: "Everyday 9am - 7pm",
    icon: Clock,
    iconcolor: "#DD00FF",
  },
  {
    name: "Email",
    desc: "info@vinkol.com",
    icon: Mail,
    iconcolor: "#60D669",
  },
];

export const Socials = () => {
  const hexToRgba = (hex: string, alpha: number) => {
    let r = 0,
      g = 0,
      b = 0;
    // Handle 3-digit hex
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // Handle 6-digit hex
    else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-left mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Don’t hesitate to contact us
        </h2>
        <p className="text-lg text-gray-600">
          Contact us for any issue. We reply under 20 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoArray.map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-4 bg-white rounded-lg shadow-lg borderboder-[#DFDEDA] h-[100px] transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex gap-x-3 items-">
              <div
                className="p-2 rounded-full  flex flex-col "
                style={{ backgroundColor: hexToRgba(item.iconcolor, 0.2) }}
              >
                <item.icon color={item.iconcolor} size={10} />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 ">
                {item.name}
              </h3>
            </div>
            <p className="text-gray-600  text-xs text-left ml-8">{item.desc}</p>
            <p className="text-gray-600  text-xs text-left ml-8">
              {item.subdesc}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center my-3">
        <p className="text-lg text-black font-bold">Social Media:</p>
        <div className="flex gap-x-5 my-4  items-center">
          {" "}
          {/* Increased gap-x for better spacing */}
          <a
            href="https://www.linkedin.com/in/vinkol-materials-and-commercial-ventures-ltd-8224441b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
          >
            {" "}
            <FaLinkedin
              color="#0E74D8"
              size={20}
              className="cursor-pointer hover:opacity-75 transition-opacity duration-200"
            />
          </a>
          <a
            href="https://www.instagram.com/vinkollogistics?igsh=cHFveTlnY2Fuc3Mw&utm_source=qr"
            target="_blank"
          >
            <a href="https://www.instagram.com/vinkollogistics?igsh=cHFveTlnY2Fuc3Mw&utm_source=qr">
              {" "}
              <FaInstagram
                color="#0E74D8"
                size={20}
                className="cursor-pointer hover:opacity-75 transition-opacity duration-200"
              />
            </a>
          </a>
          <a
            href="https://youtube.com/@vinkollogistics?si=XaJO73rzoDq8Z1Sk"
            target="_blank"
          >
            {" "}
            <FaYoutube
              color="#0E74D8"
              size={20}
              className="cursor-pointer hover:opacity-75 transition-opacity duration-200"
            />
          </a>
          <a
            href="https://x.com/vinkolltd?s=21&t=fwDDLMrWPBCeOetcu1W7Gw"
            target="_blank"
          >
            {" "}
            <RiTwitterXLine
              color="#0E74D8"
              size={20}
              className="cursor-pointer hover:opacity-75 transition-opacity duration-200"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
