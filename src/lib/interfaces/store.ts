import { Country } from "@/lib/markets/types";
import { IImageData, IKyc, IWallet } from "./user";

export interface IStore {
  _id: string;
  /** Decides currency, payout rails and bank-account shape. Also scopes
   * which customers can see this store at all. */
  country: Country;
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar?: IImageData;
  state: string;
  address: string;
  lat: string;
  lng: string;
  lga: string;
  bio?: string;
  tags?: string[];
  isEmailVerified: boolean;
  isKYCVerified?: boolean;
  homepage?: boolean;
  openingHours?: unknown;
  kyc?: IKyc;
  wallet?: IWallet;
}
