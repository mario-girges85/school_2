import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  Card,
  Button,
  Badge,
  Alert,
  LoadingSpinner,
  Modal,
  Input,
  Select,
  EmptyState,
} from "../components/ui";

// --- Utility Functions ---
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getCategoryColor = (category) => {
  switch (category.toLowerCase()) {
    case "praise":
      return "primary";
    case "special occasions":
      return "info";
    case "biblical":
      return "success";
    default:
      return "default";
  }
};

// --- Sub-components ---

const AppHeader = () => (
  <div className="text-center mb-8">
    <div className="flex justify-center mb-4">
      <img src={logo} alt="Deacons School Logo" className="h-12 w-auto" />
    </div>
    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
      Hymns Collection
    </h1>
    <p className="text-neutral-600">
      Browse and manage Coptic hymns with audio and lyrics
    </p>
  </div>
);

const LoadingState = () => (
  <LoadingSpinner fullScreen text="Loading hymns collection..." />
);

const ErrorState = ({ error }) => (
  <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
    <Card className="max-w-md w-full text-center bg-red-50 border-red-200">
      <Alert type="error" title="Error" message={error} />
      <Button
        variant="primary"
        className="mt-4"
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button>
    </Card>
  </div>
);

const HymnsControls = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
}) => (
  <Card className="mb-8" padding="default" shadow="lg">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <Input
        label="Search Hymns"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title or description..."
        className="max-w-md"
      />
      <Select
        label="Filter by Category"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        options={[
          { value: "all", label: "All Categories" },
          { value: "praise", label: "Praise" },
          { value: "special occasions", label: "Special Occasions" },
          { value: "biblical", label: "Biblical" },
        ]}
        className="max-w-md"
      />
      <Link to="/add-hymn">
        <Button
          variant="primary"
          className="w-full md:w-auto flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New Hymn
        </Button>
      </Link>
    </div>
  </Card>
);

const StatCard = ({ icon, title, value, bgColor }) => (
  <Card className="p-0" padding="lg" shadow="lg">
    <div className="flex items-center">
      <div className="p-3 rounded-full mr-4" style={{ background: bgColor }}>
        {icon}
      </div>
      <div>
        <div className="text-sm text-neutral-600">{title}</div>
        <div className="text-2xl font-bold text-neutral-900">{value}</div>
      </div>
    </div>
  </Card>
);

