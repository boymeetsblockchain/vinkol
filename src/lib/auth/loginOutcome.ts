import { OnboardingRole } from "@/lib/onboarding/steps";

/**
 * A login the server accepted without issuing a token.
 *
 * Both `/stores/login` and `/users/login` answer **200 with a success envelope
 * and no token** when the account's email is not yet verified. Treating that
 * as a successful login sends the user to a dashboard whose first request
 * 401s, which ejects them straight back to the login page — told they had
 * signed in, then silently signed out, with no mention of verification.
 *
 * Keyed on the absence of a token rather than on `isEmailVerified`, because
 * the token is what actually decides whether anything afterwards can work.
 */
export const needsEmailVerification = (response: unknown): boolean =>
  !(response as { token?: string } | null | undefined)?.token;

/** Where each role verifies its email. */
export const verifyEmailPathFor = (
  role: OnboardingRole,
  email: string,
): string => {
  const base =
    role === "store" ? "/shop/verify-email" : `/${role}/auth/otp`;

  return `${base}?email=${encodeURIComponent(email)}`;
};
