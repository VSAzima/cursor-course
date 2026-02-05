# Active Link Highlighting Guide

This guide explains how the automatic active link highlighting works in the navigation bar.

## Overview

The navbar automatically detects which section of your page is currently visible and highlights the corresponding navigation link. This provides visual feedback to users about their current position on the page.

## How It Works

The active link highlighting uses the **IntersectionObserver API** to efficiently track which section is currently in view. As you scroll through the page, the navbar updates in real-time to highlight the active section.

### Key Features

- ✅ **Automatic Detection** - No manual configuration needed
- ✅ **Efficient Performance** - Uses IntersectionObserver (no scroll event listeners)
- ✅ **Visual Feedback** - Blue highlight and underline for active links
- ✅ **Mobile Support** - Works in both desktop and mobile menus
- ✅ **Dark Mode** - Proper styling for dark mode
- ✅ **Smooth Transitions** - Animated state changes

## Basic Usage

### Step 1: Create Navigation Items with Anchor Links

Use `#` prefix for links that should have active highlighting:

```tsx
import { NavItem } from './navigation-bar/types';

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];
```

### Step 2: Add Matching Section IDs

Ensure your page sections have IDs that match the href anchors (without the `#`):

```tsx
function App() {
  return (
    <div>
      <Navbar navItems={navItems} />
      
      <section id="home">
        <h1>Home Section</h1>
        {/* Content */}
      </section>
      
      <section id="about">
        <h2>About Section</h2>
        {/* Content */}
      </section>
      
      <section id="services">
        <h2>Services Section</h2>
        {/* Content */}
      </section>
      
      <section id="contact">
        <h2>Contact Section</h2>
        {/* Content */}
      </section>
    </div>
  );
}
```

### Step 3: That's It!

The navbar will automatically:
- Detect which section is in view as you scroll
- Highlight the corresponding navigation link
- Update smoothly with transitions

## Visual Styling

### Desktop Navigation

Active links feature:
- **Blue text color** - `text-blue-600`
- **Light blue background** - `bg-blue-50`
- **Bottom underline indicator** - Blue bar at bottom
- **Smooth transitions** - Animated state changes

```tsx
// Active link appears like this:
<a className="text-blue-600 bg-blue-50">
  Features
  <span className="bottom-indicator" /> {/* Blue underline */}
</a>
```

### Mobile Menu

Active links feature:
- **Blue text color** - Full text and icon
- **Light blue background** - Highlighted background
- **Left border indicator** - Vertical blue bar on left
- **Icon color change** - Icon matches active color

## Advanced Configuration

### Adjusting Detection Sensitivity

The active section detection accounts for the fixed navbar. Adjust the `scrollOffset` to fine-tune:

```tsx
<Navbar 
  navItems={navItems}
  scrollOffset={80}  // Default: 80px
/>

// For a taller navbar:
<Navbar scrollOffset={100} />

// For a shorter navbar:
<Navbar scrollOffset={60} />
```

### Mixed Link Types

You can mix anchor links (with highlighting) and regular links (without):

```tsx
const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },          // Active highlighting
  { id: 'blog', label: 'Blog', href: '/blog' },          // No highlighting
  { id: 'about', label: 'About', href: '#about' },       // Active highlighting
  { id: 'shop', label: 'Shop', href: '/shop' }           // No highlighting
];
```

Only links starting with `#` will have active highlighting.

## Using the Hook Directly

You can use the `useActiveSection` hook in your own components:

```tsx
import { useActiveSection, extractSectionIds } from './navigation-bar';

function MyCustomNav() {
  const navItems = [
    { id: 'hero', href: '#hero' },
    { id: 'features', href: '#features' }
  ];
  
  const sectionIds = extractSectionIds(navItems);
  const activeSection = useActiveSection(sectionIds, 80);
  
  return (
    <nav>
      {navItems.map(item => (
        <a 
          key={item.id}
          href={item.href}
          className={activeSection === item.id ? 'active' : ''}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
```

### Hook API

**`useActiveSection(sectionIds, offset)`**

Parameters:
- `sectionIds: string[]` - Array of section IDs to track
- `offset: number` - Offset in pixels (default: 80)

Returns:
- `string` - ID of the currently active section

**`extractSectionIds(navItems)`**

Parameters:
- `navItems: { href: string }[]` - Navigation items

Returns:
- `string[]` - Array of section IDs extracted from anchor links

## How Detection Works

