import React from "react";

const Card = ({
  children,
  title,
  subtitle,
  header,
  footer,
  className = "",
  padding = "default",
  shadow = "default",
  ...props
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    default: "shadow",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  const classes = [
    "bg-white rounded-lg border border-neutral-200",
    shadowClasses[shadow],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {/* Custom Header */}
      {header && (
        <div className="px-6 py-4 border-b border-neutral-200">{header}</div>
      )}

      {/* Title and Subtitle */}
      {(title || subtitle) && !header && (
        <div className="px-6 py-4 border-b border-neutral-200">
          {title && (
            <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>
          )}
        </div>
      )}

      {/* Content */}
      <div className={paddingClasses[padding]}>{children}</div>

      {/* Footer */}
      {footer && (
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
