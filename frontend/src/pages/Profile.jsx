import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Page from "../components/layout/Page";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: "Mariam Fady",
    email: "mariam@email.com",
    phone: "01012345678",
    role: "student",
    image: "",
    classes: ["Grade 1", "Grade 2"],
    grades: [
      { subject: "Math", value: 95 },
      { subject: "Science", value: 88 },
    ],
    attendance: { present: 20, absent: 2 },
  },
  {
    id: 2,
    name: "Peter Samy",
    email: "peter@email.com",
    phone: "01087654321",
    role: "teacher",
    image: "",
    classes: ["Grade 1"],
    grades: [],
    attendance: { present: 22, absent: 0 },
  },
  {
    id: 3,
    name: "Sandra Nader",
    email: "sandra@email.com",
    phone: "01055555555",
    role: "student",
    image: "",
  },
  {
    id: 4,
    name: "Mark Adel",
    email: "mark@email.com",
    phone: "01022223333",
    role: "student",
    image: "",
  },
  {
    id: 5,
    name: "Nourhan George",
    email: "nourhan@email.com",
    phone: "01099998888",
    role: "teacher",
    image: "",
  },
];

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = parseInt(id, 10);
  const userData = mockUsers.find((u) => u.id === userId);

  // Editable state
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(userData);
  const [imagePreview, setImagePreview] = useState(
    userData?.image || "/default-user.png"
  );

  if (!profile) {
    return (
      <Page title="User Not Found">
        <Container>
          <div className="text-center py-12 text-neutral-500">
            User not found.
          </div>
          <div className="flex justify-center mt-6">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </Container>
      </Page>
    );
  }

  // Handle profile edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfile((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = () => {
    setEditMode(false);
    // In real app, save to backend
  };
  const handleCancel = () => {
    setProfile(userData);
    setImagePreview(userData?.image || "/default-user.png");
    setEditMode(false);
  };

  return (
    <Page title={profile.name} subtitle={`Role: ${profile.role}`}>
      <Container maxWidth="md">
        <div className="flex flex-col items-center py-8">
          <img
            src={imagePreview}
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover border border-neutral-200 bg-neutral-100 mb-6 max-w-full h-auto"
          />
          {editMode ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4"
              />
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="mb-2 border rounded px-3 py-2 w-full"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="mb-2 border rounded px-3 py-2 w-full"
                placeholder="Email"
              />
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                className="mb-4 border rounded px-3 py-2 w-full"
                placeholder="Phone"
              />
              <div className="flex gap-3">
                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-lg font-semibold mb-2">{profile.name}</div>
              <div className="text-neutral-600 mb-1">{profile.email}</div>
              <div className="text-neutral-600 mb-1">{profile.phone}</div>
              <div className="text-neutral-500 capitalize mb-4">
                {profile.role}
              </div>
              <Button
                variant="secondary"
                onClick={() => setEditMode(true)}
                className="mb-4"
              >
                Edit Profile
              </Button>
            </>
          )}
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        {/* Class Assignments */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Class Assignments</h3>
          <div className="overflow-x-auto">
            <ul className="list-disc list-inside text-neutral-700">
              {profile.classes && profile.classes.length > 0 ? (
                profile.classes.map((cls, idx) => <li key={idx}>{cls}</li>)
              ) : (
                <li>No class assignments.</li>
              )}
            </ul>
          </div>
        </div>
        {/* Attendance Summary */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Attendance Summary</h3>
          <div className="text-neutral-700">
            Present:{" "}
            <span className="text-green-600 font-bold">
              {profile.attendance?.present ?? 0}
            </span>{" "}
            days
            <br />
            Absent:{" "}
            <span className="text-red-600 font-bold">
              {profile.attendance?.absent ?? 0}
            </span>{" "}
            days
          </div>
        </div>
        {/* Grades */}
        {profile.role === "student" && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Grades</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-neutral-200">
                <thead>
                  <tr className="bg-neutral-100">
                    <th className="px-3 py-2 text-left">Subject</th>
                    <th className="px-3 py-2 text-left">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.grades && profile.grades.length > 0 ? (
                    profile.grades.map((g, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2">
                          <Link
                            to={`/exams/${g.subject}/correction`}
                            className="text-primary-600 hover:underline"
                          >
                            {g.subject}
                          </Link>
                        </td>
                        <td className="px-3 py-2">{g.value}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="text-neutral-500 px-3 py-2">
                        No grades available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default Profile;
