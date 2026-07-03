"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Autocomplete from "react-google-autocomplete";
import { useGetShoppingDeliveryFee } from "@/services/orders/mutation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [address, setAddress] = useState("");
  const [lga, setLga] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const { mutate } = useGetShoppingDeliveryFee();

  const normalizeStateName = (googleStateName: any) => {
    if (!googleStateName) return "";
    return googleStateName
      .replace(" State", "")
      .toLowerCase()
      .replace(" ", "-");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        store: id,
        deliveryType: "regular",
        dropoffLocation: {
          lat,
          lng,
        },
      },
      {
        onSuccess: (responseData) => {
          console.log(responseData.data.price);
          const params = new URLSearchParams();
          params.append("firstname", firstName);
          params.append("lastname", lastName);
          params.append("phonenumber", phoneNumber);
          params.append("email", email);
          params.append("dropoffLocation", address);
          params.append("state", selectedState);
          params.append("deliveryFee", responseData.data.price);
          params.append("store", id);

          toast.success("Quote successfully retrieved!", {
            description: `Amount: ₦${
              responseData.data.price?.toLocaleString() || "N/A"
            }`, // <--- Access 'price' for toast
          });

          // Navigate to the quote page with the generated query string
          router.push(`/quote/stores?${params.toString()}`);
        },
      }
    );
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center items-start">
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 max-w-3xl w-full">
        <div className="mb-8 md:mb-10 border-b border-gray-100 pb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Checkout Details</h1>
          <p className="font-medium text-gray-500 text-sm md:text-base">
            Please fill in your information to complete your order.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1">First Name</label>
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
            <label className="text-sm font-semibold text-gray-700 ml-1">Last Name</label>
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
            <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
            <input
              type="number"
              placeholder="e.g. 08012345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all shadow-sm"
              required
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
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
            <label className="text-sm font-semibold text-gray-700 ml-1">State / Region</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all shadow-sm"
              required
            >
            <option value="">Select your state</option>
            <option value="abia">Abia</option>
            <option value="adamawa">Adamawa</option>
            <option value="akwa-ibom">Akwa Ibom</option>
            <option value="anambra">Anambra</option>
            <option value="bauchi">Bauchi</option>
            <option value="bayelsa">Bayelsa</option>
            <option value="benue">Benue</option>
            <option value="borno">Borno</option>
            <option value="cross-river">Cross River</option>
            <option value="delta">Delta</option>
            <option value="ebonyi">Ebonyi</option>
            <option value="edo">Edo</option>
            <option value="ekiti">Ekiti</option>
            <option value="enugu">Enugu</option>
            <option value="gombe">Gombe</option>
            <option value="imo">Imo</option>
            <option value="jigawa">Jigawa</option>
            <option value="kaduna">Kaduna</option>
            <option value="kano">Kano</option>
            <option value="katsina">Katsina</option>
            <option value="kebbi">Kebbi</option>
            <option value="kogi">Kogi</option>
            <option value="kwara">Kwara</option>
            <option value="lagos">Lagos</option>
            <option value="nasarawa">Nasarawa</option>
            <option value="niger">Niger</option>
            <option value="ogun">Ogun</option>
            <option value="ondo">Ondo</option>
            <option value="osun">Osun</option>
            <option value="oyo">Oyo</option>
            <option value="plateau">Plateau</option>
            <option value="rivers">Rivers</option>
            <option value="sokoto">Sokoto</option>
            <option value="taraba">Taraba</option>
            <option value="yobe">Yobe</option>
            <option value="zamfara">Zamfara</option>
            <option value="abuja">Federal Capital Territory (Abuja)</option>
          </select>
          </div>
          
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Delivery Address</label>
            <Autocomplete
              apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY}
              onPlaceSelected={(place) => {
                setAddress(place.formatted_address || "");

                if (place.geometry?.location) {
                  setLat(place.geometry.location.lat().toString());
                  setLng(place.geometry.location.lng().toString());
                }

                let foundLga = "";
                let foundState = "";

                for (const component of place.address_components) {
                  if (component.types.includes("administrative_area_level_2")) {
                    foundLga = component.long_name;
                  }
                  if (component.types.includes("administrative_area_level_1")) {
                    foundState = component.long_name;
                  }
                }
                setLga(foundLga);
                // Update the state dropdown to sync with the selected address
                setSelectedState(normalizeStateName(foundState));
              }}
              options={{
                types: ["geocode", "establishment"],
                componentRestrictions: { country: ["ng"] },
                fields: [
                  "formatted_address",
                  "name",
                  "geometry.location",
                  "address_components",
                ],
              }}
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:bg-white transition-all shadow-sm"
              placeholder="Search your delivery address"
              required
            />
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="w-full bg-[var(--color-blue-primary)] hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl transition-all flex justify-center items-center"
          >
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
}

export default CheckoutPage;
