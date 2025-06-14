import { Button } from "@/components/button";

function SettingsPage() {
  return (
    <div className="flex items-center justify-center max-w-screen-xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Form Section */}
        <div className="w-full flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold ">Profile</h1>
            <h2 className="text-sm text-gray-600 mt-1">
              Complete the form to finish setting up your profile.
            </h2>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src="/assets/riderprofile.jpg"
              alt="Rider Profile"
              className="h-36 w-36 rounded-full border border-gray-300 object-cover"
            />
          </div>

          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
            />
            <p className="text-xs text-gray-500">
              Ensure name matches your government-issued ID.
            </p>
          </div>

          {/* State Select */}
          <div className="flex flex-col gap-2">
            <select className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700">
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

          <Button variant="auth">Save</Button>
        </div>
      </div>
    </div>
  );
}
export default SettingsPage;
