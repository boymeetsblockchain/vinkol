"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Autocomplete from "react-google-autocomplete";
import { useGetShoppingDeliveryFee } from "@/services/orders/mutation";
import { toast } from "sonner";

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
    <section className="py-12 max-w-screen-xl mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold">Complete Order</h1>
          <p className="font-medium text-gray-700 text-base">
            Fill in the form to complete your order.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-blue-primary placeholder:text-blue-primary py-4 px-3 rounded-md"
            required
          />
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full border border-blue-primary md:col-span-2 text-gray-700 py-4 px-3 rounded-md"
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
          <div className="md:col-span-2">
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
                types: ["address"],
                componentRestrictions: { country: "ng" },
              }}
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
              className="w-full py-4 px-3 focus:outline-none border border-blue-primary placeholder:text-blue-primary rounded-[5px] placeholder:text-base"
              placeholder="Full Delivery Address"
              required
            />
          </div>
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-md"
          >
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
}

export default CheckoutPage;
