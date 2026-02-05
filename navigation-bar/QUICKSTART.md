# Navigation Bar - Quick Start Guide

Get up and running with the responsive navigation bar in 5 minutes!

## 🚀 Quick Setup

### 1. Import the Component

```tsx
import { Navbar } from './navigation-bar';
import { NavItem, User } from './navigation-bar/types';
```

### 2. Define Your Navigation with Anchor Links

Use `#` prefix for sections on the same page (enables smooth scroll + active highlighting):

```tsx
const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];
```

### 3. Add User Information (Optional)

```tsx
const user: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  role: 'Admin'
};
```

### 4. Use the Navbar

```tsx
function App() {
  return (
    <div>
      <Navbar
        logoText="MyBrand"
        navItems={navItems}
        user={user}
        searchPlaceholder="Search..."
        onSearch={(query) => console.log('Search:', query)}
        onLogout={() => console.log('Logout')}
      />
      
      {/* Your page content with matching section IDs */}
      <section id="home">...</section>
      <section id="features">...</section>
      <section id="pricing">...</section>
      <section id="contact">...</section>
    </div>
  );
}
```

## ✨ Key Features

### Smooth Scrolling (Built-in)
```tsx
<Navbar 
  navItems={navItems}
  smoothScroll={true}      // ✅ Enabled by default
  scrollOffset={80}        // Accounts for navbar height
  showScrollToTop={true}   // ✅ Scroll-to-top button
/>
```

### Custom Search Placeholder
```tsx
<Navbar 
  searchPlaceholder="Search products, articles, or help..."
/>
```

### With Icons
```tsx
const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '#home',
    icon: <HomeIcon />  // Add your icon component
  }
];
```

## 📁 File Structure

```
navigation-bar/
├── Navbar.tsx              # Main navbar component
├── MobileMenu.tsx          # Mobile slide-in menu
├── UserDropdown.tsx        # User profile dropdown
├── ScrollToTop.tsx         # Floating scroll button
├── types.ts                # TypeScript interfaces
├── utils.ts                # Smooth scroll utilities
├── index.ts                # Barrel exports
├── Example.tsx             # Full working example
├── README.md               # Complete documentation
├── SMOOTH_SCROLL_GUIDE.md  # Smooth scroll details
└── SEARCH_PLACEHOLDERS.md  # Search placeholder examples
```

## 🎨 Customization

### Colors
The component uses Tailwind CSS with a blue/purple gradient theme. Customize by editing the component files.

### Disable Features
```tsx
<Navbar 
  smoothScroll={false}      // Disable smooth scroll
  showScrollToTop={false}   // Hide scroll-to-top button
/>
```

### Adjust Scroll Offset
```tsx
<Navbar 
  scrollOffset={100}  // Increase for taller navbars
/>
```

## 📱 What You Get

- ✅ **Desktop Navigation** - Horizontal menu with hover effects
- ✅ **Mobile Menu** - Slide-in menu with backdrop
- ✅ **Search Bar** - Focus animations and clear button
- ✅ **User Profile** - Dropdown with avatar and actions
- ✅ **Smooth Scroll** - Automatic for anchor links
- ✅ **Scroll to Top** - Floating button when scrolling
- ✅ **Active Links** - Automatically highlights current section
- ✅ **Dark Mode** - Full dark mode support
- ✅ **TypeScript** - Complete type safety
- ✅ **Responsive** - Works on all screen sizes

## 🔧 Using Utilities

Import scroll utilities for custom functionality:

```tsx
import { smoothScrollTo, scrollToTop } from './navigation-bar/utils';

// Scroll to element
smoothScrollTo('my-section', 80);

// Scroll to top
scrollToTop();
```

## 📖 More Resources

- **README.md** - Complete API documentation
- **SMOOTH_SCROLL_GUIDE.md** - Detailed smooth scroll guide
- **ACTIVE_LINKS_GUIDE.md** - Active link highlighting guide
- **SEARCH_PLACEHOLDERS.md** - Search placeholder examples
- **Example.tsx** - Full working demo

## 🎯 Common Use Cases

### Landing Page
Use anchor links (`#section`) for smooth scrolling between sections.

### Multi-Page App
Mix anchor links and regular routes:
```tsx
const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'about', label: 'About', href: '#about' }  // Smooth scroll on same page
];
```

### Documentation Site
```tsx
<Navbar 
  searchPlaceholder="Search documentation..."
  navItems={docNavItems}
/>
```

### E-commerce
```tsx
<Navbar 
  searchPlaceholder="Search products, brands, or categories..."
  navItems={shopNavItems}
/>
```

## 🆘 Need Help?

1. Check the **README.md** for complete API docs
2. See **Example.tsx** for a working implementation
3. Read **SMOOTH_SCROLL_GUIDE.md** for scroll features
4. Browse **SEARCH_PLACEHOLDERS.md** for search examples

## 🎉 You're Ready!

That's it! Your navigation bar is now ready with smooth scrolling, mobile responsiveness, and all the features you need.

Happy coding! 🚀
