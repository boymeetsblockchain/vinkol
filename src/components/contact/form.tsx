"use client";

import { useState } from "react";
import { Button } from "../button"; // Assuming this is your custom Button component
import { useSendContactMessageMutation } from "@/services/rider/mutation";
import { toast } from "sonner";

export const ContactForm = () => {
  const { mutate, isPending } = useSendContactMessageMutation();
  const initialFormState = {
    name: "",
    email: "",
    address: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    mutate(formData);
    setFormData(initialFormState);
  };

  return (
    <section className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">
        Contact form
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-8">
        Send us a message.
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#F7F8FA] border border-transparent px-4 py-3 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)]/30 focus:border-[var(--color-blue-primary)] transition"
              placeholder="Your full name"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#F7F8FA] border border-transparent px-4 py-3 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)]/30 focus:border-[var(--color-blue-primary)] transition"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full bg-[#F7F8FA] border border-transparent px-4 py-3 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)]/30 focus:border-[var(--color-blue-primary)] transition"
            placeholder="Your address (optional)"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Message</label>
          <textarea
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-[#F7F8FA] border border-transparent px-4 py-3 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)]/30 focus:border-[var(--color-blue-primary)] transition resize-none"
            placeholder="How can we help you?"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-full font-semibold py-3"
          disabled={isPending}
        >
          {isPending ? "Sending…" : "Send Message"}
        </Button>
      </form>
    </section>
  );
};
