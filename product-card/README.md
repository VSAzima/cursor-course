# Product Card Component - E-Commerce

A modern, reusable, and fully responsive product card component built with React, TypeScript, and Tailwind CSS. Perfect for e-commerce applications with rich features including smooth animations, accessibility support, and professional design.

## Features

### Component Features
- **Fully Typed with TypeScript** - Complete type safety with comprehensive interfaces
- **Responsive Design** - Optimized for mobile, tablet, and desktop viewports
- **Smooth Animations** - Hover effects, transitions, and loading states
- **Accessibility First** - ARIA labels, keyboard navigation, and screen reader support
- **Star Rating System** - Beautiful, customizable star rating component
- **Image Loading States** - Skeleton loading for better UX
- **Stock Status** - Visual indicators for product availability
- **Category Badges** - Highlight product categories
- **Free Shipping Badge** - Automatic badge for eligible products
- **Add to Cart** - Interactive button with loading animation

### Technical Features
- React 18.2+
- TypeScript 5.2+
- Tailwind CSS 3.4+
- Vite for fast development
- ESLint for code quality
- Responsive grid layout

## Project Structure

```
product-card/
├── src/
│   ├── components/
│   │   ├── ProductCard.tsx      # Main product card component
│   │   └── RatingStars.tsx      # Star rating component
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces and types
│   ├── App.tsx                  # Demo page with sample products
│   ├── main.tsx                 # Application entry point
│   ├── index.css                # Global styles and Tailwind imports
│   └── vite-env.d.ts           # Vite environment types
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Usage

### Basic Usage

```typescript
import ProductCard from './components/ProductCard';
import { Product } from './types';

const product: Product = {
  id: 1,
  title: 'Premium Wireless Headphones',
  description: 'Experience crystal-clear sound with active noise cancellation.',
  price: 299.99,
  image: 'https://example.com/image.jpg',
  rating: 4.8,
  reviewCount: 1243,
  inStock: true,
  category: 'Audio',
};

function App() {
  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
  };

  return (
    <ProductCard 
      product={product} 
      onAddToCart={handleAddToCart} 
    />
  );
}
```

### Using the RatingStars Component

```typescript
import RatingStars from './components/RatingStars';

function Example() {
  return (
    <RatingStars
      rating={4.5}
      maxRating={5}
      reviewCount={1234}
      size="md"
      showReviewCount={true}
    />
  );
}
```

## TypeScript Interfaces

### Product Interface
```typescript
interface Product {
  id: string | number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock?: boolean;
  category?: string;
}
```

### ProductCardProps Interface
```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}
```

### RatingStarsProps Interface
```typescript
interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showReviewCount?: boolean;
}
```

## Component Props

### ProductCard Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `product` | `Product` | Yes | Product data object |
| `onAddToCart` | `(product: Product) => void` | No | Callback when "Add to Cart" is clicked |
| `className` | `string` | No | Additional CSS classes |

### RatingStars Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rating` | `number` | - | Rating value (0 to maxRating) |
| `maxRating` | `number` | `5` | Maximum rating value |
| `reviewCount` | `number` | - | Number of reviews |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of stars |
| `showReviewCount` | `boolean` | `true` | Show/hide review count |

## Responsive Breakpoints

- **Mobile**: < 640px - Single column layout
- **Tablet**: 640px - 1024px - Two column grid
- **Desktop**: > 1024px - Three column grid

## Accessibility Features

- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Indicators**: Clear focus states for keyboard users
- **Alt Text**: Descriptive alt text for all images
- **Semantic HTML**: Proper use of semantic elements
- **Color Contrast**: WCAG AA compliant color contrast ratios

## Customization

### Modifying Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
}
```

### Adjusting Animations
Modify animation speeds in the component classes or add new animations in `tailwind.config.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading images
- CSS-only animations (no JavaScript)
- Optimized re-renders with React hooks
- Tailwind CSS purging for minimal bundle size

## Acceptance Criteria ✅

- ✅ Component displays all product information
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Hover effects on card and button
- ✅ Proper TypeScript typing
- ✅ Accessibility attributes present
- ✅ Star rating component
- ✅ Demo page with multiple products

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!
