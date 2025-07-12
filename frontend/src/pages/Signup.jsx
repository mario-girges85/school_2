import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

// --- Sub-components ---

const SignupHeader = () => (
  <div className="text-center">
    <div className="flex justify-center">
      <img
        src={logo}
        alt="Saint Demiana Deacos School Logo"
        className="h-16 w-auto"
      />
    </div>
    <h2 className="mt-6 text-3xl font-bold text-neutral-900">Create Account</h2>
    <p className="mt-2 text-sm text-neutral-600">
      Join Saint Demiana Deacos School community
    </p>
  </div>
);

const FormInput = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  required = false,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-neutral-700 mb-2"
    >
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
        error ? "border-red-500" : "border-neutral-300"
      }`}
      placeholder={placeholder}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const PasswordField = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  showPassword,
  setShowPassword,
  required = false,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-neutral-700 mb-2"
    >
      Password
    </label>
    <div className="relative">
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        required={required}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
          error ? "border-red-500" : "border-neutral-300"
        }`}
        placeholder={placeholder}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <svg
            className="h-5 w-5 text-neutral-400 hover:text-neutral-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5 text-neutral-400 hover:text-neutral-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        )}
      </button>
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const SignupForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  isLoading,
  showPassword,
  setShowPassword,
  errors,
}) => (
  <div className="bg-white rounded-lg shadow-lg p-8 border border-neutral-200">
    <form className="space-y-6" onSubmit={handleSubmit}>
      <FormInput
        id="name"
        name="name"
        type="text"
        label="Full Name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Enter your full name"
        error={errors.name}
        autoComplete="name"
        required
      />

      <FormInput
        id="email"
        name="email"
        type="email"
        label="Email Address"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email address"
        error={errors.email}
        autoComplete="email"
        required
      />

      <PasswordField
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        error={errors.password}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        required
      />

      {/* Gender Field */}
      <div>
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <FormInput
        id="phone"
        name="phone"
        type="tel"
        label="Phone Number"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Enter your phone number"
        error={errors.phone}
        autoComplete="tel"
        required
      />

      <FormInput
        id="birthDate"
        name="birthDate"
        type="date"
        label="Birth Date"
        value={formData.birthDate}
        onChange={handleInputChange}
        error={errors.birthDate}
        required
      />

      {/* Image File Field */}
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Profile Image (Optional)
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
        />
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
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
              Creating account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </div>
    </form>
  </div>
);

const AuthLinks = () => (
  <>
    <div className="text-center">
      <p className="text-sm text-neutral-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-accent-600 hover:text-accent-500 transition-colors duration-200"
        >
          Sign in here
        </Link>
      </p>
    </div>

    <div className="text-center">
      <Link
        to="/"
        className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors duration-200 flex items-center justify-center"
      >
        <svg
          className="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </Link>
    </div>
  </>
);

// --- Main Signup Component ---

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
    phone: "",
    birthDate: "",
    image: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Birth date validation
    if (!formData.birthDate) {
      newErrors.birthDate = "Birth date is required";
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        // Adjust age if birth date hasn't occurred yet this year
        // This is a more accurate age calculation
        // Source: https://stackoverflow.com/questions/4060004/calculate-age-in-javascript
        if (
          age === 3 &&
          (m > 0 || (m === 0 && today.getDate() >= birthDate.getDate()))
        ) {
          // If age is exactly 3 and birth date has passed or is today in the current year, allow it
        } else {
          newErrors.birthDate =
            "Users must be at least 3 years old and no older than 100";
        }
      } else if (age < 3 || age > 100) {
        newErrors.birthDate =
          "Users must be at least 3 years old and no older than 100";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare the data for API
      const signupData = new FormData();
      signupData.append("name", formData.name.trim());
      signupData.append("email", formData.email.toLowerCase().trim());
      signupData.append("password", formData.password);
      signupData.append("gender", formData.gender);
      signupData.append("phone", formData.phone.trim());
      signupData.append(
        "birthDate",
        new Date(formData.birthDate).toISOString()
      );
      if (formData.image) {
        signupData.append("image", formData.image);
      }

      // API call - replace with your actual API endpoint
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: signupData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        // Redirect to login page after successful signup
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        setErrors({
          submit: errorData.message || "Signup failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({
        submit: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <SignupHeader />
        <SignupForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          errors={errors}
        />
        <AuthLinks />
      </div>
    </div>
  );
};

export default Signup;
