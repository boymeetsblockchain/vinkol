import React from "react";

export enum DeliveryFlowType {
  BULK = "bulk",
  MULTI = "multi",
}

interface Props {
  value: DeliveryFlowType;
  onChange: (v: DeliveryFlowType) => void;
}

const DeliveryFlowSelector = ({ value, onChange }: Props) => {
  return (
    <div className="inline-flex gap-3 mb-2 p-1.5 bg-white border border-gray-200 rounded-2xl shadow-sm">
      <button
        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
          value === DeliveryFlowType.BULK
            ? "bg-[var(--color-blue-primary)] text-white shadow-sm"
            : "text-gray-500 hover:text-gray-900"
        }`}
        onClick={() => onChange(DeliveryFlowType.BULK)}
      >
        Bulk delivery
        <div className="text-xs font-normal opacity-80 mt-0.5">One pickup, many dropoffs</div>
      </button>

      <button
        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
          value === DeliveryFlowType.MULTI
            ? "bg-[var(--color-blue-primary)] text-white shadow-sm"
            : "text-gray-500 hover:text-gray-900"
        }`}
        onClick={() => onChange(DeliveryFlowType.MULTI)}
      >
        Multiple deliveries
        <div className="text-xs font-normal opacity-80 mt-0.5">Different pickups &amp; dropoffs</div>
      </button>
    </div>
  );
};

export default DeliveryFlowSelector;
