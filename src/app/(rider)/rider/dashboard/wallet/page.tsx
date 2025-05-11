"use client";

import { WithdrawalModal } from "@/components/modals/withdraw";
import { Button } from "@/components/button";
import { useState } from "react";

function Orders() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <section className="py-6 px-4 md:px-10">
      {/* Accepted Orders Notice */}
      <div className="bg-blue-primary w-full rounded-md p-4 text-sm text-white mb-6 shadow-md">
        You currently have <span className="font-bold">5</span> accepted orders{" "}
        <span className="font-bold text-base underline cursor-pointer">
          CLICK HERE TO SEE DETAILS
        </span>
      </div>

      {/* Balance Card */}
      <div className="my-6 md:my-10">
        <div className="w-full h-[234px] bg-blue-primary p-6 flex flex-col items-center justify-center rounded-2xl text-white shadow-md">
          <h3 className="text-lg font-medium">Balance</h3>
          <h1 className="text-3xl font-bold mt-2 mb-4">₦205,000</h1>
          <Button variant="secondary" onClick={handleOpenModal}>
            Withdraw
          </Button>
        </div>
      </div>

      {/* Withdrawal History */}
      <div className="my-6 md:my-10">
        <h1 className="text-lg font-semibold mb-4">Withdrawal History</h1>
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="bg-[#FAFAFA] p-4 rounded-xl shadow-sm space-y-3 mt-3"
          >
            <div className="flex items-center justify-between text-sm text-gray-800 font-medium">
              <h2>0123456789 - Michael Smitt</h2>
              <h2 className="text-blue-primary font-semibold">₦23,000</h2>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <h3>Access Bank</h3>
              <h3>12-04-2025 04:25PM</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <WithdrawalModal isOpen={openModal} onClose={handleCloseModal} />
    </section>
  );
}

export default Orders;
