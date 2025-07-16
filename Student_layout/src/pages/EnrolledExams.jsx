import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { FiSearch } from "react-icons/fi";

// Static content for enrolled exams
const staticEnrolledExams = [
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
];

function SearchFilterSection({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
}) {
  return (
    <Card className="mb-8 p-0 shadow-md bg-neutral-50 border border-neutral-200">
      <div className="flex flex-col md:flex-row items-center gap-0">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            <FiSearch size={18} />
          </span>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or description..."
            className="pl-10 rounded-none rounded-l-md border-0 bg-neutral-50 h-12 focus:ring-0 focus:border-primary-600"
            style={{ boxShadow: "none" }}
          />
        </div>
        <div className="w-full md:w-56">
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={[
              { value: "all", label: "All Types" },
              { value: "quiz", label: "Quiz" },
              { value: "midterm", label: "Midterm" },
              { value: "final", label: "Final" },
              { value: "chapter test", label: "Chapter Test" },
            ]}
            className="rounded-none rounded-r-md border-0 bg-neutral-50 h-12 focus:ring-0 focus:border-primary-600"
            style={{ boxShadow: "none" }}
          />
        </div>
      </div>
    </Card>
  );
}

const EnrolledExams = () => {
  const navigate = useNavigate();
  const enrolledExams = staticEnrolledExams;
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const filteredExams = enrolledExams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      exam.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });
  // enrolledExams is now an array of exam objects
  const handleStartExam = (examId) => {
    navigate(`/take/${examId}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">My Enrolled Exams</h1>
        <SearchFilterSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
        />
        {filteredExams.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 border border-neutral-200 text-center">
            <h3 className="text-lg font-medium mb-2">No enrolled exams</h3>
            <p className="mb-6">You have not enrolled in any exams yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <Card key={exam.id} className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{exam.title}</h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    {exam.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="primary">{exam.type}</Badge>
                    <Badge
                      variant={exam.status === "active" ? "success" : "default"}
                    >
                      {exam.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <div>Duration: {exam.duration} min</div>
                    <div>Total Marks: {exam.totalMarks}</div>
                    <div>Questions: {exam.questionCount}</div>
                    <div>
                      Created: {new Date(exam.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => navigate(`/take/${exam.id}?correction=1`)}
                  fullWidth
                >
                  View
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledExams;
