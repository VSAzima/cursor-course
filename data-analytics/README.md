# Data Analytics Dashboard

A modern, professional data analytics dashboard built with React, TypeScript, Vite, and Tailwind CSS. Features comprehensive data visualization capabilities, KPI tracking, and full dark mode support.

## Features

### ✨ Core Features
- **KPI Cards**: Track key performance indicators with trend indicators
- **Chart Placeholders**: Ready-to-integrate placeholders for line, bar, pie, and area charts
- **Data Tables**: Sortable, searchable tables with pagination
- **Filter Controls**: Sidebar with category and status filters
- **Date Range Selector**: Quick range buttons and custom date pickers
- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive Design**: Mobile-first design that works on all devices

### 🎨 Design
- Modern, professional UI with Tailwind CSS
- Smooth transitions and hover effects
- Consistent color scheme with primary brand colors
- Accessible color contrasts in both light and dark modes

### 📊 Dashboard Components

#### KPI Cards
- Revenue tracking
- Active users monitoring
- Conversion rate metrics
- Average session duration
- Trend indicators (up/down arrows)
- Percentage change comparisons

#### Chart Placeholders
- **Line Chart**: Revenue trends over time
- **Area Chart**: User growth visualization
- **Pie Chart**: Traffic source distribution
- **Bar Chart**: Monthly comparisons

#### Data Table
- Recent activities overview
- Search functionality
- Pagination controls
- Status badges (Active, Pending, Completed)
- Sortable columns
- Responsive design

#### Filters & Controls
- Category filtering (Sales, Marketing, Product)
- Status filtering (Active, Pending, Completed)
- Date range selection
- Quick range buttons (Today, Last 7/30/90 days)
- Clear all filters option

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd /Users/nkatanaeva/titled_folder/data-analytics
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
data-analytics/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx          # Main dashboard container
│   │   ├── KPICard.tsx            # KPI metric cards
│   │   ├── ChartPlaceholder.tsx   # Chart visualization placeholders
│   │   ├── DataTable.tsx          # Data table with pagination
│   │   ├── FilterPanel.tsx        # Sidebar filter controls
│   │   └── DateRangeSelector.tsx  # Date range picker
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── App.tsx                    # Root component with dark mode
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── vite.config.ts                 # Vite configuration
└── README.md                      # This file
```

## Customization

### Adding Real Charts

The dashboard uses chart placeholders that are ready for integration with popular charting libraries:

**Recommended Libraries:**
- [Recharts](https://recharts.org/) - React-specific charting library
- [Chart.js](https://www.chartjs.org/) with [react-chartjs-2](https://react-chartjs-2.js.org/)
- [Victory](https://formidable.com/open-source/victory/)
- [Nivo](https://nivo.rocks/)

To integrate real charts, replace the `ChartPlaceholder` components in `Dashboard.tsx` with your chosen chart library components.

### Customizing Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors here
      },
    },
  },
}
```

### Adding More Filters

Add new filter options in `Dashboard.tsx`:

```typescript
const newFilterOptions: FilterOption[] = [
  { id: 'option1', label: 'Option 1', value: 'option1' },
  // Add more options...
];
```

### Connecting to Real Data

Replace mock data in components with API calls:

```typescript
// Example: Fetch KPI data
useEffect(() => {
  fetch('/api/kpis')
    .then(res => res.json())
    .then(data => setKPIs(data));
}, []);
```

## Dark Mode

Dark mode is automatically detected from system preferences and can be toggled using the moon/sun icon in the header. The preference is saved to localStorage.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **date-fns** - Date manipulation

## Performance

- Fast development with Vite HMR
- Optimized production builds
- Lazy loading ready
- Minimal bundle size

## Contributing

Feel free to customize and extend this dashboard for your specific needs!

## License

MIT License - feel free to use this dashboard in your projects.
