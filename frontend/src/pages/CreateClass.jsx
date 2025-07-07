import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/layout/Page";
import Container from "../components/layout/Container";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";

const mockTeachers = [
  { id: 1, name: "Sarah Adel" },
  { id: 2, name: "George Samir" },
  { id: 3, name: "Mina Nabil" },
];

const teacherOptions = mockTeachers.map((t) => ({
  value: t.name,
  label: t.name,
}));

const CreateClass = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    teacher: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/classes");
    }, 1000);
  };

  return (
    <Page title="Create New Class">
      <Container maxWidth="md">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 border border-neutral-200 space-y-6"
        >
          <Input
            label="Class Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. Grade 4"
          />
          <Input
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Short description"
          />
          <Select
            label="Teacher"
            name="teacher"
            value={form.teacher}
            onChange={handleChange}
            options={teacherOptions}
            required
            placeholder="Select a teacher"
          />
          <div className="flex justify-between items-center mt-8">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate("/classes")}
            >
              Back
            </Button>
            <Button type="submit" variant="primary" loading={submitting}>
              Create Class
            </Button>
          </div>
        </form>
      </Container>
    </Page>
  );
};

export default CreateClass;
