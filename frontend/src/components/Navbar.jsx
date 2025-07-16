import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES, APP_NAME } from "../constants";
import logo from "../assets/logo.png";
import Button from "./ui/Button"; // Assuming you have a Button component

// --- Sub-components ---

const NavBrand = () => (
  <Link to={ROUTES.HOME} className="flex items-center">
    <img src={logo} alt="Logo" className="h-8 w-auto mr-3" />
    <span className="text-xl font-bold text-neutral-900">{APP_NAME}</span>
  </Link>
);

const DesktopNavLinks = ({ navigationItems }) => (
  <div className="hidden md:flex items-center space-x-8">
    {navigationItems.map((item) => (
      <Link
        key={item.name}
        to={item.path}
        className="text-neutral-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
      >
        {item.name}
      </Link>
    ))}
  </div>
);

const AuthButtons = ({ isAuthenticated, user, handleLogout, navigate }) => {
  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-neutral-600">
          Welcome, {user?.name || user?.email}
        </span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.LOGIN)}>
        Login
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={() => navigate(ROUTES.SIGNUP)}
      >
        Sign Up
      </Button>
    </div>
  );
};

const MobileMenuButton = ({ isOpen, toggleMenu }) => (
  <div className="md:hidden">
    <button
      onClick={toggleMenu}
      className="text-neutral-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  </div>
);

const MobileAuthButtons = ({
  isAuthenticated,
  user,
  handleLogout,
  navigate,
  closeMenu,
}) => {
  if (isAuthenticated) {
    return (
      <div className="pt-4 pb-3 border-t border-neutral-200">
        <div className="px-3 py-2 text-sm text-neutral-600">
          Welcome, {user?.name || user?.email}
        </div>
        <button
          onClick={() => {
            handleLogout();
            closeMenu();
          }}
          className="text-neutral-700 hover:text-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="pt-4 pb-3 border-t border-neutral-200">
      <button
        onClick={() => {
          navigate(ROUTES.LOGIN);
          closeMenu();
        }}
        className="text-neutral-700 hover:text-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
      >
        Login
      </button>
      <button
        onClick={() => {
          navigate(ROUTES.SIGNUP);
          closeMenu();
        }}
        className="bg-primary-600 hover:bg-primary-700 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium mt-2"
      >
        Sign Up
      </button>
    </div>
  );
};

const MobileNavPanel = ({
  isOpen,
  navigationItems,
  isAuthenticated,
  user,
  handleLogout,
  navigate,
  closeMenu,
}) => (
  <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-neutral-200">
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="text-neutral-700 hover:text-primary-600 block px-3 py-3 rounded-md text-base font-medium"
          onClick={closeMenu}
        >
          {item.name}
        </Link>
      ))}
      <MobileAuthButtons
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={handleLogout}
        navigate={navigate}
        closeMenu={closeMenu}
      />
    </div>
  </div>
);

// --- Main Navbar Component ---

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { name: "Home", path: ROUTES.HOME },
    { name: "Exams", path: ROUTES.EXAMS },
    { name: "Hymns", path: ROUTES.HYMNS },
    { name: "Classes", path: ROUTES.CLASSES },
    { name: "Users", path: ROUTES.USERS },
    { name: "Attendance", path: ROUTES.ATTENDANCE },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavBrand />
          <DesktopNavLinks navigationItems={navigationItems} />
          <div className="hidden md:flex items-center">
            <AuthButtons
              isAuthenticated={isAuthenticated}
              user={user}
              handleLogout={handleLogout}
              navigate={navigate}
            />
          </div>
          <MobileMenuButton isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </div>
      <MobileNavPanel
        isOpen={isMenuOpen}
        navigationItems={navigationItems}
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={handleLogout}
        navigate={navigate}
        closeMenu={closeMenu}
      />
    </nav>
  );
};

export default Navbar;
