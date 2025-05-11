import { ChevronDown } from "lucide-react";

export const Profile = () => {
  return (
    <header>
      <div className="flex items-center gap-x-4">
        <div className="hidden md:block">
          <h1 className="text-sm font-bold">Michael Smitt</h1>
          <p className="text-xs">MichaelSmitt@gmail.com</p>
        </div>
        <div className="flex items-center gap-1">
          <img
            src="/assets/riderprofile.jpg"
            className="h-8 w-8 rounded-full object-cover"
            alt=""
          />
          <ChevronDown className="text-blue-primary cursor-pointer" />
        </div>
      </div>
    </header>
  );
};
