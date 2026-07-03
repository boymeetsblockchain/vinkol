import React from "react";
import DeleteAccountForm from "./components/DeleteAccountForm";

const DeleteAccount = () => {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 md:px-20 py-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">Account</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-3">Delete your account</h1>
          <p className="text-gray-500 text-base">Please enter your details below to permanently delete your Vinkol account.</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-6 md:px-20">
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <DeleteAccountForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default DeleteAccount;
