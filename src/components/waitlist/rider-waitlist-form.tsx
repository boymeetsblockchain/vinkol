"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { waitlistSchema } from "@/dto/waitlist.form.schema";
import { nigerianStates } from "@/lib/states";
import { Button } from "../button";
import { useSubmitWaitlistMutation } from "@/services/waitlist/mutation";
import { toast } from "sonner";
import { TermsCheckbox } from "../shared/terms";
import { useState } from "react";

export const RiderWaitlistForm = () => {
  const form = useForm<z.infer<typeof waitlistSchema>>({
    resolver: zodResolver(waitlistSchema),
    shouldUnregister: true,
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      stateOfResidence: "",
      dateOfBirth: "",
      gender: "male",
      isStudent: false,
      university: "",
      department: "",
      experienceYears: 0,
      address: "",
      hasGuarantor: false,
      guarantor: {
        name: "",
        phone: "",
      },
      purpose: "",
    },
  });

  const { mutate, isPending } = useSubmitWaitlistMutation();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const isStudent = form.watch("isStudent");
  const hasGuarantor = form.watch("hasGuarantor");

  const onSubmit = (data: z.infer<typeof waitlistSchema>) => {
    if (!isChecked) {
      toast.error("Please accept terms and conditions");
      return;
    }

    // Conditionally remove fields based on boolean values
    const payload = { ...data };
    if (!data.isStudent) {
      delete payload.university;
      delete payload.department;
    }
    if (!data.hasGuarantor) {
      delete payload.guarantor;
    }

    mutate(payload, {
      onSuccess: (responseData) => {
        toast.success("Application submitted successfully!", {
          description:
            "We will review your application and get back to you soon.",
        });
        form.reset();
        setIsChecked(false);
      },
      onError: (error: any) => {
        console.error("Waitlist submission failed:", error);
        toast.error(
          error.message || "Failed to submit application. Please try again.",
        );
      },
    });
  };

  return (
    <section className="py-12 max-w-screen-xl mx-auto px-4">
      <div className="space-y-4 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold">Join Rider Waitlist</h1>
        <p className="font-medium text-gray-700 text-base">
          Apply to become a Vinkol internal rider and get a branded bike for
          deliveries.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Full Name"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="tel"
                    maxLength={11}
                    minLength={11}
                    placeholder="Phone Number"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State of Residence */}
          <FormField
            control={form.control}
            name="stateOfResidence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State of Residence</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-blue-primary text-blue-primary py-4 px-3 rounded-md appearance-none bg-white pr-8"
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    {nigerianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <input
                    type="date"
                    {...field}
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-blue-primary text-blue-primary py-4 px-3 rounded-md appearance-none bg-white pr-8"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Is Student */}
          <FormField
            control={form.control}
            name="isStudent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you a student?</FormLabel>
                <FormControl>
                  <select
                    value={String(field.value)}
                    onChange={(e) => field.onChange(e.target.value === "true")}
                    onBlur={field.onBlur}
                    name={field.name}
                    className="w-full border border-blue-primary text-blue-primary py-4 px-3 rounded-md appearance-none bg-white pr-8"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* University - conditional */}
          {isStudent && (
            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="University"
                      className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Department - conditional */}
          {isStudent && (
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="Department"
                      className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Experience Years */}
          <FormField
            control={form.control}
            name="experienceYears"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="Years of Experience"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Address"
                    className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Has Guarantor */}
          <FormField
            control={form.control}
            name="hasGuarantor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have a guarantor?</FormLabel>
                <FormControl>
                  <select
                    value={String(field.value)}
                    onChange={(e) => field.onChange(e.target.value === "true")}
                    onBlur={field.onBlur}
                    name={field.name}
                    className="w-full border border-blue-primary text-blue-primary py-4 px-3 rounded-md appearance-none bg-white pr-8"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Guarantor Name - conditional */}
          {hasGuarantor && (
            <FormField
              control={form.control}
              name="guarantor.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guarantor Name</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="Guarantor Name"
                      className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Guarantor Phone - conditional */}
          {hasGuarantor && (
            <FormField
              control={form.control}
              name="guarantor.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guarantor Phone</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="tel"
                      maxLength={11}
                      minLength={11}
                      placeholder="Guarantor Phone"
                      className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Purpose */}
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Why do you want to join Vinkol as a rider? (Purpose)
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      rows={4}
                      placeholder="Tell us why you want to join..."
                      className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <TermsCheckbox
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />

          <div className="md:col-span-2 flex justify-center">
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-md py-4 px-6 w-full md:w-1/3 text-lg"
            >
              {isPending ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
