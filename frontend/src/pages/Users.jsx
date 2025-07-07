import React, { useState } from "react";
import { USER_TYPES } from "../types";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Page from "../components/layout/Page";
import Container from "../components/layout/Container";
import { useNavigate } from "react-router-dom";

const roleOptions = [
  { value: USER_TYPES.STUDENT, label: "Student" },
  { value: USER_TYPES.TEACHER, label: "Teacher" },
  { value: USER_TYPES.ADMIN, label: "Admin" },
];

const mockUsers = [
  {
    id: 1,
    image: "",
    name: "Mina Nabil",
    email: "mina@example.com",
    phoneNumber: "+201234567890",
    role: USER_TYPES.ADMIN,
  },
  {
    id: 2,
    image: "",
    name: "Sarah Adel",
    email: "sarah@example.com",
    phoneNumber: "+201112223334",
    role: USER_TYPES.TEACHER,
  },
  {
    id: 3,
    image: "",
    name: "George Samir",
    email: "george@example.com",
    phoneNumber: "+201556677889",
    role: USER_TYPES.STUDENT,
  },
];

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [roleChange, setRoleChange] = useState({}); // { userId: newRole }
  const [confirmUserId, setConfirmUserId] = useState(null);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (userId, newRole) => {
    setRoleChange({ ...roleChange, [userId]: newRole });
    setConfirmUserId(userId);
  };

  const confirmRoleChange = async (userId) => {
    setUpdating(true);
    setTimeout(() => {
      setUsers(
        users.map((u) =>
          u.id === userId ? { ...u, role: roleChange[userId] } : u
        )
      );
      setRoleChange({ ...roleChange, [userId]: undefined });
      setConfirmUserId(null);
      setUpdating(false);
    }, 800);
  };

  return (
    <Page title="Users" subtitle="Manage all users in the system">
      <Container maxWidth="4xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-neutral-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-neutral-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Role
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-neutral-200">
                  <td className="px-4 py-3">
                    <img
                      src={user.image || "/default-avatar.png"}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover border border-neutral-200 cursor-pointer"
                      onClick={() => navigate(`/users/${user.id}`)}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-900">
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={() => navigate(`/users/${user.id}`)}
                    >
                      {user.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{user.email}</td>
                  <td className="px-4 py-3 text-neutral-700">
                    {user.phoneNumber}
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      value={roleChange[user.id] ?? user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      options={roleOptions}
                      disabled={updating && confirmUserId === user.id}
                    />
                  </td>
                  <td className="px-4 py-3">
                    {confirmUserId === user.id && (
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="primary"
                          size="sm"
                          loading={updating}
                          onClick={() => confirmRoleChange(user.id)}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={updating}
                          onClick={() => setConfirmUserId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-neutral-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </Page>
  );
};

export default Users;
