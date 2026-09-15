import { Country, Currency } from "@/lib/markets/types";

/**
 * The signed-in user, which had no interface at all — getUserProfile() returned
 * `any` and every consumer destructured it ad hoc, which is how `country` went
 * unnoticed for as long as it did.
 *
 * Mirrors the server's `interfaces/userInterfaces.ts`.
 */

export type KycStatus = "pending" | "approved" | "rejected";

export interface IImageData {
  imageUrl: string;
  cloudinaryId?: string;
}

export interface IKyc {
  _id?: string;
  status?: KycStatus;
  /** Why it was rejected. Shown to the user so they know what to fix. */
  remark?: string;
  identification?: unknown;
  vehicle?: unknown;
  guarantor?: unknown;
}

export interface IWallet {
  balance: number;
  /** Currency travels with the figure: a bare number is unreadable in two markets. */
  currency?: Currency;
  country?: Country;
}

export type UserRole = "ADMIN" | "RIDER" | "PERSONAL_SHOPPER" | "USER";

export interface IUser {
  _id: string;
  /** Decides currency, payment options, payout rails and bank-account shape. */
  country: Country;
  firstname?: string;
  lastname?: string;
  email: string;
  phone?: string;
  avatar?: IImageData;
  state?: string;
  address?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isKYCVerified: boolean;
  role: UserRole;
  isAdmin?: boolean;
  kyc?: IKyc;
  wallet?: IWallet;
  avgRating?: number;
  totalOrders?: number;
  hasCoupon?: boolean;
  isDeleted?: boolean;
}
