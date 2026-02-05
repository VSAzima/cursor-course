# Search Placeholder Examples

A collection of effective search placeholder text examples for different types of websites and applications.

## E-Commerce

```tsx
searchPlaceholder="Search for products, brands, or categories..."
searchPlaceholder="What are you looking for?"
searchPlaceholder="Search products, brands, and more..."
searchPlaceholder="Find your perfect product..."
searchPlaceholder="Search thousands of products..."
```

## Documentation & Knowledge Base

```tsx
searchPlaceholder="Search documentation..."
searchPlaceholder="Search for guides, tutorials, or API references..."
searchPlaceholder="Find answers in our docs..."
searchPlaceholder="Search articles and guides..."
```

## Support & Help Center

```tsx
searchPlaceholder="How can we help you?"
searchPlaceholder="Search for help articles..."
searchPlaceholder="Describe your issue..."
searchPlaceholder="Find solutions to common problems..."
```

## Social Media & Community

```tsx
searchPlaceholder="Search posts, people, or topics..."
searchPlaceholder="Search users and content..."
searchPlaceholder="Find friends, posts, or groups..."
```

## SaaS Applications

```tsx
searchPlaceholder="Search projects, tasks, or files..."
searchPlaceholder="Quick search (Cmd+K)..."
searchPlaceholder="Search across your workspace..."
searchPlaceholder="Find anything..."
```

## Blog & Content Sites

```tsx
searchPlaceholder="Search articles..."
searchPlaceholder="Search blog posts, authors, or topics..."
searchPlaceholder="Find interesting content..."
```

## Job Boards & Recruitment

```tsx
searchPlaceholder="Search jobs by title, company, or keyword..."
searchPlaceholder="Find your next opportunity..."
searchPlaceholder="Search positions..."
```

## Real Estate

```tsx
searchPlaceholder="Search by location, price, or property type..."
searchPlaceholder="Find your dream home..."
searchPlaceholder="City, neighborhood, or address..."
```

## Restaurant & Food Delivery

```tsx
searchPlaceholder="Search for dishes, restaurants, or cuisines..."
searchPlaceholder="What are you craving?"
searchPlaceholder="Find food near you..."
```

## Travel & Booking

```tsx
searchPlaceholder="Search destinations, hotels, or experiences..."
searchPlaceholder="Where do you want to go?"
searchPlaceholder="Find your next adventure..."
```

## Education & Learning

```tsx
searchPlaceholder="Search courses, topics, or instructors..."
searchPlaceholder="What do you want to learn?"
searchPlaceholder="Find courses and tutorials..."
```

## Healthcare & Medical

```tsx
searchPlaceholder="Search symptoms, conditions, or treatments..."
searchPlaceholder="Search for doctors, specialists, or clinics..."
searchPlaceholder="Find health information..."
```

## Best Practices

### ✅ Do:
- Keep it concise and clear (under 50 characters)
- Use action-oriented language
- Mention what users can search for
- Consider adding keyboard shortcuts for power users (e.g., "Cmd+K")
- Match the tone of your brand

### ❌ Don't:
- Use vague text like "Type here..."
- Make it too long or wordy
- Use technical jargon unless your audience expects it
- Leave it as just "Search" (add context)
- Use multiple sentences

## Accessibility Tips

- Keep placeholder text readable with good contrast
- Don't rely solely on placeholders for instructions
- Use proper labels for screen readers
- Ensure placeholder disappears when users start typing
- Consider showing example searches as suggestions instead

## Implementation

```tsx
import { Navbar } from './navigation-bar';

// Choose the placeholder that fits your use case
<Navbar
  navItems={navItems}
  searchPlaceholder="Your custom placeholder here..."
  onSearch={handleSearch}
/>
```

## Default Placeholder

If no `searchPlaceholder` prop is provided, the navbar uses:
```tsx
searchPlaceholder="Search for products, articles, or help..."
```

You can customize this to match your specific needs!
