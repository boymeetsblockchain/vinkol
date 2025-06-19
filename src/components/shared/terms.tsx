import Link from "next/link";

type TermsCheckboxProps = {
  isChecked: boolean;
  isBooking?: boolean;
  onChange: (checked: boolean) => void;
};

export const TermsCheckbox = ({
  isChecked,
  onChange,
  isBooking,
}: TermsCheckboxProps) => {
  return (
    <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 accent-blue-600"
      />
      <span>
        I agree to the{" "}
        <Link
          href={
            isBooking
              ? "/terms-and-conditions-customer"
              : "/terms-and-conditions"
          }
          className="text-blue-600 underline"
        >
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-blue-600 underline">
          Privacy Policy
        </Link>
        .
      </span>
    </label>
  );
};
