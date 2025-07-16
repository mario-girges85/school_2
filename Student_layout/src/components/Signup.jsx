import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Alert from "./ui/Alert";
import Card from "./ui/Card";
import Select from "./ui/Select";

const initialState = {
  name: "",
  email: "",
  password: "",
  gender: "",
  phone: "",
  birthDate: "",
  image: null,
};

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const Signup = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\+?\d{10,15}$/.test(form.phone.trim()))
      newErrors.phone = "Invalid phone number";
    if (!form.birthDate) newErrors.birthDate = "Birth date is required";
    if (!form.image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setAlert(null);
    setTimeout(() => {
      setAlert({
        type: "success",
        title: "Signup Successful",
        message: "Your account has been created!",
      });
      setForm(initialState);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-8 px-2">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <img src={logo} alt="School Logo" className="h-16 w-auto" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-neutral-900">Sign Up</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Create your student account
          </p>
        </div>
        <Card className="p-8">
          {alert && (
            <Alert
              type={alert.type}
              title={alert.title}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              required
              autoComplete="name"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              required
              autoComplete="new-password"
            />
            <Select
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              options={genderOptions}
              placeholder="Select gender"
              error={errors.gender}
              required
            />
            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              required
              placeholder="e.g. +201012345678"
              autoComplete="tel"
            />
            <Input
              label="Birth Date"
              name="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange}
              error={errors.birthDate}
              required
            />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Profile Image <span className="text-red-500">*</span>
              </label>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-neutral-700 border border-neutral-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
            </div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </Card>
        <div className="text-center">
          <p className="text-sm text-neutral-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-accent-600 hover:text-accent-500 transition-colors duration-200"
            >
              Login
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
      </div>
    </div>
  );
};

export default Signup;
