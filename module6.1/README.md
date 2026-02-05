# UserProfile Component - Social Media Application

A comprehensive, accessible, and responsive user profile component for social media applications built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Avatar.tsx
│   │   ├── Button.tsx
│   │   ├── StatItem.tsx
│   │   └── index.ts
│   ├── features/        # Feature-specific components
│   │   ├── UserProfile.tsx
│   │   ├── UserProfile.example.tsx
│   │   ├── UserProfile.README.md
│   │   └── index.ts
│   └── index.ts         # Central export point for all components
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles with Tailwind directives
```

## Component Organization

### Common Components (`src/components/common/`)
Reusable UI components that can be used throughout the application:
- **Avatar** - Profile picture with fallback to initials
- **Button** - Styled button with variants
- **StatItem** - User statistics display component

### Feature Components (`src/components/features/`)
Feature-specific components:
- **UserProfile** - Comprehensive social media user profile component

## Using Components

All components are exported through a central index file for easy imports:

```typescript
import { UserProfile, Avatar, Button, StatItem } from './components'
import type { UserProfileData, UserStats } from './components'
```

## Tailwind CSS

Tailwind CSS is configured and ready to use. The configuration file is located at `tailwind.config.js`.

### Customizing Tailwind

Edit `tailwind.config.js` to customize your theme:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add your custom colors, fonts, etc.
    },
  },
  plugins: [],
}
```

## TypeScript

This project uses TypeScript for type safety. Configuration files:
- `tsconfig.json` - TypeScript configuration
- `tsconfig.app.json` - App-specific TypeScript configuration
- `tsconfig.node.json` - Node-specific TypeScript configuration

## ESLint

ESLint is configured for code quality. Run:

```bash
npm run lint
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Ensure all tests pass and linting is clean
4. Submit a pull request

## License

MIT
