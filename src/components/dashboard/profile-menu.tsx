"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";

import { Avatar } from "@/components/dashboard/avatar";
import { useLogout } from "@/lib/auth/useLogout";
import { OnboardingRole } from "@/lib/onboarding/steps";

/**
 * The dashboard's account menu, opened from the top-bar avatar.
 *
 * Hand-rolled rather than pulling in a dropdown primitive: this is the only
 * menu in the app, none is installed, and the onboarding progress bar was built
 * the same way. If a second menu ever appears, Radix is the upgrade.
 *
 * Escape and an outside click close it, and focus returns to the avatar so a
 * keyboard user is not dropped at the top of the document.
 */
export const ProfileMenu = ({
  role,
  name,
  email,
  avatarUrl,
}: {
  role: OnboardingRole;
  name?: string;
  email?: string;
  avatarUrl?: string | null;
}) => {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const logout = useLogout();

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panel.current?.contains(target) || trigger.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    // pointerdown, not click: a click fires after the menu has already moved,
    // and mousedown misses touch.
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const settingsPath = `/${role === "store" ? "shop" : role}/dashboard/settings`;

  return (
    <div className="relative">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((was) => !was)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex items-center gap-x-3 rounded-full p-1 -m-1 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue-primary)] transition-colors"
      >
        <span className="hidden md:block text-right">
          <span className="block text-sm font-medium text-gray-900 leading-tight">
            {name}
          </span>
          <span className="block text-xs text-gray-400 leading-tight max-w-[180px] truncate">
            {email}
          </span>
        </span>
        <Avatar
          src={avatarUrl}
          name={name}
          className="h-9 w-9"
          textClass="text-xs"
        />
      </button>

      {open && (
        <div
          ref={panel}
          role="menu"
          aria-label="Account"
          // Above the mobile hamburger, which sits at z-50.
          className="absolute right-0 top-full mt-2 w-56 z-[60] rounded-xl border border-gray-100 bg-white shadow-lg py-1.5"
        >
          <div className="md:hidden px-3 pb-2 pt-1 border-b border-gray-100 mb-1.5">
            <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
            <p className="text-xs text-gray-400 truncate">{email}</p>
          </div>

          <Link
            role="menuitem"
            href={settingsPath}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <User size={16} className="text-gray-400" />
            Profile
          </Link>

          <button
            role="menuitem"
            type="button"
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
};
