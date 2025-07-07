import React from "react";
import Button from "../ui/Button";

const ContentCard = ({
  title,
  subtitle,
  children,
  actions,
  className = "",
  hover = true,
  ...props
}) => {
  const baseClasses = "bg-white rounded-lg shadow-lg border border-neutral-200";
  const hoverClasses = hover
    ? "hover:shadow-xl transition-shadow duration-200"
    : "";

  const classes = [baseClasses, hoverClasses, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {(title || subtitle || actions) && (
        <div className="p-6 border-b border-neutral-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {title && (
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-neutral-600">{subtitle}</p>
              )}
            </div>
            {actions && <div className="flex space-x-2 ml-4">{actions}</div>}
          </div>
        </div>
      )}

      <div className="p-6">{children}</div>
    </div>
  );
};

export default ContentCard;
