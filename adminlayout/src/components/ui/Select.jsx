import React from "react";

const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  error,
  disabled = false,
  required = false,
  className = "",
  fullWidth = true,
  helperText,
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0";

  const stateClasses = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
    : "border-neutral-300 focus:border-primary-500 focus:ring-primary-500";

  const disabledClasses = disabled
    ? "bg-neutral-50 text-neutral-600 cursor-not-allowed"
    : "bg-white";

  const classes = [
    baseClasses,
    stateClasses,
    disabledClasses,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={classes}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
};

export default Select;
