# Project Structure Guide

This document explains the organization and purpose of each directory in the project.

## Directory Structure

```
management-dashboard/
├── public/                 # Static files served directly
│   └── vite.svg           # Favicon and static assets
│
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── layout/       # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── common/       # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Loader.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── dashboard/    # Dashboard-specific components
│   │       ├── StatCard.tsx
│   │       ├── Chart.tsx
│   │       ├── DataTable.tsx
│   │       ├── RecentActivity.tsx
│   │       └── index.ts
│   │
│   ├── pages/            # Page components (routes)
│   │   ├── Dashboard.tsx
│   │   ├── Analytics.tsx
│   │   ├── Users.tsx
│   │   ├── Settings.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   └── index.ts
│   │
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── index.ts
│   │
│   ├── utils/            # Utility functions
│   │   ├── formatters.ts   # Number, date, etc. formatters
│   │   ├── validators.ts   # Form validation functions
│   │   ├── api.ts          # API client utilities
│   │   └── constants.ts    # App constants
│   │
│   ├── types/            # TypeScript type definitions
│   │   ├── user.ts       # User-related types
│   │   ├── dashboard.ts  # Dashboard data types
│   │   ├── api.ts        # API response types
│   │   └── index.ts
│   │
│   ├── assets/           # Static assets imported in code
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   ├── index.css         # Global styles
│   └── vite-env.d.ts     # Vite type declarations
│
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # TypeScript app configuration
├── tsconfig.node.json    # TypeScript node configuration
├── vite.config.ts        # Vite configuration
├── README.md             # Project documentation
└── STRUCTURE.md          # This file
```

## Component Organization

### Layout Components (`src/components/layout/`)
Components that define the overall structure of pages:
- **Sidebar** - Left/right navigation panel
- **Navbar** - Top navigation bar
- **Footer** - Page footer
- **Layout wrapper** - Container that combines layout components

### Common Components (`src/components/common/`)
Reusable UI components used throughout the app:
- **Button** - Various button styles and states
- **Input** - Form input fields
- **Modal** - Dialog/popup overlays
- **Card** - Container with shadow and rounded corners
- **Badge** - Status indicators
- **Loader** - Loading spinners and skeletons

### Dashboard Components (`src/components/dashboard/`)
Components specific to dashboard functionality:
- **StatCard** - Display key metrics
- **Chart** - Data visualization
- **DataTable** - Sortable, filterable tables
- **RecentActivity** - Activity feed
- **QuickActions** - Action shortcuts

## Pages (`src/pages/`)

Each page represents a route in the application:
- **Dashboard** - Main dashboard view
- **Analytics** - Reports and analytics
- **Users** - User management
- **Settings** - Application settings
- **Login** - Authentication page
- **NotFound** - 404 error page

## Custom Hooks (`src/hooks/`)

Reusable React hooks for common functionality:
- **useAuth** - Authentication state and methods
- **useLocalStorage** - Persist data in localStorage
- **useDebounce** - Debounce values
- **useFetch** - API data fetching
- **useMediaQuery** - Responsive design hooks

## Utilities (`src/utils/`)

Pure functions and helpers:
- **formatters.ts** - Format numbers, dates, currencies
- **validators.ts** - Form validation rules
- **api.ts** - API client and interceptors
- **constants.ts** - App-wide constants

## Types (`src/types/`)

TypeScript interfaces and types:
- **user.ts** - User, Profile, UserRole types
- **dashboard.ts** - Dashboard data structures
- **api.ts** - API request/response types
- **common.ts** - Shared/generic types

## Best Practices

### Component Files
```typescript
// Button.tsx
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = ({ variant = 'primary', size = 'md', ...props }: ButtonProps) => {
  // Component implementation
}
```

### Index Files
```typescript
// components/common/index.ts
export { Button } from './Button'
export { Input } from './Input'
export { Modal } from './Modal'
export type { ButtonProps } from './Button'
```

### Type Definitions
```typescript
// types/user.ts
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export type UserRole = 'admin' | 'user' | 'guest'
```

### Custom Hooks
```typescript
// hooks/useAuth.ts
export const useAuth = () => {
  // Hook implementation
  return {
    user,
    login,
    logout,
    isAuthenticated,
  }
}
```

## Naming Conventions

### Components
- PascalCase: `StatCard.tsx`, `UserProfile.tsx`
- Export named components: `export const StatCard = () => {}`

### Hooks
- camelCase with 'use' prefix: `useAuth.ts`, `useLocalStorage.ts`
- Export named function: `export const useAuth = () => {}`

### Utils
- camelCase: `formatters.ts`, `validators.ts`
- Export named functions: `export const formatCurrency = () => {}`

### Types
- PascalCase for interfaces/types: `User`, `DashboardData`
- camelCase for files: `user.ts`, `dashboard.ts`

## Import Organization

Order imports in this sequence:
1. External libraries (react, react-router, etc.)
2. Internal components
3. Internal hooks
4. Internal utils
5. Internal types
6. Styles

```typescript
// External
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Components
import { Button } from '@/components/common'
import { StatCard } from '@/components/dashboard'

// Hooks
import { useAuth } from '@/hooks'

// Utils
import { formatCurrency } from '@/utils/formatters'

// Types
import type { User } from '@/types'
```

## Adding New Features

### 1. Create Component
```bash
# Create component file
touch src/components/dashboard/NewComponent.tsx

# Add to index
echo "export { NewComponent } from './NewComponent'" >> src/components/dashboard/index.ts
```

### 2. Create Page
```bash
# Create page file
touch src/pages/NewPage.tsx

# Add route in App.tsx
```

### 3. Create Hook
```bash
# Create hook file
touch src/hooks/useNewHook.ts

# Add to index
echo "export { useNewHook } from './useNewHook'" >> src/hooks/index.ts
```

## State Management

### Local State
Use React hooks for component-local state:
```typescript
const [count, setCount] = useState(0)
```

### Global State (Optional)
Consider adding:
- **Zustand** - Lightweight state management
- **Redux Toolkit** - Complex state management
- **React Query** - Server state management

## Routing Example

```typescript
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard, Analytics, Users, Settings, Login, NotFound } from './pages'
import { Layout } from './components/layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
```

## Environment Variables

Access environment variables with `import.meta.env`:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
const isDev = import.meta.env.DEV
const isProd = import.meta.env.PROD
```

## Building for Production

1. Build: `npm run build`
2. Preview: `npm run preview`
3. Deploy the `dist/` folder

---

This structure is designed to be scalable and maintainable. Adjust it based on your specific needs!
