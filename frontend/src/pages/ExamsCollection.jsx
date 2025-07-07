import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Switch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
      checked ? "bg-green-500" : "bg-gray-300"
    }`}
    aria-pressed={checked}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
        checked ? "translate-x-5" : "translate-x-1"
      }`}
    />
  </button>
);

const ExamsCollection = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock data for demonstration - replace with API call
  const mockExams = [
    {
      id: 1,
      title: "Mathematics Midterm Exam",
      description:
        "Comprehensive test covering algebra, geometry, and calculus concepts from chapters 1-5.",
      duration: 90,
      totalMarks: 100,
      questionCount: 25,
      type: "Midterm",
      createdAt: "2024-01-15T10:30:00Z",
      status: "active",
    },
    {
      id: 2,
      title: "English Literature Quiz",
      description:
        "Quiz on Shakespeare's works and literary analysis techniques.",
      duration: 45,
      totalMarks: 50,
      questionCount: 15,
      type: "Quiz",
      createdAt: "2024-01-14T14:20:00Z",
      status: "active",
    },
    {
      id: 3,
      title: "Science Final Examination",
      description:
        "Final exam covering physics, chemistry, and biology concepts from the entire semester.",
      duration: 120,
      totalMarks: 150,
      questionCount: 40,
      type: "Final",
      createdAt: "2024-01-13T09:15:00Z",
      status: "active",
    },
    {
      id: 4,
      title: "History Chapter Test",
      description: "Test on World War II and its impact on modern society.",
      duration: 60,
      totalMarks: 75,
      questionCount: 20,
      type: "Chapter Test",
      createdAt: "2024-01-12T16:45:00Z",
      status: "draft",
    },
  ];

  useEffect(() => {
    // Simulate API call to fetch exams
    const fetchExams = async () => {
      try {
        setIsLoading(true);
        // Replace with actual API call
        // const response = await fetch('/api/exams');
        // const data = await response.json();

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setExams(mockExams);
        setError(null);
      } catch (err) {
        setError("Failed to load exams. Please try again.");
        console.error("Error fetching exams:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleDeleteExam = async (examId) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        // Replace with actual API call
        // await fetch(`/api/exams/${examId}`, { method: 'DELETE' });

        setExams((prev) => prev.filter((exam) => exam.id !== examId));
      } catch (err) {
        console.error("Error deleting exam:", err);
        alert("Failed to delete exam. Please try again.");
      }
    }
  };

  const handleEditExam = (examId) => {
    // Navigate to edit exam page (you can create this later)
    navigate(`/edit-exam/${examId}`);
  };

  const handleViewExam = (examId) => {
    // Navigate to view exam details page
    navigate(`/exam/${examId}`);
  };

  const handleToggleExamStatus = (examId) => {
    setExams((prev) =>
      prev.map((exam) =>
        exam.id === examId
          ? {
              ...exam,
              status: exam.status === "active" ? "inactive" : "active",
            }
          : exam
      )
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins} minutes`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "final":
        return "bg-red-100 text-red-800";
      case "midterm":
        return "bg-blue-100 text-blue-800";
      case "quiz":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
  };

  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      exam.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading exams...</p>
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
            <img
              src={logo}
              alt="Saint Demiana Deacos School Logo"
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Exams Collection
          </h1>
          <p className="text-neutral-600">Manage and view all created exams</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 max-w-md">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Search Exams
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
                Filter by Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Types</option>
                <option value="quiz">Quiz</option>
                <option value="midterm">Midterm</option>
                <option value="final">Final</option>
                <option value="chapter test">Chapter Test</option>
              </select>
            </div>

            <div className="flex-shrink-0">
              <Link
                to="/add-exam"
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
                Create New Exam
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">
                  Total Exams
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {exams.length}
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
                  Active Exams
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {exams.filter((exam) => exam.status === "active").length}
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
                  {formatDuration(
                    exams.reduce((sum, exam) => sum + exam.duration, 0)
                  )}
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
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">
                  Total Questions
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {exams.reduce((sum, exam) => sum + exam.questionCount, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exams Grid */}
        {filteredExams.length === 0 ? (
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              No exams found
            </h3>
            <p className="text-neutral-600 mb-6">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating your first exam."}
            </p>
            <Link
              to="/add-exam"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
            >
              Create Your First Exam
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-lg shadow-lg border border-neutral-200 hover:shadow-xl transition-shadow duration-200"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-neutral-200">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1 line-clamp-2">
                        {exam.title}
                      </h3>
                      <p className="text-sm text-neutral-600 line-clamp-2">
                        {exam.description}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      <span className="text-xs text-neutral-500 mr-2">
                        {exam.status === "active" ? "Active" : "Inactive"}
                      </span>
                      <Switch
                        checked={exam.status === "active"}
                        onChange={() => handleToggleExamStatus(exam.id)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(
                        exam.type
                      )}`}
                    >
                      {exam.type}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        exam.status
                      )}`}
                    >
                      {exam.status}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-neutral-600">Duration</p>
                      <p className="text-lg font-semibold text-neutral-900">
                        {formatDuration(exam.duration)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-neutral-600">Total Marks</p>
                      <p className="text-lg font-semibold text-neutral-900">
                        {exam.totalMarks}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-neutral-600">Questions</p>
                      <p className="text-lg font-semibold text-neutral-900">
                        {exam.questionCount}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-neutral-600">Created</p>
                      <p className="text-sm font-medium text-neutral-900">
                        {formatDate(exam.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewExam(exam.id)}
                      className="flex-1 bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditExam(exam.id)}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExam(exam.id)}
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

export default ExamsCollection;
