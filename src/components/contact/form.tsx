"use client";

import { useState } from "react";
import { Button } from "../button"; // Assuming this is your custom Button component
import { useSendContactMessageMutation } from "@/services/rider/mutation";
import { toast } from "sonner";

export const ContactForm = () => {
  const { mutate, isPending } = useSendContactMessageMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    message: "",
  });

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
  };

  return (
    <section className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Leave us A Message
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Name</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded-md placeholder:text-gray-500 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Email</h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded-md placeholder:text-gray-500 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Your Email"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Address</h2>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full bg-gray-100 p-3 rounded-md placeholder:text-gray-500 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Your Address"
          />
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Message</h2>
          <textarea
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-gray-100 p-3 rounded-md placeholder:text-gray-500 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y"
            placeholder="Type your message here..."
            required
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="px-8 py-3 text-lg font-medium"
            disabled={isPending}
          >
            {isPending ? "Sending" : "   Send Message"}
          </Button>
        </div>
      </form>
    </section>
  );
};
