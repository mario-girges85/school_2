import { VALIDATION } from "../constants";

// Common validation functions
export const required = (value) => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return "This field is required";
  }
  return "";
};

export const email = (value) => {
  if (!value) return "";
  if (!VALIDATION.EMAIL_REGEX.test(value)) {
    return "Please enter a valid email address";
  }
  return "";
};

export const minLength = (min) => (value) => {
  if (!value) return "";
  if (value.length < min) {
    return `Must be at least ${min} characters`;
  }
  return "";
};

export const maxLength = (max) => (value) => {
  if (!value) return "";
  if (value.length > max) {
    return `Must be no more than ${max} characters`;
  }
  return "";
};

export const password = (value) => {
  if (!value) return "";
  if (value.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`;
  }
  if (!/(?=.*[a-z])/.test(value)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/(?=.*[A-Z])/.test(value)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/(?=.*\d)/.test(value)) {
    return "Password must contain at least one number";
  }
  return "";
};

export const confirmPassword = (password) => (value) => {
  if (!value) return "";
  if (value !== password) {
    return "Passwords do not match";
  }
  return "";
};

export const phone = (value) => {
  if (!value) return "";
  if (!VALIDATION.PHONE_REGEX.test(value)) {
    return "Please enter a valid phone number";
  }
  return "";
};

export const url = (value) => {
  if (!value) return "";
  try {
    new URL(value);
    return "";
  } catch {
    return "Please enter a valid URL";
  }
};

export const number = (value) => {
  if (!value) return "";
  if (isNaN(value) || value === "") {
    return "Please enter a valid number";
  }
  return "";
};

export const positiveNumber = (value) => {
  const numError = number(value);
  if (numError) return numError;
  if (parseFloat(value) <= 0) {
    return "Please enter a positive number";
  }
  return "";
};

export const date = (value) => {
  if (!value) return "";
  const dateValue = new Date(value);
  if (isNaN(dateValue.getTime())) {
    return "Please enter a valid date";
  }
  return "";
};

export const futureDate = (value) => {
  const dateError = date(value);
  if (dateError) return dateError;
  const dateValue = new Date(value);
  const now = new Date();
  if (dateValue <= now) {
    return "Date must be in the future";
  }
  return "";
};

export const pastDate = (value) => {
  const dateError = date(value);
  if (dateError) return dateError;
  const dateValue = new Date(value);
  const now = new Date();
  if (dateValue >= now) {
    return "Date must be in the past";
  }
  return "";
};

// File validation
export const fileSize = (maxSize) => (file) => {
  if (!file) return "";
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return `File size must be less than ${maxSizeMB}MB`;
  }
  return "";
};

export const fileType = (allowedTypes) => (file) => {
  if (!file) return "";
  if (!allowedTypes.includes(file.type)) {
    return `File type must be one of: ${allowedTypes.join(", ")}`;
  }
  return "";
};

// Combine multiple validators
export const combineValidators =
  (...validators) =>
  (value, allValues) => {
    for (const validator of validators) {
      const error = validator(value, allValues);
      if (error) return error;
    }
    return "";
  };

// Common validation schemas
export const loginValidationSchema = {
  email: combineValidators(required, email),
  password: required,
};

export const signupValidationSchema = {
  name: combineValidators(required, minLength(2)),
  email: combineValidators(required, email),
  password: combineValidators(required, password),
  confirmPassword: (value, values) =>
    combineValidators(required, confirmPassword(values.password))(
      value,
      values
    ),
};

export const profileValidationSchema = {
  name: combineValidators(required, minLength(2)),
  email: combineValidators(required, email),
  phone: phone,
};
