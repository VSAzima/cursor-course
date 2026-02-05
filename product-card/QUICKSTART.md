# Quick Start Guide

Get your Product Card component up and running in minutes!

## 🚀 Quick Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)
   - You should see a demo page with 6 sample products

## 📋 What You'll See

The demo page includes:
- 6 different product cards with real images
- Responsive grid layout (1, 2, or 3 columns based on screen size)
- Interactive "Add to Cart" buttons
- Shopping cart counter in the header
- Toast notifications when adding items

## 🎨 Try These Features

1. **Hover Effects**: Hover over any product card to see the smooth zoom and shadow effects
2. **Add to Cart**: Click the "Add to Cart" button to see the loading animation
3. **Out of Stock**: Notice the "Professional Camera Lens" is marked as out of stock
4. **Responsive Design**: Resize your browser to see the layout adapt
5. **Categories**: Each product has a category badge
6. **Ratings**: All products show star ratings with review counts

## 🛠️ Customize Your Products

Edit `src/App.tsx` and modify the `products` array:

```typescript
const products: Product[] = [
  {
    id: 1,
    title: 'Your Product Name',
    description: 'Your product description',
    price: 99.99,
    image: 'your-image-url.jpg',
    rating: 4.5,
    reviewCount: 100,
    inStock: true,
    category: 'Your Category',
  },
  // Add more products...
];
```

## 📱 Test Responsive Design

Open DevTools (F12) and test these breakpoints:
- **Mobile**: 375px width
- **Tablet**: 768px width
- **Desktop**: 1440px width

## 🎯 Next Steps

1. **Integration**: Copy the components to your project
2. **Styling**: Customize colors in `tailwind.config.js`
3. **API**: Connect to your product API
4. **Cart**: Implement full shopping cart functionality

## 🐛 Troubleshooting

**Port already in use?**
- Kill the process or use a different port:
  ```bash
  npm run dev -- --port 3000
  ```

**Images not loading?**
- Check your internet connection (demo uses external images)
- Replace with local images if needed

**TypeScript errors?**
- Run `npm install` again
- Check that all files are saved

## 📚 Learn More

- See `README.md` for detailed documentation
- Check `src/types/index.ts` for TypeScript interfaces
- Explore component props in the README

## ✅ Verification Checklist

- [ ] Dependencies installed successfully
- [ ] Dev server running without errors
- [ ] All 6 products visible
- [ ] Can add products to cart
- [ ] Hover effects working
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors

Enjoy building with the Product Card component! 🎉
