import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center cursor-pointer font-bold rounded-full  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses: Record<Variant, string> = {
  primary: "bg-[#0E74D8] text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-white  text-[#0E74D8] hover:bg-gray-200 focus:ring-gray-300",
  outline:
    "border border-[#0E74D8] text-black hover:bg-gray-100 focus:ring-gray-300",
  ghost: "text-gray-800 hover:bg-gray-100 focus:ring-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-xs px-4 py-2",
  lg: "text-xs px-6 py-3",
};

export const Button = ({
  children,
  variant = "primary",
  size = "sm",
  isLoading = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        baseStyles,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
