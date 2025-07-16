import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Exams from "./pages/Exams";
import EnrolledExams from "./pages/EnrolledExams";
import TakeExam from "./pages/TakeExam";
import StudentNavbar from "./components/layout/StudentNavbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HymnsLibrary from "./pages/HymnsLibrary";
import HymnDetails from "./pages/HymnDetails";
import PageSection from "./components/ui/PageSection";

const App = () => {
  const [enrolledExams, setEnrolledExams] = useState([]);

  return (
    <Router>
      <StudentNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <PageSection>
              <Dashboard />
            </PageSection>
          }
        />
        <Route
          path="/exams"
          element={
            <PageSection>
              <Exams
                enrolledExams={enrolledExams}
                setEnrolledExams={setEnrolledExams}
              />
            </PageSection>
          }
        />
        <Route
          path="/enrolled"
          element={
            <PageSection>
              <EnrolledExams enrolledExams={enrolledExams} />
            </PageSection>
          }
        />
        <Route
          path="/take/:examId"
          element={
            <PageSection>
              <TakeExam />
            </PageSection>
          }
        />
        <Route
          path="/hymns"
          element={
            <PageSection>
              <HymnsLibrary />
            </PageSection>
          }
        />
        <Route
          path="/hymns/:hymnId"
          element={
            <PageSection>
              <HymnDetails />
            </PageSection>
          }
        />
        <Route
          path="/login"
          element={
            <PageSection>
              <Login />
            </PageSection>
          }
        />
        <Route
          path="/signup"
          element={
            <PageSection>
              <Signup />
            </PageSection>
          }
        />
      </Routes>
    </Router>
  );
};

function Dashboard() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <p className="text-lg text-neutral-600">
        Welcome to your dashboard. Use the navigation to view available exams,
        enrolled exams, and more.
      </p>
    </div>
  );
}

export default App;
