# Quick Start Guide

Get the Data Analytics Dashboard up and running in minutes!

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
cd /Users/nkatanaeva/titled_folder/data-visualization
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:5173`

## ✨ Features Overview

### KPI Cards
Located at the top of the dashboard, showing:
- Total Revenue
- Active Users
- Total Orders
- Conversion Rate

Each card displays:
- Current value
- Percentage change
- Trend indicator (up/down)
- Color-coded icon

### Chart Placeholders
Four chart areas ready for integration:
1. **Revenue Trends** - Line chart placeholder
2. **Sales by Category** - Bar chart placeholder
3. **Traffic Sources** - Pie chart placeholder
4. **User Growth** - Area chart placeholder

### Data Table
Interactive table with:
- **Sorting**: Click column headers to sort
- **Search**: Real-time search across all columns
- **Pagination**: Navigate through multiple pages
- **Status Badges**: Color-coded status indicators

### Filters
Click the "Filters" button to access:
- Region selector (North America, Europe, Asia, etc.)
- Status selector (Active, Inactive, Pending)
- Category selector (Premium, Basic, Enterprise, etc.)

### Date Range Selector
Multiple ways to select dates:
- Quick buttons: Today, Last 7 Days, Last 30 Days, Last Year
- Custom date range: Pick start and end dates

### Dark Mode
Toggle between light and dark themes using the sun/moon icon in the header.

## 🎨 Customization Tips

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#3b82f6', // Change this to your brand color
    600: '#2563eb',
    // ...
  }
}
```

### Add New KPI
In `Dashboard.tsx`, add to the `kpiData` array:
```typescript
{
  title: 'New Metric',
  value: '$10,000',
  change: '+5.0%',
  trend: 'up',
  icon: YourIcon,
  color: 'blue'
}
```

### Modify Table Columns
Update `tableColumns` and `tableData` in `Dashboard.tsx`:
```typescript
const tableColumns = [
  { key: 'yourKey', label: 'Your Column' },
  // ...
];
```

## 🔧 Common Tasks

### Build for Production
```bash
npm run build
```
Output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Run Linter
```bash
npm run lint
```

## 📊 Integrating Real Charts

### Option 1: Recharts (Recommended)
```bash
npm install recharts
```

Replace chart placeholder with:
```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

<LineChart data={yourData}>
  <Line type="monotone" dataKey="value" stroke="#3b82f6" />
  <XAxis dataKey="name" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
</LineChart>
```

### Option 2: Chart.js
```bash
npm install chart.js react-chartjs-2
```

## 🎯 Next Steps

1. **Connect to API**: Replace mock data with real API calls
2. **Add Authentication**: Implement user login/logout
3. **Add More Charts**: Replace placeholders with real visualizations
4. **Customize Filters**: Add more filter options based on your data
5. **Add Export**: Implement CSV/PDF export functionality

## 💡 Pro Tips

- Use the `data` prop to pass real data to components
- Dark mode state is automatically saved to localStorage
- All components are TypeScript typed for better development experience
- Responsive design works on all screen sizes

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port.

### Styling Not Working
Make sure Tailwind is processing your files:
```bash
npm run dev
```

### TypeScript Errors
Check your `tsconfig.json` settings and ensure all dependencies are installed.

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Lucide Icons](https://lucide.dev)

Happy coding! 🎉
