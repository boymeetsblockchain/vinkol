import { formatMoney } from "@/lib/money";
import { Currency } from "@/lib/markets/types";

/**
 * The itemised total, entirely from the server.
 *
 * There is deliberately no arithmetic in this component. The store checkout
 * used to compute the processing fee in the browser at Nigeria's 2.5% and
 * render a grand total it never sent — which in Canada, at 4.5% plus 13% HST,
 * would have quoted roughly 15% below what the card was actually charged.
 *
 * A row with no value is omitted rather than shown as zero, so Nigeria (no
 * sales tax) simply has no tax line.
 */

interface Props {
  currency: Currency;
  /** Basket subtotal, for store orders. */
  goodsAmount?: number;
  deliveryFee: number;
  serviceFee?: number;
  taxAmount?: number;
  /** "HST". Empty or absent hides the row. */
  taxLabel?: string;
  /** What the gateway will charge. The only total safe to show. */
  grandTotal?: number;
}

const Row = ({
  label,
  value,
  currency,
}: {
  label: string;
  value: number | undefined;
  currency: Currency;
}) => {
  if (value === undefined || value === null) return null;

  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 tabular-nums">
        {formatMoney(value, currency)}
      </span>
    </div>
  );
};

export const ChargesBreakdown = ({
  currency,
  goodsAmount,
  deliveryFee,
  serviceFee,
  taxAmount,
  taxLabel,
  grandTotal,
}: Props) => (
  <div className="mt-8 rounded-xl border border-gray-100 divide-y divide-gray-100">
    <div className="px-5 py-2">
      <Row label="Items" value={goodsAmount} currency={currency} />
      <Row label="Delivery" value={deliveryFee} currency={currency} />
      <Row label="Service fee" value={serviceFee} currency={currency} />
      {taxLabel && (
        <Row label={taxLabel} value={taxAmount} currency={currency} />
      )}
    </div>

    {grandTotal !== undefined && (
      <div className="flex items-baseline justify-between gap-4 px-5 py-4">
        <span className="text-sm font-semibold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-blue-primary tabular-nums">
          {formatMoney(grandTotal, currency)}
        </span>
      </div>
    )}
  </div>
);
