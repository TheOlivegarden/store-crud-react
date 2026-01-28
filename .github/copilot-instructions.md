# AI Coding Agent Instructions - CRUD Project

## Project Overview
This is a **React 19 + Vite** CRUD application in early development. The project uses modern ESM modules with fast refresh capabilities. The codebase is currently a template structure with minimal implementation - all major directories (`components/`, `pages/`, `services/`, `hooks/`) are empty placeholders.

**Key Stack:**
- React 19.2.0 with React DOM
- Vite 7.2.4 (build tool, dev server)
- ES2020+ syntax with strict JSX parsing
- ESLint with React hooks & refresh plugins

---

## Architecture & Structure

### Directory Purpose
- **`src/`** - Main application source
  - **`App.jsx`** - Root component (currently a counter demo)
  - **`main.jsx`** - React entry point with StrictMode enabled
  - **`components/`** - Reusable UI components (empty - design your structure)
  - **`pages/`** - Page-level components for routing (empty - not yet configured)
  - **`services/`** - API calls, data fetching, external integrations (empty)
  - **`hooks/`** - Custom React hooks (empty)
  - **`styles/`** - Global/shared CSS (empty)
  - **`assets/`** - Static images (only react.svg included)
- **`public/`** - Static files served at root
- **`dist/`** - Build output (ignored by ESLint)
- **`.github/`** - GitHub-specific configs (this file location)

### Data Flow Strategy
Since `services/` is empty, establish one of these patterns when implementing API integration:
1. **Service Layer Pattern**: Create `services/api.js` with fetch/axios wrapper + domain-specific services
2. **Hook Pattern**: Custom hooks in `hooks/` that handle data fetching (e.g., `useFetchUsers()`)
3. **Hybrid**: Services for API logic, hooks for state management

---

## Development Workflows

### Local Development
```bash
npm run dev          # Start Vite dev server (HMR enabled)
npm run build        # Production build to dist/
npm run preview      # Preview built app locally
npm run lint         # Check ESLint rules
```

**HMR & Testing**: Changes to `.jsx` files auto-refresh. The app is set to StrictMode, so expect double-mounting in dev.

### Building & Deployment
- Vite bundles to `dist/` directory
- No TypeScript configured (pure JS/JSX)
- Environment variables: Create `.env.local` for secrets (not tracked)

---

## Code Patterns & Conventions

### React Component Style
- **Functional components only** (already enforced by hooks)
- Files: One component per file, use `.jsx` extension
- Naming: PascalCase for component files (e.g., `UserCard.jsx`)

```jsx
// Example pattern - establish in components/
function MyComponent({ propName }) {
  const [state, setState] = useState(null)
  return <div>{state}</div>
}
export default MyComponent
```

### ESLint Rules to Honor
- **Unused vars**: Pattern `^[A-Z_]` ignored (constants, exports) - adjust if defining constants
- **React Hooks**: All rules enforced via `eslint-plugin-react-hooks`
  - Dependencies in `useEffect`, `useCallback` must be complete
  - Rules of Hooks strictly applied
- **React Refresh**: Don't export non-component functions from same file as default export (breaking HMR)

### CSS & Styling
- Global styles in `src/index.css` (already imported)
- Component-scoped CSS in `ComponentName.css` modules (not yet configured - add if needed)
- Current `App.css` is a demo, replace with real styles

---

## Integration Points & Dependencies

### External APIs
- **Not yet configured** - Create centralized fetch wrapper in `services/api.js`
- Plan: CORS handling, auth token management, error handling

### State Management
- **React Context**: Sufficient if app stays simple
- **Redux/Zustand**: Add if app grows beyond a few pages

### No Backend
- App is frontend-only; backend API must be external
- Use `fetch()` or install axios for HTTP calls

---

## Quick Start for Contributors
1. **First task**: Don't modify root App.jsx yet - work in empty directories
2. **Create a feature**: Pick a domain (e.g., "Users"), create:
   - `pages/UsersPage.jsx` - Main page component
   - `components/UserCard.jsx` - Reusable card
   - `services/userService.js` - API calls
   - `hooks/useFetchUsers.js` - Data fetching logic
3. **Test locally**: `npm run dev`, verify HMR works
4. **Lint before commit**: `npm run lint` must pass

---

## Known Limitations & TODOs
- No routing configured (install React Router when needed)
- No testing setup (Vitest recommended for Vite)
- No TypeScript (migrate if type safety critical)
- Styling not modular (no CSS-in-JS or Tailwind)
- Services layer not started (design API patterns first)

---

## References
- [Vite React Docs](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [React 19 Guide](https://react.dev)
- [Vite Fast Refresh](https://vitejs.dev/guide/features.html#fast-refresh)
