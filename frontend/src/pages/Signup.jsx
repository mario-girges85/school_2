import React, { useState } from "react";
import {
  Card,
  Input,
  Select,
  Button,
  Alert,
  LoadingSpinner,
} from "../components/ui";

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
    try {
      // Prepare form data for API
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("email", form.email.trim().toLowerCase());
      formData.append("password", form.password);
      formData.append("gender", form.gender);
      formData.append("phone", form.phone.trim());
      formData.append("birthDate", new Date(form.birthDate).toISOString());
      if (form.image) formData.append("image", form.image);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setAlert({
        type: "success",
        title: "Signup Successful",
        message: "Your account has been created!",
      });
      setForm(initialState);
    } catch (err) {
      setAlert({
        type: "error",
        title: "Signup Failed",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-8 px-2">
      <Card title="Sign Up" className="w-full max-w-md mx-auto" padding="lg">
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
            {loading ? <LoadingSpinner size="sm" /> : "Sign Up"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