### IntersectionObserver Configuration

```tsx
{
  rootMargin: `-${offset}px 0px -50% 0px`,
  threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
}
```

- **Top Margin**: Accounts for fixed navbar height
- **Bottom Margin**: Section must be in the top 50% of viewport
- **Thresholds**: Multiple checkpoints for smooth detection

### Priority Logic

When multiple sections are visible:
1. Prioritizes sections closer to the navbar offset
2. If multiple sections are at the same level, picks the topmost
3. Smoothly transitions as you scroll

## Examples

### Landing Page with Hero

```tsx
const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
  { id: 'faq', label: 'FAQ', href: '#faq' }
];

function LandingPage() {
  return (
    <>
      <Navbar navItems={navItems} />
      
      <section id="hero" className="h-screen">
        {/* Large hero section */}
      </section>
      
      <section id="features" className="min-h-screen">
        {/* Features section */}
      </section>
      
      <section id="pricing" className="min-h-screen">
        {/* Pricing section */}
      </section>
      
      <section id="faq" className="min-h-screen">
        {/* FAQ section */}
      </section>
    </>
  );
}
```

### Documentation Site

```tsx
const navItems: NavItem[] = [
  { id: 'introduction', label: 'Introduction', href: '#introduction' },
  { id: 'installation', label: 'Installation', href: '#installation' },
  { id: 'usage', label: 'Usage', href: '#usage' },
  { id: 'api', label: 'API', href: '#api' },
  { id: 'examples', label: 'Examples', href: '#examples' }
];

// As users scroll through docs, the current section is highlighted
```

### Portfolio Site

```tsx
const navItems: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

// Active link updates as visitors explore your portfolio
```

## Styling Customization

### Custom Active Colors

Edit the component files to change active link colors:

```tsx
// In Navbar.tsx and MobileMenu.tsx, replace:
'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'

// With your brand colors:
'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
```

### Custom Active Indicator

The desktop nav has a bottom underline indicator. Customize it:

```tsx
// In Navbar.tsx:
<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />

// Change size, position, or style:
<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
```

### Mobile Menu Indicator

The mobile menu has a left border indicator:

```tsx
// In MobileMenu.tsx:
<span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 dark:bg-blue-400 rounded-r-full" />

// Customize thickness, height, or position
```

## Performance

### Efficient Tracking

- **No scroll event listeners** - Uses IntersectionObserver
- **Debounced updates** - Only updates when sections change
- **Minimal re-renders** - Optimized React hooks
- **Memory efficient** - Cleans up observers on unmount

### Browser Support

IntersectionObserver is supported by:
- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 15+

## Troubleshooting

### Links Not Highlighting

**Problem**: Active links don't highlight as you scroll.

**Solutions**:

1. **Check section IDs match href anchors**:
   ```tsx
   // ✅ Correct
   { href: '#features' }  // matches:
   <section id="features">
   
   // ❌ Wrong
   { href: '#features' }  // doesn't match:
   <section id="feature">
   ```

2. **Ensure sections are visible**: Sections must be large enough to enter the viewport.

3. **Check scroll offset**: Adjust if your navbar height is different:
   ```tsx
   <Navbar scrollOffset={100} />
   ```

### Wrong Section Highlighted

**Problem**: The active link doesn't match the visible section.

**Solutions**:

1. **Adjust scroll offset**: Make it match your navbar height exactly
2. **Add more content**: Very short sections may not trigger properly
3. **Check overlapping sections**: Ensure sections don't overlap unexpectedly

### Multiple Links Highlighted

**Problem**: More than one link appears active.

**Solution**: This shouldn't happen with the current implementation. Check that you're not manually applying active classes elsewhere.

## Best Practices

1. **Consistent Section Heights**: Make sections reasonably tall (at least viewport height)
2. **Clear Section Boundaries**: Use distinct sections with proper spacing
3. **Descriptive Labels**: Use clear, descriptive labels that match section content
4. **Meaningful Order**: Order nav items to match page flow
5. **Test Scrolling**: Test on different screen sizes and scroll speeds

## See Also

- **SMOOTH_SCROLL_GUIDE.md** - Smooth scrolling documentation
- **README.md** - Complete API reference
- **Example.tsx** - Working implementation

## Summary

Active link highlighting provides automatic visual feedback about the current section without any manual configuration. Just use anchor links in your navigation and matching IDs on your sections, and the navbar handles the rest!
