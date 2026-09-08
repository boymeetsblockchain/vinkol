"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Autocomplete from "react-google-autocomplete";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

import { getCartFromStorage } from "@/config/storage";
import { saveCheckoutSession } from "@/config/checkout";
import { formatMoney } from "@/lib/money";
import { placesCountry, regionLabel, resolveRegionFromPlace } from "@/lib/markets";
import { useMarket } from "@/lib/markets/useMarket";
import { useGetShoppingDeliveryFee } from "@/services/orders/mutation";

function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const market = useMarket();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [lga, setLga] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [cartCount, setCartCount] = useState<number | null>(null);

  /**
   * Derived from the chosen address rather than picked separately. It is shown
   * read-only so the customer can see which state their order is recorded
   * under, and it holds the canonical value the store records use — a slug
   * would never match.
   */
  const [state, setState] = useState("");

  useEffect(() => {
    setCartCount(getCartFromStorage().length);
  }, []);

  const { mutate, isPending } = useGetShoppingDeliveryFee();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cartCount === 0) {
      toast.error("Your basket is empty. Add something before checking out.");
      return;
    }

    // Typing an address without picking a suggestion leaves no coordinates,
    // and the quote endpoint cannot price a delivery to nowhere.
    if (!lat || !lng) {
      toast.error("Please pick your address from the suggestions.");
      return;
    }

    if (!state) {
      toast.error(
        "We could not work out the state for that address. Please pick another.",
      );
      return;
    }

    mutate(
      {
        store: id,
        deliveryType: "regular",
        dropoffLocation: { lat, lng },
      },
      {
        onSuccess: (responseData) => {
          const quote = responseData?.data;

          if (!quote?.quoteId) {
            toast.error(
              "We could not hold a price for this delivery. Please try again.",
            );
            return;
          }

          const cart = getCartFromStorage();

          // sessionStorage rather than the query string: this carries the
          // customer's name, email, phone and street address, and a fee in a
          // URL is a fee the customer can edit before it is submitted.
          saveCheckoutSession({
            quoteId: quote.quoteId,
            country: quote.country,
            currency: quote.currency,
            guest: {
              firstname: firstName,
              lastname: lastName,
              email,
              phone: phoneNumber,
            },
            state,
            dropoffLocation: address,
            store: id,
            goodsAmount: cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0,
            ),
            deliveryFee: quote.price,
            taxLabel: quote.taxLabel,
            expiresAt: quote.expiresAt,
          });

          toast.success("Quote successfully retrieved!", {
            description: `Delivery: ${formatMoney(quote.price, quote.currency)}`,
          });

          router.push("/quote/stores");
        },
        onError: (error) => {
          toast.error(
            error.message ||
              "We could not price this delivery. Please try again.",
          );
        },
      },
    );
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 max-w-3xl w-full"
      >
        <div className="mb-8 md:mb-10 border-b border-gray-100 pb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back to store
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Delivery details
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            We use these to price your delivery and keep you updated.
          </p>
        </div>

        {cartCount === 0 && (
          <p className="mb-6 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-800">
            Your basket is empty. Add items from the store before checking out.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="e.g. John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all shadow-sm"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="e.g. Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all shadow-sm"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              inputMode="tel"
              placeholder={
                market.country === "CA" ? "e.g. 4165550142" : "e.g. 08012345678"
              }
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all shadow-sm"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all shadow-sm"
              required
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Delivery Address
            </label>
            <Autocomplete
              apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY}
              onPlaceSelected={(place) => {
                setAddress(place.formatted_address || "");

                if (place.geometry?.location) {
                  setLat(place.geometry.location.lat().toString());
                  setLng(place.geometry.location.lng().toString());
                }

                const components = place.address_components ?? [];

                setLga(
                  components.find((c: { types: string[]; long_name: string }) =>
                    c.types.includes("administrative_area_level_2"),
                  )?.long_name ?? "",
                );

                const region = resolveRegionFromPlace(
                  components,
                  market.country,
                );
                setState(region?.value ?? "");
              }}
              options={{
                types: ["geocode", "establishment"],
                componentRestrictions: {
                  country: [placesCountry(market.country)],
                },
                fields: [
                  "formatted_address",
                  "name",
                  "geometry.location",
                  "address_components",
                ],
              }}
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAddress(e.target.value);
                // Coordinates belong to the previously chosen place, so drop
                // them the moment the text stops matching it.
                setLat("");
                setLng("");
                setState("");
              }}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all shadow-sm"
              placeholder="Enter your delivery address..."
              required
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              {market.country === "CA" ? "Province" : "State"}
            </label>
            <input
              type="text"
              readOnly
              value={state ? regionLabel(state, market.country) : ""}
              placeholder="Set from your delivery address"
              aria-describedby="state-hint"
              className="w-full bg-gray-100 border border-gray-200 text-gray-600 placeholder:text-gray-400 py-3.5 px-4 rounded-xl cursor-default"
            />
            <p id="state-hint" className="text-xs text-gray-400 ml-1">
              Your order is recorded under this{" "}
              {market.country === "CA" ? "province" : "state"}.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            disabled={isPending || cartCount === 0}
            className="w-full bg-[var(--color-blue-primary)] hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl transition-all flex justify-center items-center gap-2"
          >
            {isPending && <Loader2 size={20} className="animate-spin" />}
            {isPending ? "Getting your price…" : "Continue to payment"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CheckoutPage;
