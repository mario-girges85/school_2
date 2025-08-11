import React, { useState } from "react";
import { Button, Input, Alert, LoadingSpinner } from "../components/ui";

const ProfileEdit = ({ user, onSave }) => {
  const [form, setForm] = useState({ ...user });
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEditing(false);
      setAlert({
        type: "success",
        title: "Profile Updated",
        message: "Your profile has been updated successfully.",
      });
      onSave(form);
    } catch (error) {
      setAlert({
        type: "error",
        title: "Update Failed",
        message: "Failed to update profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!editing) {
    return (
      <div className="flex justify-end">
        <Button variant="primary" onClick={() => setEditing(true)}>
          Edit Profile
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-4 mt-2">
      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <Input
          label="Birth Date"
          name="birthDate"
          type="date"
          value={form.birthDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex gap-3 justify-end">
        <Button
          variant="secondary"
          onClick={() => setEditing(false)}
          type="button"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          loading={loading}
          disabled={loading}
        >
          {loading ? <LoadingSpinner size="sm" /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileEdit;
