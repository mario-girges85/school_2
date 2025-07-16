import React from "react";
import { COLORS } from "../../constants/colors";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  onClick,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed" +
    (fullWidth ? " w-full" : "");

  // Fallback style for primary button
  const primaryStyle = {
    background: COLORS.primary[600],
    color: COLORS.neutral[50],
    border: "none",
    borderRadius: "0.375rem",
    padding:
      size === "sm"
        ? "0.375rem 0.75rem"
        : size === "lg"
        ? "0.75rem 1.5rem"
        : "0.5rem 1rem",
    fontSize: size === "sm" ? "0.875rem" : size === "lg" ? "1rem" : "0.95rem",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background 0.2s, color 0.2s",
  };

  const hoverStyle =
    variant === "primary"
      ? {
          background: COLORS.primary[700],
        }
      : {};

  const getStyle = () => {
    if (variant === "primary") return primaryStyle;
    // Add more variants if needed
    return {};
  };

  return (
    <button
      type={type}
      className={baseClasses + (className ? ` ${className}` : "")}
      style={getStyle()}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseOver={(e) => {
        if (variant === "primary" && !disabled) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }
      }}
      onMouseOut={(e) => {
        if (variant === "primary" && !disabled) {
          Object.assign(e.currentTarget.style, primaryStyle);
        }
      }}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
