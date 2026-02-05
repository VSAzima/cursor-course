# Responsive Navigation Bar Component

A modern, fully responsive navigation bar built with React, TypeScript, and Tailwind CSS. Features sticky scroll behavior, smooth animations, mobile hamburger menu, search functionality, and user profile dropdown.

## Features

- ✨ **Sticky on Scroll** - Stays at top with smooth shadow and backdrop blur
- 📱 **Mobile Responsive** - Beautiful slide-in hamburger menu for mobile devices
- 🎨 **Smooth Animations** - Polished transitions and hover effects
- 🔍 **Search Bar** - Built-in search with focus animations and custom placeholder
- 👤 **User Dropdown** - Profile menu with avatar and quick actions
- 🚀 **Smooth Scroll** - Automatic smooth scrolling for anchor links
- ⬆️ **Scroll to Top** - Floating button for quick navigation to top
- 🎯 **Active Link Highlighting** - Automatically highlights current section
- 🌙 **Dark Mode Support** - Full dark mode styling included
- ⚡ **TypeScript** - Fully typed with comprehensive interfaces
- ♿ **Accessibility** - ARIA labels and keyboard navigation support

## Components

### 1. Navbar.tsx
Main navigation component with logo, menu items, search bar, and user profile.

### 2. MobileMenu.tsx
Slide-in mobile menu with backdrop overlay and user information.

### 3. UserDropdown.tsx
User profile dropdown with avatar, user info, and action items.

### 4. ScrollToTop.tsx
Floating button that appears on scroll for quick navigation to top.

### 5. types.ts
TypeScript interfaces for all components and props.

### 6. utils.ts
Smooth scroll utilities and helper functions.

### 7. useActiveSection.ts
React hook for tracking active section using IntersectionObserver.

## Installation

Make sure you have the following dependencies installed:

```bash
npm install react react-dom
npm install -D typescript @types/react @types/react-dom
npm install -D tailwindcss postcss autoprefixer
```

## Usage

### Basic Example

```tsx
import React from 'react';
import { Navbar } from './navigation-bar';
import { NavItem, User } from './navigation-bar/types';

function App() {
  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  const user: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin'
  };

  const handleSearch = (query: string) => {
    console.log('Searching:', query);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div>
      <Navbar
        logoText="MyBrand"
        navItems={navItems}
        user={user}
        onSearch={handleSearch}
        onLogout={handleLogout}
        smoothScroll={true}
        showScrollToTop={true}
      />
      
      {/* Your page sections */}
      <section id="home">...</section>
      <section id="about">...</section>
      <section id="contact">...</section>
    </div>
  );
}
```

### With Custom Logo

```tsx
<Navbar
  logo={<img src="/logo.svg" alt="Logo" className="w-10 h-10" />}
  logoText="MyBrand"
  navItems={navItems}
  user={user}
/>
```

### With Icons in Menu Items

```tsx
const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  }
];
```

### With Smooth Scroll and Active Link Highlighting

```tsx
const navItems: NavItem[] = [
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

<Navbar
  navItems={navItems}
  smoothScroll={true}
  scrollOffset={80}  // Adjust for navbar height
/>

// Your page sections with matching IDs
<section id="features">...</section>
<section id="pricing">...</section>
<section id="contact">...</section>

// Active links are automatically highlighted as you scroll!
```

### Custom Search Placeholder

```tsx
// E-commerce site
<Navbar
  navItems={navItems}
  searchPlaceholder="Search for products, brands, or categories..."
  onSearch={handleSearch}
/>

// Documentation site
<Navbar
  navItems={navItems}
  searchPlaceholder="Search documentation..."
  onSearch={handleSearch}
/>

// Support portal
<Navbar
  navItems={navItems}
  searchPlaceholder="How can we help you?"
  onSearch={handleSearch}
/>

// Simple search
<Navbar
  navItems={navItems}
  searchPlaceholder="Search..."
  onSearch={handleSearch}
/>
```

### Using Scroll Utilities Programmatically

```tsx
import { smoothScrollTo, scrollToTop, handleAnchorClick } from './navigation-bar/utils';

// Scroll to a specific element
smoothScrollTo('my-section', 80); // 80px offset

// Scroll to top
scrollToTop();

// Handle anchor click in your code
const handleClick = (href: string) => {
  handleAnchorClick(href, 80);
};
```

### Custom Dropdown Items

```tsx
import { UserDropdown } from './navigation-bar';
import { User, DropdownItem } from './navigation-bar/types';

const customDropdownItems: DropdownItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: <ProfileIcon />
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: <SettingsIcon />
  },
  {
    id: 'divider',
    label: '',
    divider: true
  },
  {
    id: 'logout',
    label: 'Logout',
    onClick: handleLogout,
    icon: <LogoutIcon />
  }
];

<UserDropdown 
  user={user} 
  dropdownItems={customDropdownItems}
  onLogout={handleLogout}
/>
```

## Props

### NavbarProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `logo` | `React.ReactNode` | No | - | Custom logo component |
| `logoText` | `string` | No | `'Brand'` | Text to display next to logo |
| `navItems` | `NavItem[]` | Yes | - | Array of navigation items |
| `user` | `User` | No | - | User information for profile dropdown |
| `onSearch` | `(query: string) => void` | No | - | Search handler function |
| `searchPlaceholder` | `string` | No | `'Search for products, articles, or help...'` | Placeholder text for search input |
| `onLogout` | `() => void` | No | - | Logout handler function |
| `smoothScroll` | `boolean` | No | `true` | Enable smooth scrolling for anchor links |
| `showScrollToTop` | `boolean` | No | `true` | Show floating scroll-to-top button |
| `scrollOffset` | `number` | No | `80` | Offset in pixels for scroll position (accounts for fixed navbar) |
| `className` | `string` | No | `''` | Additional CSS classes |

### NavItem

```typescript
interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}
```

### User

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}
```

## Styling

The component uses Tailwind CSS classes. Make sure your `tailwind.config.js` includes:

```js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './navigation-bar/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: []
}
```

## Customization

### Colors

The navbar uses Tailwind's default color palette. To customize:

```tsx
// Change primary colors in the component files
// Default: blue-500, purple-600
// Replace with your brand colors
```

### Animation Duration

Modify transition durations in the component:

```tsx
// Fast animations
transition-all duration-200

// Medium animations (default)
transition-all duration-300

// Slow animations
transition-all duration-500
```

### Sticky Behavior

To disable sticky behavior:

```tsx
// In Navbar.tsx, change:
className="fixed top-0"
// to:
className="relative"
```

### Smooth Scroll Configuration

```tsx
// Disable smooth scroll
<Navbar smoothScroll={false} />

// Custom scroll offset (for different navbar heights)
<Navbar scrollOffset={100} />

// Hide scroll-to-top button
<Navbar showScrollToTop={false} />

// Customize scroll-to-top appearance threshold
import { ScrollToTop } from './navigation-bar';
<ScrollToTop showAfter={500} /> // Show after 500px scroll
```

## Active Link Highlighting

The navbar automatically highlights the current section as you scroll:

- **Desktop**: Blue background, text color, and bottom underline indicator
- **Mobile**: Blue background, text color, and left border indicator
- **Automatic**: Uses IntersectionObserver for efficient tracking
- **Works with**: Anchor links starting with `#`

See `ACTIVE_LINKS_GUIDE.md` for detailed documentation.

## Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- Focus states for all interactive elements
- Semantic HTML structure
- Visual indicators for active states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Credits

Built with React, TypeScript, and Tailwind CSS.
