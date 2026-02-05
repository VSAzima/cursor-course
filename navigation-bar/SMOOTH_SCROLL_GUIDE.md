# Smooth Scroll Implementation Guide

This guide explains how to use the smooth scroll features in the navigation bar component.

## Features

### 1. Automatic Smooth Scrolling for Anchor Links

The navbar automatically handles smooth scrolling when users click on anchor links (links starting with `#`).

```tsx
const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' }
];

<Navbar 
  navItems={navItems}
  smoothScroll={true}  // Default: true
  scrollOffset={80}    // Offset for fixed navbar
/>
```

### 2. Scroll-to-Top Button

A floating button appears when scrolling down, allowing users to quickly return to the top.

```tsx
<Navbar 
  showScrollToTop={true}  // Default: true
/>
```

### 3. Global Smooth Scroll

The navbar enables smooth scrolling globally via CSS when `smoothScroll={true}`.

## Basic Setup

### Step 1: Create Your Navigation Items

```tsx
import { NavItem } from './navigation-bar/types';

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];
```

### Step 2: Add Section IDs to Your Page

```tsx
function App() {
  return (
    <div>
      <Navbar navItems={navItems} smoothScroll={true} />
      
      <section id="hero">
        <h1>Welcome</h1>
        {/* Hero content */}
      </section>
      
      <section id="about">
        <h2>About Us</h2>
        {/* About content */}
      </section>
      
      <section id="services">
        <h2>Our Services</h2>
        {/* Services content */}
      </section>
      
      <section id="contact">
        <h2>Contact</h2>
        {/* Contact content */}
      </section>
    </div>
  );
}
```

### Step 3: Configure Scroll Offset

The `scrollOffset` prop ensures content doesn't hide behind the fixed navbar:

```tsx
<Navbar 
  navItems={navItems}
  scrollOffset={80}  // Should match your navbar height
/>
```

## Advanced Usage

### Using Scroll Utilities Directly

Import and use the scroll utilities in your own components:

```tsx
import { 
  smoothScrollTo, 
  scrollToTop, 
  handleAnchorClick,
  getScrollPercentage
} from './navigation-bar/utils';

// Scroll to a specific element
function handleButtonClick() {
  smoothScrollTo('pricing-section', 80);
}

// Scroll to top
function handleBackToTop() {
  scrollToTop();
}

// Handle anchor navigation
function handleNavigation(href: string) {
  handleAnchorClick(href, 80);
}

// Get scroll progress
function showProgress() {
  const progress = getScrollPercentage();
  console.log(`Scrolled ${progress}%`);
}
```

### Custom Scroll-to-Top Button

Use the `ScrollToTop` component independently:

```tsx
import { ScrollToTop } from './navigation-bar';

function MyApp() {
  return (
    <div>
      {/* Your content */}
      
      <ScrollToTop 
        showAfter={300}  // Show after 300px scroll
        className="custom-class"
      />
    </div>
  );
}
```

### Disable Smooth Scroll

For specific use cases where you want traditional instant scrolling:

```tsx
<Navbar 
  navItems={navItems}
  smoothScroll={false}
/>
```

## Configuration Options

### NavbarProps for Smooth Scroll

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `smoothScroll` | `boolean` | `true` | Enable smooth scrolling for anchor links |
| `showScrollToTop` | `boolean` | `true` | Show floating scroll-to-top button |
| `scrollOffset` | `number` | `80` | Offset in pixels for scroll position |

### ScrollToTop Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showAfter` | `number` | `300` | Pixels scrolled before button appears |
| `className` | `string` | `''` | Additional CSS classes |

## Utility Functions

### smoothScrollTo(target, offset)

Smoothly scrolls to a target element or position.

```tsx
// Scroll to element ID
smoothScrollTo('my-section', 80);

// Scroll to specific position
smoothScrollTo(500, 0);

// Scroll to element reference
const element = document.getElementById('my-section');
smoothScrollTo(element, 80);
```

**Parameters:**
- `target`: Element ID (string), HTMLElement, or scroll position (number)
- `offset`: Offset in pixels (default: 0)

### scrollToTop()

Smoothly scrolls to the top of the page.

```tsx
scrollToTop();
```

### handleAnchorClick(href, offset)

