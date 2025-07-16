// Application Constants
export const APP_NAME = "Deacons School";
export const APP_DESCRIPTION =
  "Empowering students with excellence in education and faith-based learning";

// Color Palette
export const COLORS = {
  primary: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#a71f23", // Main brand color
    700: "#dc2626",
    800: "#b91c1c",
    900: "#991b1b",
  },
  accent: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
};

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ADD_EXAM: "/add-exam",
  EXAMS: "/exams",
  ADD_HYMN: "/add-hymn",
  HYMNS: "/hymns",
  USERS: "/users",
  USER_PROFILE: "/users/:id",
  CLASSES: "/classes",
  CREATE_CLASS: "/classes/create",
  CLASS_DETAILS: "/classes/:id",
  CLASS_ATTENDANCE: "/classes/:id/attendance",
  ATTENDANCE: "/attendance",
  EXAM_CORRECTION: "/exams/:subject/correction",
  NOT_FOUND: "*",
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
    LOGOUT: "/api/auth/logout",
    PROFILE: "/api/auth/profile",
  },
  EXAMS: {
    LIST: "/api/exams",
    CREATE: "/api/exams",
    UPDATE: "/api/exams/:id",
    DELETE: "/api/exams/:id",
    CORRECTION: "/api/exams/:id/correction",
  },
  HYMNS: {
    LIST: "/api/hymns",
    CREATE: "/api/hymns",
    UPDATE: "/api/hymns/:id",
    DELETE: "/api/hymns/:id",
  },
  USERS: {
    LIST: "/api/users",
    CREATE: "/api/users",
    UPDATE: "/api/users/:id",
    DELETE: "/api/users/:id",
    PROFILE: "/api/users/:id/profile",
  },
  CLASSES: {
    LIST: "/api/classes",
    CREATE: "/api/classes",
    UPDATE: "/api/classes/:id",
    DELETE: "/api/classes/:id",
    STUDENTS: "/api/classes/:id/students",
    TEACHERS: "/api/classes/:id/teachers",
  },
  ATTENDANCE: {
    LIST: "/api/attendance",
    CREATE: "/api/attendance",
    UPDATE: "/api/attendance/:id",
    DELETE: "/api/attendance/:id",
    CLASS: "/api/attendance/class/:classId",
    USER: "/api/attendance/user/:userId",
  },
};

// Form Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_AUDIO_TYPES: ["audio/mpeg", "audio/wav", "audio/m4a", "audio/mp3"],
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_DATA: "user_data",
  THEME: "theme",
  LANGUAGE: "language",
};

// Exam Categories
export const EXAM_CATEGORIES = [
  "Quiz",
  "Midterm",
  "Final",
  "Chapter Test",
  "Assignment",
  "Project",
];

// Hymn Categories
export const HYMN_CATEGORIES = [
  "Praise",
  "Special Occasions",
  "Biblical",
  "Liturgical",
  "Seasonal",
  "Traditional",
];

// Question Types
export const QUESTION_TYPES = [
  "multiple_choice",
  "true_false",
  "written",
  "matching",
  "fill_blank",
];

// Status Options
export const STATUS_OPTIONS = ["active", "draft", "archived", "pending"];

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  FILE_TOO_LARGE: "File size exceeds the maximum limit.",
  INVALID_FILE_TYPE: "Invalid file type. Please select a valid file.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  SIGNUP_SUCCESS: "Account created successfully!",
  EXAM_CREATED: "Exam created successfully!",
  EXAM_UPDATED: "Exam updated successfully!",
  EXAM_DELETED: "Exam deleted successfully!",
  HYMN_CREATED: "Hymn added successfully!",
  HYMN_UPDATED: "Hymn updated successfully!",
  HYMN_DELETED: "Hymn deleted successfully!",
  PROFILE_UPDATED: "Profile updated successfully!",
  PASSWORD_CHANGED: "Password changed successfully!",
};
