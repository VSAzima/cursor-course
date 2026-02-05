# Quick Start Guide

Get your management dashboard up and running in 5 minutes!

## 🚀 Installation

### 1. Navigate to Project Directory
```bash
cd management-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- ESLint

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at **http://localhost:5173**

## ✅ What You Get

A fully configured project with:
- ✅ React 18 with TypeScript
- ✅ Tailwind CSS for styling
- ✅ Vite for fast development
- ✅ ESLint for code quality
- ✅ Organized folder structure
- ✅ React Router ready to use

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/      # Sidebar, Navbar, Footer
│   ├── common/      # Button, Input, Modal, etc.
│   └── dashboard/   # Dashboard-specific components
├── pages/           # Page components (routes)
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── types/           # TypeScript types
└── assets/          # Images, fonts, etc.
```

## 🎯 Next Steps

### 1. Create Your First Component

Create a button component:
```bash
# Create the file
touch src/components/common/Button.tsx
```

```typescript
// src/components/common/Button.tsx
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export const Button = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors'
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  }

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

Export it:
```typescript
// src/components/common/index.ts
export { Button } from './Button'
```

Use it:
```typescript
// src/App.tsx
import { Button } from './components/common'

<Button onClick={() => alert('Clicked!')}>
  Click Me
</Button>
```

### 2. Add Routing

Update `App.tsx` to use React Router:
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### 3. Create a Dashboard Page

```bash
touch src/pages/Dashboard.tsx
```

```typescript
// src/pages/Dashboard.tsx
export const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat cards will go here */}
      </div>
    </div>
  )
}
```

### 4. Add Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
VITE_API_URL=http://localhost:3000/api
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 📜 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Check TypeScript types |

## 🎨 Customizing Tailwind

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      },
    },
  },
}
```

## 💡 Tips

### TypeScript
- Define interfaces for all props
- Avoid using `any` type
- Export types from components

### Components
- Keep components small and focused
- Use TypeScript interfaces
- Export both component and types

### Styling
- Use Tailwind utility classes
- Follow mobile-first approach
- Create reusable components

### State Management
- Local state: `useState`
- Global state: Consider Zustand or Redux
- Server state: Consider React Query

## 🔧 Installing Additional Packages

### State Management
```bash
npm install zustand
```

### Forms
```bash
npm install react-hook-form zod @hookform/resolvers
```

### Data Fetching
```bash
npm install @tanstack/react-query axios
```

### Charts
```bash
npm install recharts
```

### Icons
```bash
npm install lucide-react
```

### Date Utilities
```bash
npm install date-fns
```

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com)

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will automatically use the next available port.

### TypeScript Errors
Run type check:
```bash
npm run type-check
```

### ESLint Warnings
Run linter:
```bash
npm run lint
```

### Clear Node Modules
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎉 You're Ready!

Your management dashboard is set up and ready for development. Start building your components and pages!

Check out `STRUCTURE.md` for detailed architecture information.

---

Happy coding! 🚀
