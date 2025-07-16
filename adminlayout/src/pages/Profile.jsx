import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  Badge,
  Button,
  Input,
  Alert,
  LoadingSpinner,
} from "../components/ui";
import ProfileEdit from "./ProfileEdit";

// Mock user data
const mockUser = {
  id: 1,
  name: "Mariam Fady",
  email: "mariam@email.com",
  phone: "+201012345678",
  gender: "female",
  birthDate: "1990-07-15",
  role: "student",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUpeorPvZN_kz2u_YMpnlcw5sdu2OfQKZ8NQ&s",
  classes: ["Grade 1", "Grade 2", "Mathematics", "Science"],
  attendance: { present: 20, absent: 2 },
  grades: [
    { subject: "Math", value: 95 },
    { subject: "Science", value: 88 },
    { subject: "English", value: 92 },
    { subject: "History", value: 85 },
  ],
};

// Profile Header Component
const ProfileHeader = ({ user }) => (
  <div className="flex flex-col items-center md:flex-row md:items-end gap-6 md:gap-8 pb-6 border-b border-neutral-200">
    <img
      src={user.image || "/default-user.png"}
      alt={user.name}
      className="w-28 h-28 rounded-full object-cover border border-neutral-200 bg-neutral-100 shadow-sm"
    />
    <div className="flex flex-col items-center md:items-start gap-2">
      <h2 className="text-2xl font-bold text-neutral-900">{user.name}</h2>
      <Badge variant="primary" size="md" className="capitalize">
        {user.role}
      </Badge>
    </div>
  </div>
);

// Profile Details Component
const ProfileDetails = ({ user }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <div className="text-sm text-neutral-500 mb-1">Email</div>
      <div className="font-medium text-neutral-800 break-all">{user.email}</div>
    </div>
    <div>
      <div className="text-sm text-neutral-500 mb-1">Phone</div>
      <div className="font-medium text-neutral-800">{user.phone}</div>
    </div>
    <div>
      <div className="text-sm text-neutral-500 mb-1">Gender</div>
      <div className="font-medium text-neutral-800 capitalize">
        {user.gender}
      </div>
    </div>
    <div>
      <div className="text-sm text-neutral-500 mb-1">Birth Date</div>
      <div className="font-medium text-neutral-800">{user.birthDate}</div>
    </div>
  </div>
);

// Classes List Component
const ClassesList = ({ classes }) => (
  <div>
    <h4 className="text-sm font-medium text-neutral-700 mb-2">
      Assigned Classes
    </h4>
    {classes && classes.length > 0 ? (
      <ul className="list-disc list-inside space-y-1 text-neutral-800">
        {classes.map((cls, index) => (
          <li key={index} className="text-sm">
            {cls}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-neutral-500">No classes assigned</p>
    )}
  </div>
);

// Attendance Summary Component
const AttendanceSummaryDisplay = ({ attendance }) => (
  <div>
    <h4 className="text-sm font-medium text-neutral-700 mb-2">
      Attendance Summary
    </h4>
    <div className="space-y-1 text-sm">
      <div className="flex justify-between">
        <span className="text-neutral-600">Present:</span>
        <span className="font-medium text-green-600">
          {attendance?.present || 0} days
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-neutral-600">Absent:</span>
        <span className="font-medium text-red-600">
          {attendance?.absent || 0} days
        </span>
      </div>
      <div className="flex justify-between border-t border-neutral-200 pt-1">
        <span className="text-neutral-700 font-medium">Total:</span>
        <span className="font-medium text-neutral-800">
          {(attendance?.present || 0) + (attendance?.absent || 0)} days
        </span>
      </div>
    </div>
  </div>
);

// Grades Table Component
const GradesTable = ({ grades, role }) => {
  if (role !== "student") return null;

  return (
    <div>
      <h4 className="text-sm font-medium text-neutral-700 mb-3">Grades</h4>
      {grades && grades.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-2 font-medium text-neutral-700">
                  Subject
                </th>
                <th className="text-right py-2 font-medium text-neutral-700">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                <tr key={index} className="border-b border-neutral-100">
                  <td className="py-2">
                    <Link
                      to={`/exams/${grade.subject}/correction`}
                      className="text-primary-600 hover:text-primary-800 hover:underline"
                    >
                      {grade.subject}
                    </Link>
                  </td>
                  <td className="text-right py-2 font-medium">
                    {grade.value}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-neutral-500">No grades available</p>
      )}
    </div>
  );
};

// Back Button Component
const BackButton = ({ navigate }) => (
  <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
    ← Back
  </Button>
);

// Main Profile Component
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(mockUser);

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <BackButton navigate={navigate} />

        <Card className="mb-6" padding="lg">
          <ProfileHeader user={user} />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card title="Profile Details" padding="lg">
              <ProfileDetails user={user} />
            </Card>

            <Card title="Edit Profile" padding="lg">
              <ProfileEdit user={user} onSave={setUser} />
            </Card>

            {user.role === "student" && (
              <Card title="Academic Information" padding="lg">
                <GradesTable grades={user.grades} role={user.role} />
              </Card>
            )}
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            <Card title="Classes" padding="lg">
              <ClassesList classes={user.classes} />
            </Card>

            <Card title="Attendance" padding="lg">
              <AttendanceSummaryDisplay attendance={user.attendance} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
