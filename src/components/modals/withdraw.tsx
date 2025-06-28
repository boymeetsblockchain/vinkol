"use client";

import { Button } from "../button";
import { useRouter } from "next/navigation";
import { useWithDraw } from "@/services/rider/mutation";
import { useWithDraw as useShopWithdraw } from "@/services/shops/mutation";
import { useState } from "react";
import { toast } from "sonner"; // Assuming you're using sonner for notifications

interface RiderAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isStore?: boolean;
}

export const WithdrawalModal = ({
  isOpen,
  onClose,
  isStore,
}: RiderAuthModalProps) => {
  const router = useRouter();
  const { mutate, isPending } = useWithDraw();
  const { mutate: shopWithdraw, isPending: isShopPending } = useShopWithdraw();
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const handleWithdraw = () => {
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }

    if (isStore) {
      shopWithdraw(amount, {
        onSuccess: () => {
          toast.success("Withdrawal successful!");
          onClose();
        },
        onError: (error) => {
          toast.error(error.message || "Withdrawal failed");
          onClose();
        },
      });
    } else {
      mutate(amount, {
        onSuccess: () => {
          toast.success("Withdrawal successful!");
          onClose();
        },
        onError: (error) => {
          toast.error(error.message || "Withdrawal failed");
          onClose();
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white rounded-xl w-[90%] max-w-md p-6 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold text-center">
          Withdraw to Bank Account
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full py-2 px-3 border border-[#A5A4A0] rounded-md placeholder:text-blue-primary focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleWithdraw}
            disabled={isPending || isShopPending}
          >
            {isPending || isShopPending ? "Processing..." : "Withdraw"}
          </Button>
        </div>
      </div>
    </div>
  );
};
