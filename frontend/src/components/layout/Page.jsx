import React from "react";
import Header from "./Header";
import Container from "./Container";

const Page = ({
  children,
  title,
  subtitle,
  showLogo = true,
  maxWidth = "7xl",
  className = "",
  ...props
}) => {
  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <Container maxWidth={maxWidth} className={className} {...props}>
        {(title || subtitle || showLogo) && (
          <Header title={title} subtitle={subtitle} showLogo={showLogo} />
        )}
        {children}
      </Container>
    </div>
  );
};

export default Page;
