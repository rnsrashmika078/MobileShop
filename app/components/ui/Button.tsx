import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "gradient" | "negative";
  size?: "xs" | "sm" | "md" | "lg";
  name?: string;
}

const Button = ({
  variant = "default",
  size = "md",
  className,
  name,
  children,
  ...props
}: ButtonProps) => {
  const base =
    "active:scale-110 hover:scale-102 hover:cursor-pointer rounded-md font-medium transition duration-200 focus:outline-none";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    negative: "bg-gray-500 text-white hover:bg-gray-700",
    outline: "border border-gray-400 text-white hover:bg-black",
    gradient: `bg-gradient-animated text-white ${
      props.disabled ? "opacity-20 cursor-not-allowed" : ""
    }`,
  };

  const sizes = {
    xs: "p-0 text-xs",
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {name}
    </button>
  );
};

export default Button;
