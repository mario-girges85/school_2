import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Page from "../components/layout/Page";
import Container from "../components/layout/Container";

// Assume USER_TYPES is defined elsewhere, e.g., in a types.js file
const USER_TYPES = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
};

const roleOptions = [
  { value: USER_TYPES.STUDENT, label: "Student" },
  { value: USER_TYPES.TEACHER, label: "Teacher" },
  { value: USER_TYPES.ADMIN, label: "Admin" },
];

const mockUsers = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9us0MxB35Wv3z03TJFrxhub-WyxqpBKAsjQ&s",
    name: "Mina Nabil",
    email: "mina@example.com",
    phoneNumber: "+201285948011", // Example: +201234567890
    role: USER_TYPES.ADMIN,
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9us0MxB35Wv3z03TJFrxhub-WyxqpBKAsjQ&s",
    name: "Sarah Adel",
    email: "sarah@example.com",
    phoneNumber: "+201289860653",
    role: USER_TYPES.TEACHER,
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9us0MxB35Wv3z03TJFrxhub-WyxqpBKAsjQ&s",
    name: "George Samir",
    email: "george@example.com",
    phoneNumber: "+201556677889",
    role: USER_TYPES.STUDENT,
  },
];

// --- Utility function to format phone numbers for WhatsApp
const formatPhoneNumberForWhatsApp = (phoneNumber) => {
  // Remove any non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  // WhatsApp links usually work best with country code without leading '+' or '00'
  // For Egypt, this assumes numbers are already in +20XXXXXXXXX format or similar
  if (digitsOnly.startsWith("00")) {
    return digitsOnly.substring(2); // Remove leading "00"
  }
  if (digitsOnly.startsWith("+")) {
    return digitsOnly.substring(1); // Remove leading "+"
  }
  return digitsOnly;
};

// --- Sub-components ---

const UsersPageHeader = () => (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-neutral-900 mb-2">Users</h1>
    <p className="text-neutral-600">Manage all users in the system</p>
  </div>
);

const UserSearchFilter = ({
  searchTerm,
  setSearchTerm,
  filterRole,
  setFilterRole,
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200 mb-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor="search"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Search Users
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <label
          htmlFor="roleFilter"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Filter by Role
        </label>
        <Select
          id="roleFilter"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          options={[{ value: "all", label: "All Roles" }, ...roleOptions]}
        />
      </div>
    </div>
  </div>
);

const UserTableRow = ({
  user,
  roleChange,
  handleRoleChange,
  confirmUserId,
  confirmRoleChange,
  updating,
  navigate,
}) => {
  const isChanging = confirmUserId === user.id;
  const currentRole = roleChange[user.id] ?? user.role;

  const handleWhatsAppClick = () => {
    const formattedPhone = formatPhoneNumberForWhatsApp(user.phoneNumber);
    // Use window.open with the WhatsApp API URL
    window.open(`https://wa.me/${formattedPhone}`, "_blank");
  };

  return (
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
      <td className="px-4 py-3 text-neutral-700">{user.phoneNumber}</td>
      <td className="px-4 py-3">
        <Select
          value={currentRole}
          onChange={(e) => handleRoleChange(user.id, e.target.value)}
          options={roleOptions}
          disabled={updating && isChanging}
        />
      </td>
      <td className="px-4 py-3">
        {isChanging ? (
          <div className="flex items-center space-x-2">
            <Button
              variant="primary"
              size="sm"
              loading={updating && isChanging}
              onClick={() => confirmRoleChange(user.id)}
            >
              Confirm
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={updating && isChanging}
              onClick={() => handleRoleChange(user.id, user.role)} // Revert to original role on cancel
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleWhatsAppClick}
            className="flex items-center gap-1"
          >
            {/* WhatsApp SVG from Simple Icons (https://simpleicons.org/icons/whatsapp.svg) */}
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374A9.86 9.86 0 012.1 12.045c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.995c-.003 5.45-4.437 9.884-9.888 9.884zm8.413-18.297A11.815 11.815 0 0011.988 0C5.373 0 .114 5.259.111 11.74c0 2.07.541 4.084 1.566 5.845L.057 24l6.305-1.654a11.822 11.822 0 005.626 1.432h.005c6.616 0 11.875-5.259 11.878-11.74a11.66 11.66 0 00-3.482-8.434z" />
            </svg>
            WhatsApp
          </Button>
        )}
      </td>
    </tr>
  );
};

const NoUsersRow = ({ colSpan }) => (
  <tr>
    <td colSpan={colSpan} className="text-center py-8 text-neutral-500">
      No users found matching your criteria.
    </td>
  </tr>
);

const UsersTable = ({
  users,
  roleChange,
  handleRoleChange,
  confirmUserId,
  confirmRoleChange,
  updating,
  navigate,
}) => (
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
          <th className="px-4 py-3 text-sm font-semibold text-neutral-700">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <NoUsersRow colSpan={6} />
        ) : (
          users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              roleChange={roleChange}
              handleRoleChange={handleRoleChange}
              confirmUserId={confirmUserId}
              confirmRoleChange={confirmRoleChange}
              updating={updating}
              navigate={navigate}
            />
          ))
        )}
      </tbody>
    </table>
  </div>
);

// --- Main Users Component ---

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [roleChange, setRoleChange] = useState({}); // { userId: newRole }
  const [confirmUserId, setConfirmUserId] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const navigate = useNavigate();

  const handleRoleChange = (userId, newRole) => {
    setRoleChange((prev) => ({ ...prev, [userId]: newRole }));
    setConfirmUserId(userId);
  };

  const confirmRoleChange = async (userId) => {
    setUpdating(true);
    // Simulate API call to update role
    setTimeout(() => {
      setUsers(
        users.map((u) =>
          u.id === userId ? { ...u, role: roleChange[userId] } : u
        )
      );
      setRoleChange((prev) => {
        const newRoleChanges = { ...prev };
        delete newRoleChanges[userId]; // Clear the pending change for this user
        return newRoleChanges;
      });
      setConfirmUserId(null);
      setUpdating(false);
    }, 800); // Simulate network delay
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilterRole = filterRole === "all" || user.role === filterRole;
    return matchesSearchTerm && matchesFilterRole;
  });

  return (
    <Page>
      <Container maxWidth="4xl">
        <UsersPageHeader />
        <UserSearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterRole={filterRole}
          setFilterRole={setFilterRole}
        />
        <UsersTable
          users={filteredUsers} // Pass filtered users to the table
          roleChange={roleChange}
          handleRoleChange={handleRoleChange}
          confirmUserId={confirmUserId}
          confirmRoleChange={confirmRoleChange}
          updating={updating}
          navigate={navigate}
          // WhatsApp icon change: pass a new prop or update icon usage inside UsersTable as needed
          // whatsappIcon={
          //   // Changed to a different icon (e.g., Telegram icon)
          //   <svg
          //     xmlns="http://www.w3.org/2000/svg"
          //     fill="currentColor"
          //     viewBox=" 24"
          //   >
          //     <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.94 7.342-1.43 6.76c-.108.48-.39.6-.792.374l-2.19-1.616-1.057 1.018c-.117.117-.216.216-.444.216l.159-2.254 4.104-3.71c.179-.159-.04-.248-.278-.09l-5.07 3.19-2.183-.682c-.475-.148-.484-.475.099-.7l8.53-3.29c.397-.148.744.09.617.698z" />
          //   </svg>
          // }
        />
      </Container>
    </Page>
  );
};

export default Users;
