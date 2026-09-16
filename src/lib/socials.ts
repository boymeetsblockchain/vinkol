import type { IconType } from "react-icons";
import { FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";

/**
 * The company's social profiles, in one place.
 *
 * They were duplicated between the footer and the contact page, which had
 * already let the two drift apart — and a stale copy in the footer is what
 * collided with an Instagram update on main. Consumers share the list and
 * style the icons themselves, since the footer and the contact page render
 * them very differently.
 *
 * Not market-specific: Vinkol runs one set of accounts for both countries.
 */
export interface SocialLink {
  label: string;
  icon: IconType;
  href: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: "X / Twitter",
    icon: RiTwitterXLine,
    href: "https://x.com/vinkolltd?s=21&t=fwDDLMrWPBCeOetcu1W7Gw",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/vinkollogistics?stkn=cHFveTlnY2Fuc3Mw&utm_source=qr",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/vinkol-group-inc-8224441b6",
  },
  {
    label: "TikTok",
    icon: FaTiktok,
    href: "https://www.tiktok.com/@vinkollogistics?_r=1&_t=ZS-99khtUNxvCZ",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    href: "https://youtube.com/@vinkollogistics?si=XaJO73rzoDq8Z1Sk",
  },
] as const;
