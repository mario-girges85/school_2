import React, { useState } from "react";
import Page from "../components/layout/Page";
import Container from "../components/layout/Container";

// Mock users
const mockUsers = [
  { id: 1, name: "Mariam Fady", email: "mariam@email.com", role: "student" },
  { id: 2, name: "Peter Samy", email: "peter@email.com", role: "teacher" },
  { id: 3, name: "Sandra Nader", email: "sandra@email.com", role: "student" },
  { id: 4, name: "Mark Adel", email: "mark@email.com", role: "student" },
  {
    id: 5,
    name: "Nourhan George",
    email: "nourhan@email.com",
    role: "teacher",
  },
];

// Mock attendance data: { userId: { date: true/false } }
const mockAttendance = {
  1: { "2024-06-01": true, "2024-06-02": false, "2024-06-03": true },
  2: { "2024-06-01": true, "2024-06-02": true, "2024-06-03": true },
  3: { "2024-06-01": false, "2024-06-02": false, "2024-06-03": true },
  4: { "2024-06-01": true, "2024-06-02": true, "2024-06-03": false },
  5: { "2024-06-01": true, "2024-06-02": false, "2024-06-03": true },
};

// Get all unique dates
const allDates = Array.from(
  new Set(
    Object.values(mockAttendance).flatMap((record) => Object.keys(record))
  )
).sort();

// --- Sub-components ---

const AttendanceHeader = () => (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
      Attendance Overview
    </h1>
    <p className="text-neutral-600">All users and their attendance history</p>
  </div>
);

const AttendanceControls = ({ searchTerm, setSearchTerm }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200 mb-8">
    <label
      htmlFor="attendanceSearch"
      className="block text-sm font-medium text-neutral-700 mb-2"
    >
      Search Users
    </label>
    <input
      type="text"
      id="attendanceSearch"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by name or email..."
      className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
    />
  </div>
);

const AttendanceTable = ({ users, attendance, allDates }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-neutral-200 rounded-lg shadow-md text-sm min-w-[400px]">
      <thead>
        <tr className="bg-neutral-100">
          <th className="px-4 py-3 text-left">Name</th>
          <th className="px-4 py-3 text-left">Email</th>
          <th className="px-4 py-3 text-left">Role</th>
          {allDates.map((date) => (
            <th key={date} className="px-4 py-3 text-left">
              {date}
            </th>
          ))}
          <th className="px-4 py-3 text-left">Summary</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td
              colSpan={allDates.length + 4}
              className="text-center py-8 text-neutral-500"
            >
              No users found matching your search.
            </td>
          </tr>
        ) : (
          users.map((user) => {
            const userAttendance = attendance[user.id] || {};
            const presentCount = Object.values(userAttendance).filter(
              (v) => v
            ).length;
            const absentCount = Object.values(userAttendance).filter(
              (v) => v === false
            ).length;
            return (
              <tr key={user.id} className="border-t border-neutral-200">
                <td className="px-4 py-3 font-medium text-neutral-900">
                  {user.name}
                </td>
                <td className="px-4 py-3 text-neutral-700">{user.email}</td>
                <td className="px-4 py-3 text-neutral-700 capitalize">
                  {user.role}
                </td>
                {allDates.map((date) => (
                  <td key={date} className="px-4 py-3">
                    {userAttendance[date] === true && (
                      <span className="text-green-600 font-semibold">
                        Present
                      </span>
                    )}
                    {userAttendance[date] === false && (
                      <span className="text-red-600 font-semibold">Absent</span>
                    )}
                    {userAttendance[date] === undefined && (
                      <span className="text-neutral-400">-</span>
                    )}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <span className="text-green-600">
                    Present: {presentCount}
                  </span>
                  {" / "}
                  <span className="text-red-600">Absent: {absentCount}</span>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </div>
);

// --- Main Attendance Component ---

const Attendance = () => {
  const [users] = useState(mockUsers);
  const [attendance] = useState(mockAttendance);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Page>
      <Container maxWidth="5xl">
        <AttendanceHeader />
        <AttendanceControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <AttendanceTable
          users={filteredUsers}
          attendance={attendance}
          allDates={allDates}
        />
      </Container>
    </Page>
  );
};

export default Attendance;
