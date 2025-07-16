import React from "react";

const EmptyState = ({
  title = "No data found",
  description = "There's nothing to display at the moment.",
  icon,
  action,
  className = "",
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      {icon && (
        <div className="mx-auto h-12 w-12 text-neutral-400 mb-4">{icon}</div>
      )}

      <h3 className="text-lg font-medium text-neutral-900 mb-2">{title}</h3>

      <p className="text-neutral-600 mb-6 max-w-sm mx-auto">{description}</p>

      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
};

export default EmptyState;
