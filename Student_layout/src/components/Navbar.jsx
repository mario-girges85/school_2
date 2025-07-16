import React from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../constants/colors";

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: COLORS.primary[700],
        color: COLORS.neutral[50],
      }}
      className="px-6 py-4 flex items-center justify-between"
    >
      <div className="flex gap-6 items-center">
        <Link
          to="/"
          className="font-bold text-lg hover:underline"
          style={{ color: COLORS.neutral[50] }}
        >
          Student Dashboard
        </Link>
        <Link
          to="/"
          className="hover:underline"
          style={{ color: COLORS.neutral[50] }}
        >
          Available Exams
        </Link>
        <Link
          to="/enrolled"
          className="hover:underline"
          style={{ color: COLORS.neutral[50] }}
        >
          My Enrolled Exams
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link
          to="/login"
          className="hover:underline"
          style={{ color: COLORS.neutral[50] }}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="hover:underline"
          style={{ color: COLORS.neutral[50] }}
        >
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
