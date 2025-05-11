"use client";

import { Button } from "../button";
import { useRouter } from "next/navigation";

interface RiderAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WithdrawalModal = ({ isOpen, onClose }: RiderAuthModalProps) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white rounded-xl w-[90%] max-w-md p-6 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold text-center ">
          Withdraw to Bank Account
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Select Bank"
            className="w-full py-2 px-3 border border-[#A5A4A0] rounded-md placeholder:text-blue-primary focus:outline-none"
          />
          <input
            type="text"
            placeholder="Account Number"
            className="w-full py-2 px-3 border border-[#A5A4A0] rounded-md placeholder:text-blue-primary focus:outline-none"
          />
          <input
            type="text"
            placeholder="Account Name"
            className="w-full py-2 px-3 border border-[#A5A4A0] rounded-md placeholder:text-blue-primary focus:outline-none"
          />
          <input
            type="text"
            placeholder="Amount"
            className="w-full py-2 px-3 border border-[#A5A4A0] rounded-md placeholder:text-blue-primary focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
};
