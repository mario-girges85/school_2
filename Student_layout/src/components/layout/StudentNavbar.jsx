import React, { useState } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../../constants/colors";
import logo from "../../assets/logo.png";

const linkBase = {
  color: COLORS.neutral[700],
  transition: "color 0.2s",
  textDecoration: "none",
};
const linkHover = {
  color: COLORS.primary[700],
};

const StudentNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState("");

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/exams", label: "Available Exams" },
    { to: "/enrolled", label: "My Enrolled Exams" },
    { to: "/hymns", label: "Hymns Library" },
  ];

  return (
    <nav
      style={{
        backgroundColor: COLORS.neutral[0] || "#fff",
        color: COLORS.neutral[900],
      }}
      className="px-4 md:px-16 py-3 flex justify-between items-center shadow-sm relative"
    >
      {/* Logo and App Name */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Deacons School Logo" className="h-10 w-auto" />
        <span
          className="font-bold text-2xl"
          style={{ color: COLORS.neutral[900] }}
        >
          Deacons School
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex flex-1 justify-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            style={
              hovered === link.label ? { ...linkBase, ...linkHover } : linkBase
            }
            className="text-base font-medium"
            onMouseEnter={() => setHovered(link.label)}
            onMouseLeave={() => setHovered("")}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Desktop Auth */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/login"
          style={hovered === "Login" ? { ...linkBase, ...linkHover } : linkBase}
          className="text-base font-medium"
          onMouseEnter={() => setHovered("Login")}
          onMouseLeave={() => setHovered("")}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="text-base font-medium px-5 py-2 rounded-md"
          style={{
            backgroundColor: COLORS.primary[700],
            color: COLORS.neutral[50],
          }}
        >
          Sign Up
        </Link>
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden flex items-center px-2 py-1"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md z-50 flex flex-col items-center py-4 gap-4 md:hidden animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              style={linkBase}
              className="text-base font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            style={linkBase}
            className="text-base font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-base font-medium px-5 py-2 rounded-md"
            style={{
              backgroundColor: COLORS.primary[700],
              color: COLORS.neutral[50],
            }}
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default StudentNavbar;
