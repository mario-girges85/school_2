import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DataTable,
  Card,
  Select,
  Button,
  Modal,
  Tooltip,
  Alert,
  LoadingSpinner,
} from "../components/ui";
import { USER_TYPES } from "../types";
import { ROUTES } from "../constants";

// Mock users data (replace with API call in real app)
const mockUsers = [
  {
    id: 1,
    name: "Mariam Fady",
    email: "mariam@email.com",
    phone: "01012345678",
    role: "student",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUpeorPvZN_kz2u_YMpnlcw5sdu2OfQKZ8NQ&s",
  },
  {
    id: 2,
    name: "Peter Samy",
    email: "peter@email.com",
    phone: "01087654321",
    role: "teacher",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUpeorPvZN_kz2u_YMpnlcw5sdu2OfQKZ8NQ&s",
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

const roleOptions = Object.values(USER_TYPES).map((role) => ({
  value: role,
  label: role.charAt(0).toUpperCase() + role.slice(1),
}));

const getWhatsappLink = (phone) => {
  // Remove non-digits and add country code if needed
  let clean = phone.replace(/\D/g, "");
  if (clean.length === 11 && clean.startsWith("01")) {
    clean = "2" + clean; // Egypt country code
  }
  return `https://wa.me/${clean}`;
};

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pendingRole, setPendingRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (user, newRole) => {
    setSelectedUser(user);
    setPendingRole(newRole);
    setShowModal(true);
  };

  const confirmRoleChange = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, role: pendingRole } : u
        )
      );
      setShowModal(false);
      setLoading(false);
      setAlert({
        type: "success",
        title: "Role Updated",
        message: `${selectedUser.name}'s role changed to ${pendingRole}`,
      });
      setSelectedUser(null);
      setPendingRole("");
    }, 1000);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setShowDeleteModal(false);
      setLoading(false);
      setAlert({
        type: "success",
        title: "User Deleted",
        message: `${selectedUser.name} has been deleted successfully`,
      });
      setSelectedUser(null);
    }, 1000);
  };

  const handleNameClick = (user) => {
    navigate(`${ROUTES.USER_PROFILE.replace(":id", user.id)}`);
  };

  const columns = [
    {
      key: "image",
      header: "Image",
      render: (value, row) => (
        <img
          src={value || "/default-user.png"}
          alt={row.name}
          className="w-12 h-12 rounded-full object-cover border border-neutral-200 bg-neutral-100"
        />
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (value, row) => (
        <button
          onClick={() => handleNameClick(row)}
          className="text-primary-600 hover:text-primary-800 hover:underline font-medium cursor-pointer"
        >
          {value}
        </button>
      ),
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "phone",
      header: "Phone",
    },
    {
      key: "whatsapp",
      header: "WhatsApp",
      render: (value, row) => (
        <Tooltip content={`Chat with ${row.name} on WhatsApp`}>
          <a
            href={getWhatsappLink(row.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            Open Chat
          </a>
        </Tooltip>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (value, row) => (
        <Select
          value={row.role}
          options={roleOptions}
          onChange={(e) => handleRoleChange(row, e.target.value)}
          className="min-w-[120px]"
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (value, row) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(row)}
          className="text-xs"
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Card title="Users" padding="lg">
      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <DataTable
        data={users}
        columns={columns}
        searchable
        sortable
        pagination
      />
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Role Change"
      >
        <div className="mb-4">
          Are you sure you want to change <b>{selectedUser?.name}</b>'s role to{" "}
          <b>{pendingRole}</b>?
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={confirmRoleChange}
            loading={loading}
          >
            Confirm
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
      >
        <div className="mb-4">
          Are you sure you want to delete <b>{selectedUser?.name}</b>? This
          action cannot be undone.
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} loading={loading}>
            Delete
          </Button>
        </div>
      </Modal>
    </Card>
  );
};

export default Users;