const HymnsStats = ({ hymns }) => {
  const totalHymns = hymns.length;
  const activeHymns = hymns.filter((hymn) => hymn.status === "active").length;
  const uniqueCategories = new Set(hymns.map((hymn) => hymn.category)).size;
  const totalDurationSeconds = hymns.reduce((total, hymn) => {
    const [mins, secs] = (hymn.duration || "0:00").split(":").map(Number);
    return total + (mins * 60 + secs);
  }, 0);
  const totalDurationFormatted = `${Math.floor(
    totalDurationSeconds / 3600
  )}h ${Math.floor((totalDurationSeconds % 3600) / 60)}m ${
    totalDurationSeconds % 60
  }s`;
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Hymns"
        value={totalHymns}
        bgColor="#DBEAFE"
        icon={
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
        }
      />
      <StatCard
        title="Active Hymns"
        value={activeHymns}
        bgColor="#DCFCE7"
        icon={
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
      />
      <StatCard
        title="Categories"
        value={uniqueCategories}
        bgColor="#EDE9FE"
        icon={
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
            />
          </svg>
        }
      />
      <StatCard
        title="Total Duration"
        value={totalDurationFormatted}
        bgColor="#FEF9C3"
        icon={
          <svg
            className="w-6 h-6 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
      />
    </div>
  );
};

const NoHymnsFound = ({ searchTerm, filterType }) => (
  <EmptyState
    title="No hymns found"
    description={
      searchTerm || filterType !== "all"
        ? "Try adjusting your search or filter criteria."
        : "Get started by adding your first hymn."
    }
    icon={
      <svg
        className="w-16 h-16 text-neutral-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      </svg>
    }
    action={
      <Link to="/add-hymn">
        <Button variant="primary">Add Your First Hymn</Button>
      </Link>
    }
    className="bg-white rounded-lg shadow-lg border border-neutral-200"
  />
);

const HymnCard = ({ hymn, onEdit, onDelete }) => (
  <Card
    className="hover:shadow-xl transition-shadow duration-200"
    padding="default"
    shadow="lg"
  >
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-neutral-900 mb-1 line-clamp-2">
          {hymn.title}
        </h3>
        <p className="text-sm text-neutral-600 line-clamp-2">
          {hymn.description}
        </p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-3">
      <Badge variant={getCategoryColor(hymn.category)} className="capitalize">
        {hymn.category}
      </Badge>
      <Badge
        variant={hymn.status === "active" ? "success" : "default"}
        className="capitalize"
      >
        {hymn.status}
      </Badge>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="text-center">
        <p className="text-sm text-neutral-600">Duration</p>
        <p className="text-lg font-semibold text-neutral-900">
          {hymn.duration}
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm text-neutral-600">Added</p>
        <p className="text-sm font-medium text-neutral-900">
          {formatDate(hymn.createdAt)}
        </p>
      </div>
    </div>
    <div className="mb-4">
      <audio controls className="w-full">
        <source src={hymn.audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
    <div className="flex space-x-2">
      <Button
        variant="primary"
        size="sm"
        fullWidth
        onClick={() => onEdit(hymn.id)}
      >
        Edit
      </Button>
      <Button variant="danger" size="sm" onClick={() => onDelete(hymn.id)}>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </Button>
    </div>
  </Card>
);

const BackHomeLink = () => (
  <div className="mt-8 text-center">
    <Link to="/">
      <Button variant="outline" className="inline-flex items-center">
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </Button>
    </Link>
  </div>
);

// --- Main HymnsCollection Component ---

const HymnsCollection = () => {
  const [hymns, setHymns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [deleteModal, setDeleteModal] = useState({ open: false, hymnId: null });
  const [successMsg, setSuccessMsg] = useState("");

  // Mock data for demonstration
  const mockHymns = [
    {
      id: 1,
      title: "Tasbeha Lil Ab",
      description: "Traditional Coptic hymn praising the Father",
      category: "Praise",
      audioUrl: "/audio/tasbeha-lil-ab.mp3",
      arabicLyrics: "تسبحة للأب القدوس...",
      copticLyrics: "Ϯⲥⲃⲏϩⲁ ⲛⲉⲙ ⲡⲓⲱⲧ ⲉⲧⲟⲩⲁⲃ...",
      arabicCopticLyrics: "تسبحة للأب القدوس Ϯⲥⲃⲏϩⲁ ⲛⲉⲙ ⲡⲓⲱⲧ ⲉⲧⲟⲩⲁⲃ...",
      duration: "3:45",
      createdAt: "2024-01-15T10:30:00Z",
      status: "active",
    },
    {
      id: 2,
      title: "Efnoti Nai Nan",
      description: "Beautiful Coptic hymn for special occasions",
      category: "Special Occasions",
      audioUrl: "/audio/efnoti-nai-nan.mp3",
      arabicLyrics: "أفنوتي ناي نان...",
      copticLyrics: "Ⲉⲃⲛⲟⲧⲓ ⲛⲁⲓ ⲛⲁⲛ...",
      arabicCopticLyrics: "أفنوتي ناي نان Ⲉⲃⲛⲟⲧⲓ ⲛⲁⲓ ⲛⲁⲛ...",
      duration: "4:20",
      createdAt: "2024-01-14T14:20:00Z",
      status: "active",
    },
    {
      id: 3,
      title: "Adam W Hawwa",
      description: "Hymn about Adam and Eve",
      category: "Biblical",
      audioUrl: "/audio/adam-w-hawwa.mp3",
      arabicLyrics: "آدم وحواء في الجنة...",
      copticLyrics: "Ⲁⲇⲁⲙ ⲛⲉⲙ ϩⲁⲩⲁ ⲛⲉⲙ ⲡⲓⲡⲁⲣⲁⲇⲉⲓⲥⲟⲥ...",
      arabicCopticLyrics:
        "آدم وحواء في الجنة Ⲁⲇⲁⲙ ⲛⲉⲙ ϩⲁⲩⲁ ⲛⲉⲙ ⲡⲓⲡⲁⲣⲁⲇⲉⲓⲥⲟⲥ...",
      duration: "5:15",
      createdAt: "2024-01-13T09:15:00Z",
      status: "active",
    },
  ];

  useEffect(() => {
    const fetchHymns = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setHymns(mockHymns);
        setError(null);
      } catch (err) {
        setError("Failed to load hymns. Please try again.");
        console.error("Error fetching hymns:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHymns();
  }, []);

  const handleDeleteHymn = (hymnId) => {
    setDeleteModal({ open: true, hymnId });
  };

  const confirmDelete = () => {
    setHymns((prev) => prev.filter((hymn) => hymn.id !== deleteModal.hymnId));
    setDeleteModal({ open: false, hymnId: null });
    setSuccessMsg("Hymn deleted successfully.");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  const handleEditHymn = (hymnId) => {
    // Navigate to edit hymn page (you can create this later)
    console.log("Edit hymn:", hymnId);
  };

  const filteredHymns = hymns.filter((hymn) => {
    const matchesSearch =
      hymn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hymn.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      hymn.category.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AppHeader />
        {successMsg && (
          <div className="mb-4">
            <Alert type="success" title="Success" message={successMsg} />
          </div>
        )}
        <HymnsControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
        />
        <HymnsStats hymns={hymns} />
        {filteredHymns.length === 0 ? (
          <NoHymnsFound searchTerm={searchTerm} filterType={filterType} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHymns.map((hymn) => (
              <HymnCard
                key={hymn.id}
                hymn={hymn}
                onEdit={handleEditHymn}
                onDelete={handleDeleteHymn}
              />
            ))}
          </div>
        )}
        <BackHomeLink />
        <Modal
          isOpen={deleteModal.open}
          onClose={() => setDeleteModal({ open: false, hymnId: null })}
          title="Delete Hymn"
        >
          <p>Are you sure you want to delete this hymn?</p>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ open: false, hymnId: null })}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default HymnsCollection;
