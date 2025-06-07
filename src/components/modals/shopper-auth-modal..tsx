"use client";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { Button } from "../button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useShopperRegisterMutation,
  useRiderLoginMutation,
} from "@/services/rider/mutation"; // Assuming these are correctly defined
import { toast } from "sonner"; // For user notifications

interface ShopperAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  // The 'islogin' prop seems redundant given 'swithAuthType' state,
  // but keeping it here as per your original code.
  islogin: boolean;
}

export const ShopperAuthModal = ({
  isOpen,
  onClose,
}: ShopperAuthModalProps) => {
  // State to manage whether the user is in login or register mode
  const [swithAuthType, setSwitchAuthType] = useState<"login" | "register">(
    "login"
  );
  // State to store email and password input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For registration

  // Determine if the current mode is login based on state
  const isLogin = swithAuthType === "login";

  // Initialize Next.js router
  const router = useRouter();

  // Initialize mutations for registration and login
  const { mutate: riderRegister, isPending: isRegistering } =
    useShopperRegisterMutation();
  const { mutate: riderLogin, isPending: isLoggingIn } =
    useRiderLoginMutation();

  // Determine if any mutation is currently pending
  const isPending = isRegistering || isLoggingIn;

  // If the modal is not open, render nothing
  if (!isOpen) {
    return null;
  }

  /**
   * Handles the form submission for both login and registration.
   * It determines which mutation to call based on the current `swithAuthType`.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (isLogin) {
      // Handle login
      riderLogin(
        { email, password },
        {
          onSuccess: () => {
            toast.success("Login successful!");
            router.push("/shopper/dashboard"); // Or wherever the user should go after login
            onClose(); // Close the modal on successful login
          },
          onError: (error) => {
            console.error("Login failed:", error);
            // Assuming the error object has a 'message' property
            toast.error(error.message || "Login failed. Please try again.");
          },
        }
      );
    } else {
      // Handle registration
      riderRegister(
        { email, password },
        {
          onSuccess: () => {
            toast.success(
              "Registration successful! Please check your email for OTP."
            );
            router.push(`/rider/auth/otp?email=${encodeURIComponent(email)}`); // Navigate to OTP verification page
            onClose(); // Close the modal on successful registration
          },
          onError: (error) => {
            console.error("Registration failed:", error);
            // Assuming the error object has a 'message' property
            toast.error(
              error.message || "Registration failed. Please try again."
            );
          },
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-hidden text-black justify-center min-h-screen bg-black/80">
      <div className="w-full h-full flex md:items-end md:justify-end">
        <div className="w-full md:w-1/2 bg-white h-full flex flex-col p-8 gap-y-4 items-center justify-center">
          <div className="text-center">
            <h1 className="text-black font-bold text-3xl">Welcome</h1>
            <p className="font-medium">
              {isLogin
                ? "Log in to your account"
                : "Let’s Register you on Vinkol"}
            </p>
          </div>

          {/* Social login options */}
          <div className="flex items-center gap-x-4">
            <div className="w-8 h-8 rounded-full border flex items-center justify-center border-[rgba(0,0,0,0.1)] cursor-pointer">
              <FcGoogle />
            </div>
            <div className="w-8 h-8 rounded-full bg-black border flex items-center justify-center border-[rgba(0,0,0,0.1)] cursor-pointer">
              <FaApple color="white" />
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-x-3">
            <div className="bg-[#A5A4A0] h-0.5 w-1/3" />
            <p className="text-[#A5A4A0] font-xs">or</p>
            <div className="bg-[#A5A4A0] h-0.5 w-1/3" />
          </div>

          {/* Authentication Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-y-4"
          >
            <input
              type="email"
              placeholder="Email"
              className="w-3/4 py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-3/4 py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Confirm password only in register mode */}
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm password"
                className="w-3/4 py-2 px-3 focus:outline-none border border-[#A5A4A0] rounded-[5px] placeholder:text-blue-primary placeholder:text-base"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}

            {/* Forgot Password - Only in login mode */}
            {isLogin && (
              <div className="w-3/4 text-right">
                <span className="text-sm text-blue-primary underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
            )}

            <Button
              size="lg"
              variant="auth"
              className="rounded-[5px] w-3/4 my-4"
              type="submit" // Set type to submit for form submission
              disabled={isPending} // Disable button while mutation is in progress
            >
              {isPending ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
            </Button>
          </form>

          {/* Switch between login and register */}
          <div>
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <span
                  className="text-blue-primary underline cursor-pointer"
                  onClick={() => {
                    setSwitchAuthType("register");
                    // Clear form fields when switching modes
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Register
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  className="text-blue-primary underline cursor-pointer"
                  onClick={() => {
                    setSwitchAuthType("login");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Log in
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
