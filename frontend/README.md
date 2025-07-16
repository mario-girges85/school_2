# Deacons School Frontend

A modern React application for managing a Deacons School with comprehensive features for exams, hymns, classes, and user management.

## 🚀 Features

- **Authentication System** - Secure login/signup with protected routes
- **Exam Management** - Create, view, and manage exams with corrections
- **Hymn Collection** - Organize and manage hymns by categories
- **Class Management** - Create classes and track attendance
- **User Management** - Manage user profiles and roles
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Real-time Notifications** - Toast notifications for user feedback
- **Form Validation** - Comprehensive validation with custom hooks
- **Data Tables** - Sortable, searchable, and paginated data display

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Hooks** - Reusable logic for forms, API calls, and more
- **Context API** - State management for auth and notifications

## 📁 Project Structure

```
src/
├── components/
│   ├── cards/           # Card components for content display
│   ├── forms/           # Form-specific components
│   ├── layout/          # Layout components (Header, Container, etc.)
│   ├── ui/              # Reusable UI components
│   └── Navbar.jsx       # Main navigation component
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API and external service integrations
├── styles/              # Global styles and CSS
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and helpers
├── constants/           # Application constants
└── assets/              # Static assets (images, icons)
```

## 🎨 UI Components

### Core Components

- **Button** - Multiple variants (primary, secondary, outline, etc.)
- **FormField** - Form inputs with validation and error handling
- **Card** - Content containers with flexible layouts
- **DataTable** - Sortable, searchable tables with pagination
- **Modal** - Overlay dialogs for forms and confirmations
- **Alert** - Notification messages with different types
- **Badge** - Status indicators and labels
- **LoadingSpinner** - Loading states throughout the app

### Layout Components

- **Container** - Responsive content containers
- **Page** - Page wrapper with title and subtitle
- **ProtectedRoute** - Authentication-based route protection
- **Header** - Page headers with breadcrumbs

### Utility Components

- **EmptyState** - Display when no data is available
- **Tooltip** - Hover information tooltips
- **NotificationContainer** - Toast notification system

## 🔧 Custom Hooks

- **useAuth** - Authentication state management
- **useForm** - Form handling with validation
- **useNotification** - Toast notification management
- **useApi** - API call management with loading states
- **useDebounce** - Debounced function calls
- **useLocalStorage** - Local storage management

## 🎯 Key Features

### Authentication & Authorization

- Protected routes with role-based access
- Automatic redirects for unauthenticated users
- Persistent login state with localStorage

### Form Management

- Comprehensive validation system
- Real-time error feedback
- Custom validation schemas
- Form state management

### Data Management

- Sortable and searchable data tables
- Pagination for large datasets
- Loading states and error handling
- Optimistic updates

### User Experience

- Responsive design for all devices
- Consistent design system
- Accessibility features
- Performance optimizations

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette

- **Primary**: Red (#a71f23) - Main brand color
- **Accent**: Blue (#3b82f6) - Secondary actions
- **Neutral**: Gray scale for text and backgrounds

### Typography

- Clean, readable fonts
- Consistent hierarchy
- Responsive text sizing

### Spacing

- Consistent spacing scale
- Responsive padding and margins
- Grid-based layouts

## 📱 Responsive Design

The application is built with a mobile-first approach:

- Responsive navigation with mobile menu
- Adaptive layouts for different screen sizes
- Touch-friendly interactions
- Optimized for tablets and mobile devices

## 🔒 Security Features

- Protected routes and authentication
- Form validation and sanitization
- Secure API communication
- Role-based access control

## 🚀 Performance Optimizations

- Code splitting and lazy loading
- Optimized bundle size
- Efficient re-renders with React.memo
- Debounced API calls
- Image optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.
