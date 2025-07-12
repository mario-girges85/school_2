import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import Button from "../components/ui/Button";
import Page from "../components/layout/Page";
import Container from "../components/layout/Container";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Page title="Page Not Found">
      <Container maxWidth="2xl">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="relative">
                <div className="text-9xl font-bold text-neutral-200 select-none">
                  404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-neutral-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33M15 19l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                Page Not Found
              </h1>
              <p className="text-lg text-neutral-600 max-w-md mx-auto">
                Sorry, the page you're looking for doesn't exist or has been
                moved.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                onClick={handleGoHome}
                className="min-w-[140px]"
              >
                Go to Home
              </Button>
              <Button
                variant="outline"
                onClick={handleGoBack}
                className="min-w-[140px]"
              >
                Go Back
              </Button>
            </div>

            {/* Quick Links */}
            <div className="mt-12">
              <h3 className="text-sm font-medium text-neutral-700 mb-4">
                Quick Links
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to={ROUTES.EXAMS}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                >
                  Exams
                </Link>
                <Link
                  to={ROUTES.HYMNS}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                >
                  Hymns
                </Link>
                <Link
                  to="/classes"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                >
                  Classes
                </Link>
                <Link
                  to="/users"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                >
                  Users
                </Link>
                <Link
                  to="/attendance"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                >
                  Attendance
                </Link>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-neutral-600">
                If you believe this is an error, please contact support or check
                the URL for typos.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Page>
  );
};

export default NotFound;
