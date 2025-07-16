# Student Layout - Project Structure

This project is organized for scalability and maintainability, following modern React best practices.

## Structure

```
src/
  assets/         # Static assets (images, svgs, etc.)
  components/     # Reusable components (Navbar, Login, Signup, etc.)
    ui/           # (optional) Small, generic UI components (Button, Input, etc.)
    layout/       # (optional) Layout components (Navbar, Footer, etc.)
  hooks/          # Custom React hooks
  pages/          # Route-level pages (Exams, EnrolledExams, TakeExam, etc.)
  App.jsx         # Main app component with routes
  main.jsx        # Entry point
  index.css       # Global styles (Tailwind)

public/           # Static public assets
```

## Recommendations

- Place all route-level views in `src/pages`.
- Place all reusable UI and layout components in `src/components` (and subfolders as needed).
- Place custom hooks in `src/hooks`.
- Place static assets in `src/assets`.
- Use context or state management for authentication and user state.
- Keep business logic and UI separated for maintainability.

---

Feel free to expand this structure as your app grows!
