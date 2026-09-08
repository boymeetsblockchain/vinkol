import * as z from "zod";

import { BankAccountShape, Country } from "@/lib/markets/types";

/**
 * Bank details, discriminated by market. Mirrors the server's
 * `lib/validators/bankSchemas.ts`.
 *
 * Nigeria resolves an account number to a name through Paystack before saving.
 * Canada has no equivalent service, so the name is entered by the account
 * holder and an admin checks it at payout approval — which means the Canadian
 * form must not gate submission on a verification that will never arrive.
 */

const digits = (label: string) =>
  z.string().regex(/^\d+$/, { message: `${label} must contain only digits` });

export const nigerianBankSchema = z.object({
  country: z.literal("NG"),
  accountNumber: digits("Account number").length(10, {
    message: "Account number must be 10 digits",
  }),
  bankCode: digits("Bank code").min(3, { message: "Bank code is required" }),
  accountName: z.string().min(1, { message: "Account name is required" }),
  bankName: z.string().min(1, { message: "Bank name is required" }),
});

export const canadianBankSchema = z.object({
  country: z.literal("CA"),
  accountNumber: digits("Account number")
    .min(7, { message: "Account number must be at least 7 digits" })
    .max(12, { message: "Account number must be at most 12 digits" }),
  institutionNumber: digits("Institution number").length(3, {
    message: "Institution number must be 3 digits",
  }),
  transitNumber: digits("Transit number").length(5, {
    message: "Transit number must be 5 digits",
  }),
  accountName: z.string().min(1, { message: "Account name is required" }),
  bankName: z.string().min(1, { message: "Bank name is required" }),
  interacEmail: z
    .string()
    .email({ message: "Enter a valid email for Interac transfers" })
    .optional()
    .or(z.literal("")),
});

export const bankSchema = z.discriminatedUnion("country", [
  nigerianBankSchema,
  canadianBankSchema,
]);

export type NigerianBank = z.infer<typeof nigerianBankSchema>;
export type CanadianBank = z.infer<typeof canadianBankSchema>;
export type BankDetails = z.infer<typeof bankSchema>;

/** What GET /banks/user-bank and /banks/store-bank return. */
export interface IBank {
  _id: string;
  country: Country;
  bankName: string;
  accountName: string;
  accountNumber: string;
  /** Nigeria only. */
  bankCode?: string;
  /** Canada only. */
  institutionNumber?: string;
  transitNumber?: string;
  interacEmail?: string;
  verified: boolean;
}

/** An entry from GET /banks/list. For Canada, `code` is the institution number. */
export interface BankListEntry {
  name: string;
  code: string;
}

/** Pick the right schema for the market a form is rendering in. */
export const bankSchemaFor = (country: Country) =>
  country === "CA" ? canadianBankSchema : nigerianBankSchema;

/** Whether to show the account-name field as editable rather than resolved. */
export const requiresManualAccountName = (shape: BankAccountShape): boolean =>
  !shape.supportsAccountResolution;
