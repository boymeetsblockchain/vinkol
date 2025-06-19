"use client";

import { WithdrawalModal } from "@/components/modals/withdraw";
import { Button } from "@/components/button";
import { useState } from "react";
import { useGetWallet } from "@/services/shops/query";

interface WalletData {
  balance: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: WalletData;
}

function Orders() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetWallet();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (isLoading) {
    return (
      <section className="py-6 px-4 md:px-10 text-center text-gray-600">
        Loading wallet balance...
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-6 px-4 md:px-10 text-center text-red-600">
        Error loading wallet data. Please try again.
      </section>
    );
  }

  if (!data || !data.data) {
    return (
      <section className="py-6 px-4 md:px-10 text-center text-gray-600">
        Wallet data not available.
      </section>
    );
  }

  const currentBalance = data.data.balance;

  return (
    <section className="py-6 px-4 md:px-10">
      {/* Balance Card */}
      <div className="my-6 md:my-10">
        <div className="w-full h-[234px] bg-blue-primary p-6 flex flex-col items-center justify-center rounded-2xl text-white shadow-md">
          <h3 className="text-lg font-medium">Balance</h3>
          <h1 className="text-3xl font-bold mt-2 mb-4">
            ₦
            {currentBalance.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
          <Button variant="secondary" onClick={handleOpenModal}>
            Withdraw
          </Button>
        </div>
      </div>

      {/* Withdrawal History (your commented out section) */}
      {/* You can uncomment this and populate with real data once you have it */}
      {/* For example, if your wallet data includes a transactions array:
      <div className="my-6 md:my-10">
        <h1 className="text-lg font-semibold mb-4">Withdrawal History</h1>
        {data.data.transactions && data.data.transactions.length > 0 ? (
            data.data.transactions.map((transaction, i) => (
                <div key={transaction.id || i} className="bg-[#FAFAFA] p-4 rounded-xl shadow-sm space-y-3 mt-3">
                    <div className="flex items-center justify-between text-sm text-gray-800 font-medium">
                        <h2>{transaction.reference} - {transaction.recipientName}</h2>
                        <h2 className="text-blue-primary font-semibold">₦{transaction.amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <h3>{transaction.bankName}</h3>
                        <h3>{new Date(transaction.date).toLocaleString()}</h3>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-center text-gray-500">No withdrawal history available.</p>
        )}
      </div>
      */}

      {/* Modal */}
      <WithdrawalModal isOpen={openModal} onClose={handleCloseModal} />
    </section>
  );
}

export default Orders;
