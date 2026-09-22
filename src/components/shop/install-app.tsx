"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

/**
 * Offers to install the dashboard.
 *
 * Chrome's own hint is easy to miss and iOS Safari shows nothing at all, so
 * without this most owners never discover the app exists. Two paths:
 *
 *  - Chrome and Edge fire `beforeinstallprompt`; that event is the only way to
 *    open the real install dialog, and it must be kept to call later.
 *  - No browser on iOS fires it, and none has an install API, so every iOS
 *    browser gets the Share → Add to Home Screen wording instead. That means
 *    Chrome, Edge and Firefox as well as Safari: since iOS 16.4 they install
 *    through the same Share menu, and excluding them showed their users
 *    nothing at all.
 *
 * Hidden once the app is already installed, and once dismissed it stays
 * dismissed.
 */

const DISMISSED = "vinkol-install-dismissed";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const isIos = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // iPadOS 13+ reports as Macintosh, so touch points are the tell.
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (ua.includes("Macintosh") && navigator.maxTouchPoints > 1)
  );
};

export const InstallApp = () => {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(DISMISSED) === "1");
    } catch {
      setDismissed(false);
    }

    // Already installed: standalone matches, or Safari's own flag.
    const installed =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone ===
        true;
    if (installed) return;

    if (isIos()) setShowIosHint(true);

    const onPrompt = (event: Event) => {
      // Keep the browser's own mini-infobar out of the way; this banner is it.
      event.preventDefault();
      setPrompt(event as InstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", () => setPrompt(null));
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const close = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISSED, "1");
    } catch {
      // Dismissed for this session either way.
    }
  };

  const install = async () => {
    if (!prompt) return;
    await prompt.prompt();
    // The event is single-use; the browser will not accept it twice.
    setPrompt(null);
  };

  if (dismissed || (!prompt && !showIosHint)) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[70] md:left-auto md:right-6 md:max-w-sm">
      <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3.5 shadow-lg">
        <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <Download size={16} className="text-[var(--color-blue-primary)]" />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Install Vinkol for Stores
            </p>
            <p className="mt-0.5 text-xs text-gray-500">
              {prompt
                ? "Add it to your home screen to open your dashboard in one tap."
                : "Open the Share menu, then choose Add to Home Screen."}
            </p>
          </div>

          {prompt ? (
            <button
              type="button"
              onClick={install}
              className="w-fit rounded-md bg-[var(--color-blue-primary)] px-3.5 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Install
            </button>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
              <Share size={13} className="text-gray-400" />
              Share → Add to Home Screen
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Dismiss"
          className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-700"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
