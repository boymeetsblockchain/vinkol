import React from "react";

interface Props {
  isChecked: boolean;
  label?: string;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ isChecked, label, onChange }: Props) => {
  return (
    <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 accent-blue-600"
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
