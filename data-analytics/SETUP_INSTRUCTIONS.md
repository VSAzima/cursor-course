# Setup Instructions - Data Analytics Dashboard

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
  - Check version: `node --version`
  - Download: https://nodejs.org/

- **npm**: Version 9.0.0 or higher (comes with Node.js)
  - Check version: `npm --version`

- **Git**: For version control (optional but recommended)
  - Check version: `git --version`

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd /Users/nkatanaeva/titled_folder/data-analytics
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- date-fns (date utilities)
- And all development dependencies

**Expected Output:**
```
added X packages in Ys
```

### Step 3: Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.2.11  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Step 4: Open in Browser

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the Data Analytics Dashboard!

## ✅ Verification Checklist

After installation, verify the following:

### Visual Elements
- [ ] Dashboard loads without errors
- [ ] 4 KPI cards are visible (Revenue, Users, Conversion, Session)
- [ ] 4 chart placeholders are displayed
- [ ] Data table shows with sample data
- [ ] Sidebar with filters is visible (desktop) or accessible (mobile)
- [ ] Date range selector is present

### Functionality
- [ ] Dark mode toggle works (moon/sun icon in header)
- [ ] Mobile menu toggle works (hamburger icon)
- [ ] Filter options can be selected
- [ ] Date pickers are functional
- [ ] Quick date range buttons work
- [ ] Table search filters data
- [ ] Table pagination works
- [ ] Refresh button is clickable
- [ ] Export button is clickable

### Responsive Design
- [ ] Desktop view (1024px+): Full layout with sidebar
- [ ] Tablet view (768px-1023px): Responsive grid
- [ ] Mobile view (<768px): Single column, drawer menu

### Dark Mode
- [ ] Toggle switches between light and dark
- [ ] All components update colors
- [ ] Icons change appropriately
- [ ] Text remains readable
- [ ] Preference persists on reload

## 🛠️ Available Scripts

### Development
```bash
npm run dev          # Start dev server (http://localhost:5173)
```

### Production Build
```bash
npm run build        # Build for production (output: dist/)
```

### Preview Production
```bash
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check without building
```

## 📁 Project Structure Overview

```
data-analytics/
├── src/
│   ├── components/      # React components
│   ├── types/           # TypeScript types
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
└── [config files]       # Various configuration files
```

## 🎨 Quick Customization

### Change Primary Color

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#YOUR_COLOR_HERE',
        // Adjust other shades as needed
      },
    },
  },
}
```

Then restart the dev server.

### Modify Dashboard Title

Edit `src/components/Dashboard.tsx`:

```tsx
<h1 className="...">
  Your Custom Title
</h1>
```

### Add More KPI Cards

Edit `src/components/Dashboard.tsx`:

```typescript
const mockKPIs: KPIData[] = [
  // ... existing KPIs
  {
    id: '5',
    title: 'New Metric',
    value: '1,234',
    change: 5.5,
    changeLabel: 'vs last month',
    icon: 'users',
    trend: 'up',
  },
];
```

## 🔧 Troubleshooting

### Issue: Port 5173 is already in use

**Solution:**
```bash
# Use a different port
npm run dev -- --port 3000
```

### Issue: Module not found errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors

**Solution:**
```bash
# Check for type errors
npx tsc --noEmit

# If VSCode, reload window
# CMD/CTRL + Shift + P -> "Reload Window"
```

### Issue: Styles not applying

**Solution:**
```bash
# Restart dev server
# CTRL + C to stop
npm run dev
```

### Issue: Dark mode not working

**Solution:**
- Clear browser localStorage
- Hard refresh (CTRL/CMD + Shift + R)
- Check browser console for errors

### Issue: Build fails

**Solution:**
```bash
# Clean build
rm -rf dist
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

## 🌐 Browser Support

### Recommended Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Not Supported
- ❌ Internet Explorer (any version)
- ❌ Older mobile browsers

## 📱 Testing Responsive Design

### Using Chrome DevTools
1. Open DevTools (F12)
2. Click device toolbar icon (CTRL+Shift+M)
3. Select device or enter custom dimensions

### Test These Breakpoints
- **Mobile**: 375px × 667px (iPhone SE)
- **Tablet**: 768px × 1024px (iPad)
- **Desktop**: 1920px × 1080px (Full HD)

## 🔐 Environment Setup (Optional)

### Create .env file

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
VITE_API_URL=https://your-api.com
VITE_APP_NAME=Your Dashboard Name
```

### Access in Code

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📊 Performance Optimization

### Production Build Optimization

The production build automatically includes:
- ✅ Code minification
- ✅ Tree shaking
- ✅ Asset optimization
- ✅ CSS purging
- ✅ Gzip compression ready

### Check Bundle Size

```bash
npm run build
# Check dist/ folder size
du -sh dist/
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `dist/` folder to Netlify

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "vite build && gh-pages -d dist"

# Deploy
npm run deploy
```

## 📚 Next Steps

After successful setup:

1. **Read Documentation**
   - [README.md](./README.md) - Complete overview
   - [FEATURES.md](./FEATURES.md) - Feature details
   - [QUICKSTART.md](./QUICKSTART.md) - Quick guide

2. **Customize Dashboard**
   - Update branding/colors
   - Add your data
   - Integrate with API

3. **Add Real Charts**
   - Install chart library
   - Replace placeholders
   - Connect data sources

4. **Integrate Backend**
   - Set up API endpoints
   - Add authentication
   - Implement data fetching

5. **Deploy**
   - Choose hosting platform
   - Configure environment
   - Deploy production build

## 💡 Tips for Development

### Hot Module Replacement (HMR)
- Changes to components reload instantly
- State is preserved when possible
- Styles update without page reload

### TypeScript IntelliSense
- Hover over variables for type info
- Auto-completion for props
- Instant error detection

### Tailwind CSS IntelliSense
- Install VSCode extension for class suggestions
- Auto-completion for Tailwind classes
- Color preview in editor

### React Developer Tools
- Install browser extension
- Inspect component tree
- Monitor state changes
- Profile performance

## 🆘 Getting Help

### Check Documentation
1. Project README files
2. Component comments
3. TypeScript type definitions

### Common Resources
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev)

### Debugging Tips
- Check browser console for errors
- Use React DevTools
- Enable source maps in production
- Add console.log for data flow

## ✨ Success Indicators

You'll know setup is successful when:

✅ Dev server starts without errors
✅ Dashboard loads in browser
✅ All components render correctly
✅ Dark mode toggle works
✅ Responsive design adapts to screen size
✅ No console errors
✅ TypeScript compiles without errors
✅ All interactions work smoothly

## 🎉 You're Ready!

Congratulations! Your Data Analytics Dashboard is now set up and ready for development.

Start building amazing analytics experiences! 🚀

---

**Need help?** Check the documentation files or review component code for implementation details.

**Last Updated**: February 2026
**Version**: 1.0.0
