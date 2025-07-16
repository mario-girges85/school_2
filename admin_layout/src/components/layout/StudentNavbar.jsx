import React from "react";
import { Link } from "react-router-dom";

const StudentNavbar = () => {
  return (
    <nav className="bg-primary-700 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex gap-6 items-center">
        <Link to="/" className="font-bold text-lg hover:underline">
          Student Dashboard
        </Link>
        <Link to="/" className="hover:underline">
          Available Exams
        </Link>
        <Link to="/enrolled" className="hover:underline">
          My Enrolled Exams
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/signup" className="hover:underline">
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default StudentNavbar;
