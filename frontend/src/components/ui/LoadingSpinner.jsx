import React from "react";

const LoadingSpinner = ({
  size = "md",
  color = "primary",
  className = "",
  text = "",
  fullScreen = false,
}) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const colors = {
    primary: "border-primary-600",
    white: "border-white",
    neutral: "border-neutral-600",
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 ${sizes[size]} ${colors[color]}`}
      />
      {text && <p className="mt-2 text-sm text-neutral-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