Handles anchor link clicks with smooth scroll.

```tsx
const wasHandled = handleAnchorClick('#my-section', 80);
// Returns true if it was an anchor link, false otherwise
```

**Parameters:**
- `href`: The href attribute (e.g., '#section')
- `offset`: Offset in pixels (default: 80)

**Returns:** `boolean` - true if anchor was handled

### getScrollPercentage()

Returns current scroll percentage.

```tsx
const percentage = getScrollPercentage();
console.log(`Page is ${percentage}% scrolled`);
```

**Returns:** `number` - Scroll percentage (0-100)

## Common Patterns

### Landing Page with Sections

```tsx
function LandingPage() {
  const navItems: NavItem[] = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'features', label: 'Features', href: '#features' },
    { id: 'testimonials', label: 'Testimonials', href: '#testimonials' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
    { id: 'faq', label: 'FAQ', href: '#faq' }
  ];

  return (
    <>
      <Navbar 
        navItems={navItems}
        smoothScroll={true}
        scrollOffset={80}
      />
      
      <section id="hero" className="h-screen">...</section>
      <section id="features" className="min-h-screen">...</section>
      <section id="testimonials" className="min-h-screen">...</section>
      <section id="pricing" className="min-h-screen">...</section>
      <section id="faq" className="min-h-screen">...</section>
    </>
  );
}
```

### Mixed Internal and External Links

```tsx
const navItems: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },      // Smooth scroll
  { id: 'blog', label: 'Blog', href: '/blog' },         // Regular navigation
  { id: 'contact', label: 'Contact', href: '#contact' } // Smooth scroll
];
```

The navbar automatically detects anchor links (starting with `#`) and applies smooth scrolling only to those.

### Call-to-Action with Smooth Scroll

```tsx
import { smoothScrollTo } from './navigation-bar/utils';

function HeroSection() {
  return (
    <section id="hero">
      <h1>Welcome to Our Product</h1>
      <button onClick={() => smoothScrollTo('pricing', 80)}>
        View Pricing
      </button>
    </section>
  );
}
```

## Browser Support

Smooth scroll uses the native `scroll-behavior: smooth` CSS property and the Scroll API's `behavior: 'smooth'` option, which are supported by:

- ✅ Chrome 61+
- ✅ Firefox 36+
- ✅ Safari 15.4+
- ✅ Edge 79+

For older browsers, scrolling will fall back to instant scrolling.

## Performance Tips

1. **Avoid excessive scroll listeners**: The component already handles scroll events efficiently
2. **Use scroll offset**: Adjust `scrollOffset` to match your navbar height
3. **Section spacing**: Add adequate spacing between sections for better UX
4. **Lazy loading**: Consider lazy loading images in long pages
5. **Smooth transitions**: Keep animations under 300-500ms for smooth feel

## Troubleshooting

### Links not scrolling smoothly

**Problem**: Clicking nav links doesn't trigger smooth scroll.

**Solution**: Ensure your links use `#` prefix:
```tsx
// ✅ Correct - will smooth scroll
{ href: '#features' }

// ❌ Wrong - regular navigation
{ href: '/features' }
```

### Content hidden behind navbar

**Problem**: Content appears under the fixed navbar when scrolling.

**Solution**: Adjust the `scrollOffset` prop:
```tsx
<Navbar scrollOffset={100} /> // Increase if navbar is taller
```

### Scroll-to-top button not appearing

**Problem**: The floating button doesn't show.

**Solution**: Check the `showScrollToTop` prop and scroll enough:
```tsx
<Navbar 
  showScrollToTop={true}  // Ensure it's enabled
/>
// Scroll more than 300px to see it appear
```

### Smooth scroll not working

**Problem**: Global smooth scrolling isn't active.

**Solution**: Enable it explicitly:
```tsx
<Navbar smoothScroll={true} />
```

## Examples

See the `Example.tsx` file for a complete working implementation with all features demonstrated.

## API Reference

For complete prop documentation, see the main `README.md` file.

## See Also

- **ACTIVE_LINKS_GUIDE.md** - Active link highlighting documentation
- **SEARCH_PLACEHOLDERS.md** - Search placeholder examples
- **README.md** - Complete API reference
- **Example.tsx** - Working implementation
