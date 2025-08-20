"use client";

import { Button } from "@/components/button";
import { Label } from "@/components/ui/label";
import { deleteAccount } from "@/lib/actions/delete-account";
import React, { useState } from "react";
import { toast } from "sonner";

const DeleteAccountForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await deleteAccount(
        formData.email,
        formData.password
      );
      if (error) {
        throw new Error(error);
      }
      toast.success("Account deleted");
      setFormData({ email: "", password: "" });
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-y-4"
      >
        <div className="flex flex-col w-full gap-2">
          <Label>Email</Label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            className="py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px]"
            required
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label>Password</Label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px]"
            required
          />
        </div>

        <Button
          size="lg"
          variant="auth"
          className="rounded-[5px] w-full my-4"
          type="submit"
          isLoading={loading}
        >
          Delete Account
        </Button>
      </form>
    </div>
  );
};

export default DeleteAccountForm;
