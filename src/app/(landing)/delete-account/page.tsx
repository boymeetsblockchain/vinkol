import React from "react";
import DeleteAccountForm from "./components/DeleteAccountForm";

const DeleteAccount = () => {
  return (
    <section className="min-h-[70vh] w-full relative py-10">
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-semibold">Delete Account</h3>
        <p>Please enter your details to delete your account.</p>

        <div className="mt-8">
          <DeleteAccountForm />
        </div>
      </div>
    </section>
  );
};

export default DeleteAccount;
