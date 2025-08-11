import React from "react";
import { Link } from "react-router-dom";
import { APP_NAME } from "../../constants";
import logo from "../../assets/logo.png";

const Header = ({ title, subtitle, showLogo = true }) => {
  return (
    <div className="text-center mb-8">
      {showLogo && (
        <div className="flex justify-center mb-4">
          <img src={logo} alt={`${APP_NAME} Logo`} className="h-12 w-auto" />
        </div>
      )}

      {title && (
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">{title}</h1>
      )}

      {subtitle && <p className="text-neutral-600">{subtitle}</p>}
    </div>
  );
};

export default Header;
