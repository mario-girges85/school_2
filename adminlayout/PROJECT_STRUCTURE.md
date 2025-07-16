# Deacons School - Project Structure

## Overview

This project follows a modern, scalable React application structure with best practices for maintainability, reusability, and performance.

## Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Input, etc.)
│   ├── layout/          # Layout components (Header, Container, Page)
│   ├── cards/           # Card-based components
│   ├── forms/           # Form components
│   └── index.js         # Component exports
├── pages/               # Page components (routes)
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── constants/           # Application constants
├── types/               # Type definitions
├── services/            # API and external services
├── context/             # React Context providers
├── assets/              # Static assets (images, icons)
└── styles/              # Global styles and CSS
```

## Component Architecture

### UI Components (`src/components/ui/`)

Basic, reusable UI components that follow a consistent design system:

- **Button**: Multiple variants (primary, secondary, outline, danger, success, ghost)
- **Input**: Form inputs with validation states
- **Select**: Dropdown select components
- **Textarea**: Multi-line text inputs with RTL support

### Layout Components (`src/components/layout/`)

Components that provide structure and layout:

- **Header**: Page headers with logo and titles
- **Container**: Responsive container with max-width options
- **Page**: Complete page wrapper with consistent styling

### Card Components (`src/components/cards/`)

Content display components:

- **StatsCard**: For displaying statistics with icons
- **ContentCard**: For displaying content with actions

### Form Components (`src/components/forms/`)

Complete form implementations:

- **LoginForm**: Authentication form with validation

## Services Layer

### API Service (`src/services/api.js`)

Centralized HTTP client with:

- Automatic authentication header injection
- Error handling
- Request/response interceptors
- File upload support

### Auth Service (`src/services/authService.js`)

Authentication management:

- Login/Signup
- Token management
- User profile updates
- Password reset functionality

## State Management

### Context (`src/context/`)

React Context for global state:

- **AuthContext**: User authentication state and methods

### Custom Hooks (`src/hooks/`)

Reusable logic:

- **useLocalStorage**: Persistent state with localStorage
- **useDebounce**: Debounced values for search/filtering
- **useApi**: API call management with loading/error states

## Utilities (`src/utils/`)

Helper functions organized by category:

- **Validation**: Form validation functions
- **Formatting**: Date, currency, file size formatting
- **String**: Text manipulation utilities
- **Array/Object**: Data manipulation helpers
- **Storage**: localStorage utilities
- **URL**: Query parameter management
- **Performance**: Debounce, throttle, performance measurement
- **Color**: Color manipulation utilities
- **Audio**: Audio file utilities
- **Error Handling**: Centralized error handling

## Constants (`src/constants/`)

Application-wide constants:

- **Colors**: Brand color palette
- **Routes**: Application routes
- **API Endpoints**: Backend API URLs
- **Validation Rules**: Form validation constants
- **File Upload**: File type and size limits
- **Messages**: Success and error messages

## Types (`src/types/`)

Type definitions for better code documentation:

- **User Types**: User roles and permissions
- **Form Types**: Form field types
- **API Types**: Response and request types
- **Component Types**: Component prop types

## Best Practices

### 1. Component Organization

- **Single Responsibility**: Each component has one clear purpose
- **Composition**: Use composition over inheritance
- **Props Interface**: Clear prop definitions with defaults
- **Error Boundaries**: Handle errors gracefully

### 2. State Management

- **Local State**: Use useState for component-specific state
- **Context**: Use Context for global state (auth, theme, etc.)
- **Custom Hooks**: Extract reusable logic into custom hooks

### 3. Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Consistent Design**: Follow design system guidelines
- **Responsive**: Mobile-first responsive design
- **Accessibility**: ARIA labels and keyboard navigation

### 4. Performance

- **Code Splitting**: Lazy load routes and components
- **Memoization**: Use React.memo and useMemo where appropriate
- **Debouncing**: Debounce search and filter inputs
- **Optimization**: Optimize images and assets

### 5. Error Handling

- **Try-Catch**: Wrap async operations in try-catch
- **User Feedback**: Show meaningful error messages
- **Fallbacks**: Provide fallback UI for errors
- **Logging**: Log errors for debugging

### 6. Code Quality

- **ESLint**: Code linting and formatting
- **Consistent Naming**: Follow naming conventions
- **Comments**: Document complex logic
- **Testing**: Write unit tests for utilities and components

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.jsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useLocalStorage.js`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)
- **Types**: PascalCase (e.g., `UserTypes`)

## Import/Export Patterns

### Barrel Exports

Use index files for clean imports:

```javascript
// Instead of
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

// Use
import { Button, Input } from "./components";
```

### Named Exports

Prefer named exports for utilities and constants:

```javascript
export const formatDate = (date) => {
  /* ... */
};
export const API_ENDPOINTS = {
  /* ... */
};
```

## Environment Configuration

Create `.env` files for environment-specific configuration:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Deacons School
```

## Development Workflow

1. **Feature Development**: Create feature branches
2. **Component Development**: Start with UI components, then compose pages
3. **Testing**: Write tests for utilities and critical components
4. **Code Review**: Review for consistency and best practices
5. **Documentation**: Update documentation for new features

## Deployment

The project is configured for:

- **Vite**: Fast development and build tool
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first styling
- **ESLint**: Code quality enforcement

## Future Enhancements

- **TypeScript**: Add TypeScript for better type safety
- **Testing**: Add Jest and React Testing Library
- **Storybook**: Component documentation and testing
- **PWA**: Progressive Web App features
- **Internationalization**: Multi-language support
- **Theme System**: Dark/light mode support
