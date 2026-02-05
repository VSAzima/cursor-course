# Quick Start Guide

Get your Data Analytics Dashboard up and running in minutes!

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
cd /Users/nkatanaeva/titled_folder/data-analytics
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:5173`

That's it! Your dashboard is now running.

## 🎯 Key Features at a Glance

### Header Controls
- **Refresh Button** (⟳): Refresh dashboard data
- **Export Button** (↓): Export data (ready for implementation)
- **Dark Mode Toggle** (☾/☀): Switch between light/dark themes
- **Mobile Menu** (☰): Access sidebar filters on mobile

### KPI Cards
Four key metric cards displaying:
- Total Revenue with trend
- Active Users count
- Conversion Rate percentage
- Average Session duration

### Charts Section
Four chart placeholders ready for data visualization:
- Line Chart: Revenue trends
- Area Chart: User growth
- Pie Chart: Traffic sources
- Bar Chart: Monthly comparisons

### Data Table
- Search functionality
- Pagination (5 items per page)
- Status badges
- Sortable data

### Filters (Sidebar)
- Category filter (All, Sales, Marketing, Product)
- Status filter (All, Active, Pending, Completed)
- Clear all filters button

### Date Range Selector
- Custom start/end date pickers
- Quick range buttons:
  - Today
  - Last 7 days
  - Last 30 days
  - Last 90 days

## 🎨 Testing Dark Mode

1. Click the moon icon (☾) in the header
2. Watch the entire dashboard switch to dark theme
3. Click the sun icon (☀) to return to light mode
4. Your preference is saved automatically

## 📱 Testing Responsive Design

### Desktop (1024px+)
- Full sidebar visible
- 4-column KPI grid
- 2-column chart grid

### Tablet (768px - 1023px)
- Collapsible sidebar
- 2-column KPI grid
- 2-column chart grid

### Mobile (< 768px)
- Hidden sidebar (toggle with menu button)
- 1-column layout
- Stacked components

## 🔧 Quick Customization

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color-here',
    // Update other shades...
  }
}
```

### Add Mock Data
Edit component files:
- KPI data: `Dashboard.tsx` (mockKPIs array)
- Table data: `DataTable.tsx` (mockData array)

### Modify Layout
- Change grid columns: Update `grid-cols-*` classes in `Dashboard.tsx`
- Adjust spacing: Modify `gap-*` and padding classes
- Update card styles: Edit component className props

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Start on a different port
npm run dev -- --port 3000
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check TypeScript errors
npx tsc --noEmit
```

## 📚 Next Steps

1. **Integrate Real Charts**
   - Install a charting library (e.g., `npm install recharts`)
   - Replace `ChartPlaceholder` components with real charts

2. **Connect to API**
   - Create API service functions
   - Replace mock data with API calls
   - Add loading states

3. **Add Authentication**
   - Implement login/logout
   - Add protected routes
   - Store user preferences

4. **Enhance Filtering**
   - Add more filter options
   - Implement filter logic for data
   - Save filter preferences

5. **Add More Features**
   - Export to PDF/CSV functionality
   - Real-time data updates
   - Notifications system
   - User settings panel

## 🔗 Useful Links

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Lucide Icons](https://lucide.dev/)

## 💡 Tips

- Use the browser DevTools to inspect components
- Check console for any errors or warnings
- Modify one component at a time
- Test dark mode after making style changes
- Use TypeScript types for better development experience

---

Happy coding! 🎉
