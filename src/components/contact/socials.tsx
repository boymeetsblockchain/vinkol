import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";

const infoArray = [
  {
    name: "Office",
    lines: ["No 1 Sea Shopping Complex, Oko Afo along Badagry Express Way, Lagos"],
    icon: MapPin,
  },
  {
    name: "Phone",
    lines: ["+234 807 972 231", "+234 336 707 45"],
    icon: Phone,
  },
  {
    name: "Work Hours",
    lines: ["Everyday, 9am – 7pm"],
    icon: Clock,
  },
  {
    name: "Email",
    lines: ["vinkollogistics@gmail.com"],
    icon: Mail,
  },
];

const socials = [
  {
    label: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/vinkol-materials-and-commercial-ventures-ltd-8224441b6",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/vinkollogistics?igsh=cHFveTlnY2Fuc3Mw&utm_source=qr",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    href: "https://youtube.com/@vinkollogistics?si=XaJO73rzoDq8Z1Sk",
  },
  {
    label: "X / Twitter",
    icon: RiTwitterXLine,
    href: "https://x.com/vinkolltd?s=21&t=fwDDLMrWPBCeOetcu1W7Gw",
  },
];

export const Socials = () => {
  return (
    <section className="py-2">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">
        Get in touch
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-8">
        We're always here to help.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {infoArray.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-2xl p-5 border border-gray-100 flex gap-4"
          >
            <span className="flex-shrink-0 h-9 w-9 rounded-xl bg-[var(--color-blue-primary)]/10 flex items-center justify-center mt-0.5">
              <item.icon size={16} className="text-[var(--color-blue-primary)]" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                {item.name}
              </p>
              {item.lines.map((line, i) => (
                <p key={i} className="text-sm text-gray-700 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Follow us
        </p>
        <div className="flex items-center gap-3">
          {socials.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="h-10 w-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[var(--color-blue-primary)] hover:text-[var(--color-blue-primary)] transition-colors"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
