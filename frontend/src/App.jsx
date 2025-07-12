import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ROUTES, APP_NAME } from "./constants";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddExam from "./pages/AddExam";
import ExamsCollection from "./pages/ExamsCollection";
import HymnsCollection from "./pages/HymnsCollection";
import AddHymn from "./pages/AddHymn";
import Users from "./pages/Users";
import Page from "./components/layout/Page";
import Container from "./components/layout/Container";
import Classes from "./pages/Classes";
import CreateClass from "./pages/CreateClass";
import ClassDetails from "./pages/ClassDetails";
import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
import ExamCorrection from "./pages/ExamCorrection";
import NotFound from "./pages/NotFound";

// Home component
const Home = () => {
  return (
    <Page
      title={`Get Started with ${APP_NAME}`}
      subtitle="Create an account or log in to begin your journey."
    >
      <Container maxWidth="4xl">
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto border-l-4 border-accent-500">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
              Get Started
            </h2>
            <p className="text-neutral-600 mb-6">
              Welcome to{" "}
              <span className="font-bold text-primary-600">{APP_NAME}</span>!
              <br />
              Please log in or sign up to access your dashboard, manage classes,
              and more.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 shadow-sm"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 shadow-sm"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Page>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-neutral-50">
          <Navbar />
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<Signup />} />
            <Route path={ROUTES.ADD_EXAM} element={<AddExam />} />
            <Route path={ROUTES.EXAMS} element={<ExamsCollection />} />
            <Route path={ROUTES.HYMNS} element={<HymnsCollection />} />
            <Route path={ROUTES.ADD_HYMN} element={<AddHymn />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<Profile />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/classes/create" element={<CreateClass />} />
            <Route path="/classes/:id" element={<ClassDetails />} />
            <Route path="/classes/:id/attendance" element={<Attendance />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route
              path="/exams/:subject/correction"
              element={<ExamCorrection />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
