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
    <div className="flex gap-2 mb-8">
      <button
        className={`px-4 py-2 rounded-md border ${
          value === DeliveryFlowType.BULK
            ? "bg-blue-600 text-white"
            : "bg-white text-black"
        }`}
        onClick={() => onChange(DeliveryFlowType.BULK)}
      >
        Bulk delivery
        <div className="text-xs opacity-70">One pickup, many dropoffs</div>
      </button>

      <button
        className={`px-4 py-2 rounded-md border ${
          value === DeliveryFlowType.MULTI
            ? "bg-blue-600 text-white"
            : "bg-white text-black"
        }`}
        onClick={() => onChange(DeliveryFlowType.MULTI)}
      >
        Multiple deliveries
        <div className="text-xs opacity-70">Different pickups & dropoffs</div>
      </button>
    </div>
  );
};

export default DeliveryFlowSelector;
