import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Page from "../components/layout/Page";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";

// Mock users data (Ideally, fetch this from an API)
const mockUsers = [
  {
    id: 1,
    name: "Mariam Fady",
    email: "mariam@email.com",
    phone: "01012345678",
    role: "student",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUpeorPvZN_kz2u_YMpnlcw5sdu2OfQKZ8NQ&s", // Placeholder for image URL
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
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUpeorPvZN_kz2u_YMpnlcw5sdu2OfQKZ8NQ&s",
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

// --- Sub-components ---

const ProfileNotFound = ({ navigate }) => (
  <Page title="User Not Found">
    <Container>
      <div className="text-center py-12 text-neutral-500">User not found.</div>
      <div className="flex justify-center mt-6">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </Container>
  </Page>
);

const ProfileHeaderSection = ({ name, role, imagePreview }) => (
  <div className="flex flex-col items-center py-8">
    <img
      src={imagePreview || "/default-user.png"} // Fallback image
      alt={name}
      className="w-32 h-32 rounded-full object-cover border border-neutral-200 bg-neutral-100 mb-6 max-w-full h-auto"
    />
    <div className="text-lg font-semibold mb-2">{name}</div>
    <div className="text-neutral-500 capitalize mb-4">Role: {role}</div>
  </div>
);

const ProfileInfoDisplay = ({ profile, setEditMode }) => (
  <>
    <div className="text-neutral-600 mb-1">{profile.email}</div>
    <div className="text-neutral-600 mb-1">{profile.phone}</div>
    <Button
      variant="secondary"
      onClick={() => setEditMode(true)}
      className="mb-4 mt-4"
    >
      Edit Profile
    </Button>
  </>
);

const ProfileEditForm = ({
  profile,
  handleInputChange,
  handleImageChange,
  handleSave,
  handleCancel,
}) => (
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
);

const ProfileSection = ({ title, children }) => (
  <div className="mt-8">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const ClassAssignmentsList = ({ classes }) => (
  <div className="overflow-x-auto">
    <ul className="list-disc list-inside text-neutral-700">
      {classes && classes.length > 0 ? (
        classes.map((cls, idx) => <li key={idx}>{cls}</li>)
      ) : (
        <li>No class assignments.</li>
      )}
    </ul>
  </div>
);

const AttendanceSummaryDisplay = ({ attendance }) => (
  <div className="text-neutral-700">
    Present:{" "}
    <span className="text-green-600 font-bold">{attendance?.present ?? 0}</span>{" "}
    days
    <br />
    Absent:{" "}
    <span className="text-red-600 font-bold">
      {attendance?.absent ?? 0}
    </span>{" "}
    days
  </div>
);

const GradesTable = ({ grades }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm border border-neutral-200">
      <thead>
        <tr className="bg-neutral-100">
          <th className="px-3 py-2 text-left">Subject</th>
          <th className="px-3 py-2 text-left">Grade</th>
        </tr>
      </thead>
      <tbody>
        {grades && grades.length > 0 ? (
          grades.map((g, idx) => (
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
);

const BackButton = ({ navigate }) => (
  <Button variant="secondary" onClick={() => navigate(-1)} className="mt-4">
    Back
  </Button>
);

// --- Main Profile Component ---

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = parseInt(id, 10);
  const userData = mockUsers.find((u) => u.id === userId);

  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(userData);
  const [imagePreview, setImagePreview] = useState(
    userData?.image || "/default-user.png"
  );

  if (!profile) {
    return <ProfileNotFound navigate={navigate} />;
  }

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
    // In a real app, send 'profile' data to your backend API here
    console.log("Saving profile:", profile);
    // Example: await saveProfileToApi(profile);
  };

  const handleCancel = () => {
    setProfile(userData); // Revert to original data
    setImagePreview(userData?.image || "/default-user.png"); // Revert image
    setEditMode(false);
  };

  return (
    <Page title={profile.name} subtitle={`Role: ${profile.role}`}>
      <Container maxWidth="md">
        <ProfileHeaderSection
          name={profile.name}
          role={profile.role}
          imagePreview={imagePreview}
        />

        {editMode ? (
          <ProfileEditForm
            profile={profile}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        ) : (
          <ProfileInfoDisplay profile={profile} setEditMode={setEditMode} />
        )}

        <BackButton navigate={navigate} />

        <ProfileSection title="Class Assignments">
          <ClassAssignmentsList classes={profile.classes} />
        </ProfileSection>

        <ProfileSection title="Attendance Summary">
          <AttendanceSummaryDisplay attendance={profile.attendance} />
        </ProfileSection>

        {profile.role === "student" && (
          <ProfileSection title="Grades">
            <GradesTable grades={profile.grades} />
          </ProfileSection>
        )}
      </Container>
    </Page>
  );
};

export default Profile;
