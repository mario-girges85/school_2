import React from "react";

const StatsCard = ({
  title,
  value,
  icon,
  color = "blue",
  className = "",
  ...props
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
    red: "bg-red-100 text-red-600",
    gray: "bg-neutral-100 text-neutral-600",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 border border-neutral-200 ${className}`}
      {...props}
    >
      <div className="flex items-center">
        {icon && (
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
        <div className={icon ? "ml-4" : ""}>
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="text-2xl font-bold text-neutral-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
