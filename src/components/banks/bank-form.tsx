"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/button";
import { Country } from "@/lib/markets/types";
import { useMarket } from "@/lib/markets/useMarket";
import { BankDetails, bankSchemaFor } from "@/types/bank";
import { BankOwner, resolveAccountName } from "@/services/banks/api";
import { useBank, useBankList, useSaveBank } from "@/services/banks/query";

/**
 * Bank details for either role, in either market.
 *
 * The two markets need genuinely different forms, not the same form with a
 * field hidden:
 *
 * Nigeria resolves a 10-digit NUBAN to the name on the account through
 * Paystack, so the name is read-only and confirms the number was typed
 * correctly.
 *
 * Canada has no equivalent service. The old form auto-resolved whenever the
 * account number hit ten digits and gated submission behind `accountVerified`,
 * so a Canadian would have waited forever for a name that never arrives and
 * could never have submitted at all. Here the name is entered by the account
 * holder, there is no resolution call, and an admin checks the details at
 * payout approval — which is what the server already does.
 */

const FIELD =
  "w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all";

interface Props {
  owner: BankOwner;
  /** The account's market. Falls back to the browsing market. */
  country?: Country;
  onSaved?: () => void;
  submitLabel?: string;
}

export const BankForm = ({ owner, country, onSaved, submitLabel }: Props) => {
  const market = useMarket(country);
  const shape = market.config.bankAccount;
  const needsManualName = !shape.supportsAccountResolution;

  const { data: existing, isLoading: loadingExisting } = useBank(owner);
  const { data: banks = [], isLoading: loadingBanks } = useBankList(
    market.country,
  );
  const { mutate: save, isPending: saving } = useSaveBank(owner, !!existing);

  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [institutionNumber, setInstitutionNumber] = useState("");
  const [transitNumber, setTransitNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [interacEmail, setInteracEmail] = useState("");
  const [manualBank, setManualBank] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [resolved, setResolved] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Prefill when editing, so correcting one field does not mean retyping all.
  useEffect(() => {
    if (!existing) return;
    setBankName(existing.bankName ?? "");
    setBankCode(existing.bankCode ?? "");
    setInstitutionNumber(existing.institutionNumber ?? "");
    setTransitNumber(existing.transitNumber ?? "");
    setAccountNumber(existing.accountNumber ?? "");
    setAccountName(existing.accountName ?? "");
    setInteracEmail(existing.interacEmail ?? "");
    setResolved(existing.verified);
  }, [existing]);

  const { min, max } = shape.accountNumberLength;

  // Nigeria only: resolve the name once the number is a plausible length.
  useEffect(() => {
    if (needsManualName) return;
    if (debounce.current) clearTimeout(debounce.current);

    if (accountNumber.length < min || !bankCode) {
      setResolved(false);
      setAccountName("");
      return;
    }

    debounce.current = setTimeout(async () => {
      setResolving(true);
      try {
        const name = await resolveAccountName({
          country: market.country,
          accountNumber,
          bankCode,
        });
        if (name) {
          setAccountName(name);
          setResolved(true);
        }
      } catch (error: any) {
        setResolved(false);
        setAccountName("");
        toast.error(error?.message ?? "Could not verify that account.");
      } finally {
        setResolving(false);
      }
    }, 500);

    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [accountNumber, bankCode, min, needsManualName, market.country]);

  const pickBank = (code: string) => {
    setBankCode(code);
    const match = banks.find((bank) => bank.code === code);
    if (match) setBankName(match.name);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload =
      market.country === "CA"
        ? {
            country: "CA" as const,
            accountNumber,
            institutionNumber,
            transitNumber,
            accountName,
            bankName,
            interacEmail: interacEmail || undefined,
          }
        : {
            country: "NG" as const,
            accountNumber,
            bankCode,
            accountName,
            bankName,
          };

    const parsed = bankSchemaFor(market.country).safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the details.");
      return;
    }

    save(parsed.data as BankDetails, {
      onSuccess: () => {
        toast.success(
          existing ? "Bank details updated." : "Bank details saved.",
        );
        onSaved?.();
      },
      onError: (error: Error) => toast.error(error.message),
    });
  };

  if (loadingExisting) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500 py-6">
        <Loader2 size={16} className="animate-spin" />
        Loading your details…
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bank" className="text-sm font-medium text-gray-700">
          Bank
        </label>
        {manualBank ? (
          <input
            id="bank"
            className={FIELD}
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="Your bank or credit union"
            required
          />
        ) : (
          <select
            id="bank"
            className={FIELD}
            value={bankCode}
            onChange={(e) => pickBank(e.target.value)}
            disabled={loadingBanks}
            required
          >
            <option value="">
              {loadingBanks ? "Loading banks…" : "Select your bank"}
            </option>
            {banks.map((bank) => (
              <option key={bank.code} value={bank.code}>
                {bank.name}
              </option>
            ))}
          </select>
        )}
        {/* The Canadian list is a convenience, not an authority — there are
            hundreds of credit unions with their own institution numbers. */}
        {shape.requiresInstitutionAndTransit && (
          <button
            type="button"
            onClick={() => setManualBank((value) => !value)}
            className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-4 w-fit"
          >
            {manualBank
              ? "Choose from the list instead"
              : "My bank is not listed"}
          </button>
        )}
      </div>

      {shape.requiresInstitutionAndTransit && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="institution"
              className="text-sm font-medium text-gray-700"
            >
              Institution number
            </label>
            <input
              id="institution"
              className={FIELD}
              value={institutionNumber}
              onChange={(e) =>
                setInstitutionNumber(e.target.value.replace(/\D/g, ""))
              }
              inputMode="numeric"
              maxLength={3}
              placeholder="3 digits"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="transit"
              className="text-sm font-medium text-gray-700"
            >
              Transit number
            </label>
            <input
              id="transit"
              className={FIELD}
              value={transitNumber}
              onChange={(e) =>
                setTransitNumber(e.target.value.replace(/\D/g, ""))
              }
              inputMode="numeric"
              maxLength={5}
              placeholder="5 digits"
              required
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="accountNumber" className="text-sm font-medium text-gray-700">
          Account number
        </label>
        <input
          id="accountNumber"
          className={FIELD}
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
          inputMode="numeric"
          maxLength={max}
          placeholder={min === max ? `${min} digits` : `${min}–${max} digits`}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="accountName" className="text-sm font-medium text-gray-700">
          Account name
        </label>
        <input
          id="accountName"
          className={needsManualName ? FIELD : `${FIELD} bg-gray-100`}
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          readOnly={!needsManualName}
          placeholder={
            needsManualName
              ? "Exactly as it appears on your account"
              : "Fills in once your account is verified"
          }
          required
        />
        {resolving && (
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Loader2 size={12} className="animate-spin" />
            Verifying your account…
          </span>
        )}
        {!resolving && resolved && !needsManualName && (
          <span className="flex items-center gap-1.5 text-xs text-green-600">
            <CheckCircle2 size={12} />
            Account verified
          </span>
        )}
        {needsManualName && (
          <span className="text-xs text-gray-500">
            We cannot verify Canadian accounts automatically, so please check
            this carefully. Our team confirms it before your first payout.
          </span>
        )}
      </div>

      {shape.requiresInstitutionAndTransit && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="interac" className="text-sm font-medium text-gray-700">
            Interac e-Transfer email{" "}
            <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input
            id="interac"
            type="email"
            className={FIELD}
            value={interacEmail}
            onChange={(e) => setInteracEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <span className="text-xs text-gray-500">
            Add this and we can send payouts by Interac instead of a deposit.
          </span>
        </div>
      )}

      <Button
        variant="auth"
        type="submit"
        className="w-full rounded-md mt-1"
        // Nigeria gates on verification because it can; Canada must not, since
        // no verification will ever arrive.
        disabled={saving || resolving || (!needsManualName && !resolved)}
      >
        {saving
          ? "Saving…"
          : (submitLabel ?? (existing ? "Update details" : "Save details"))}
      </Button>
    </form>
  );
};
