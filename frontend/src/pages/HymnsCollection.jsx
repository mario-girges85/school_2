import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const HymnsCollection = () => {
  const [hymns, setHymns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

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

  const handleDeleteHymn = async (hymnId) => {
    if (window.confirm("Are you sure you want to delete this hymn?")) {
      try {
        setHymns((prev) => prev.filter((hymn) => hymn.id !== hymnId));
      } catch (err) {
        console.error("Error deleting hymn:", err);
        alert("Failed to delete hymn. Please try again.");
      }
    }
  };

  const handleEditHymn = (hymnId) => {
    // Navigate to edit hymn page (you can create this later)
    console.log("Edit hymn:", hymnId);
  };

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
        return "bg-blue-100 text-blue-800";
      case "special occasions":
        return "bg-purple-100 text-purple-800";
      case "biblical":
        return "bg-green-100 text-green-800";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
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
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading hymns collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-md p-6 max-w-md">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 max-w-md">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Search Hymns
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="flex-1 max-w-md">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Filter by Category
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Categories</option>
                <option value="praise">Praise</option>
                <option value="special occasions">Special Occasions</option>
                <option value="biblical">Biblical</option>
              </select>
            </div>

            <div className="flex-shrink-0">
              <Link
                to="/add-hymn"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 inline-flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
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
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">
                  Total Hymns
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {hymns.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
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
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">
                  Active Hymns
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {hymns.filter((hymn) => hymn.status === "active").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
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
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">
                  Categories
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {new Set(hymns.map((hymn) => hymn.category)).size}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
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
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">
                  Total Duration
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {(hymns.reduce((total, hymn) => {
                    const [mins, secs] = (hymn.duration || "0:00")
                      .split(":")
                      .map(Number);
                    return total + (mins * 60 + secs);
                  }, 0) /
                    60) |
                    0}
                  h{" "}
                  {hymns.reduce((total, hymn) => {
                    const [mins, secs] = (hymn.duration || "0:00")
                      .split(":")
                      .map(Number);
                    return total + (mins * 60 + secs);
                  }, 0) % 60}
                  m
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hymns Grid */}
        {filteredHymns.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 border border-neutral-200 text-center">
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
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              No hymns found
            </h3>
            <p className="text-neutral-600 mb-6">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by adding your first hymn."}
            </p>
            <Link
              to="/add-hymn"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
            >
              Add Your First Hymn
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHymns.map((hymn) => (
              <div
                key={hymn.id}
                className="bg-white rounded-lg shadow-lg border border-neutral-200 hover:shadow-xl transition-shadow duration-200"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-neutral-200">
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
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                        hymn.category
                      )}`}
                    >
                      {hymn.category}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {hymn.status}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
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

                  {/* Audio Player */}
                  <div className="mb-4">
                    <audio controls className="w-full">
                      <source src={hymn.audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                  {/* Card Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditHymn(hymn.id)}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteHymn(hymn.id)}
                      className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md text-sm font-medium transition-colors duration-200"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-neutral-600 hover:text-neutral-800 transition-colors duration-200 inline-flex items-center"
          >
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HymnsCollection;
