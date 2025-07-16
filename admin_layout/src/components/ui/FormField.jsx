import React from "react";

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(name);
    }
  };

  const inputClasses = [
    "w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200",
    "border-neutral-300 focus:border-primary-500 focus:ring-primary-500",
    error && touched
      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
      : "",
    disabled ? "bg-neutral-100 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const labelClasses = [
    "block text-sm font-medium text-neutral-700 mb-2",
    required ? "after:content-['*'] after:ml-1 after:text-red-500" : "",
  ].join(" ");

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className={labelClasses}>
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />

      {error && touched && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
