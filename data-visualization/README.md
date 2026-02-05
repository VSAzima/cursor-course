# Data Analytics Dashboard

A modern, professional data analytics dashboard built with React, TypeScript, Vite, and Tailwind CSS. Features include KPI cards, chart placeholders, data tables, filter controls, and full dark mode support.

## Features

### 📊 Data Visualization
- **KPI Cards**: Display key performance indicators with trend indicators
- **Chart Placeholders**: Ready-to-integrate placeholders for Line, Bar, Pie, and Area charts
- **Data Tables**: Sortable, searchable tables with pagination
- **Professional Design**: Clean, modern interface with smooth transitions

### 🎨 User Interface
- **Dark Mode Support**: Full dark mode with system preference detection
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Tailwind CSS**: Modern utility-first CSS framework
- **Custom Color Scheme**: Professional color palette with primary blue theme

### 🔍 Data Controls
- **Filter Panel**: Multi-select filters for Region, Status, and Category
- **Date Range Selector**: Quick select buttons and custom date range picker
- **Search Functionality**: Real-time search across table data
- **Sort Capabilities**: Column-based sorting with visual indicators

### 🚀 Performance
- **React 18**: Latest React features and optimizations
- **TypeScript**: Type-safe code for better developer experience
- **Vite**: Lightning-fast build tool and development server
- **Code Splitting**: Optimized bundle sizes

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Navigate to the project directory:
```bash
cd /Users/nkatanaeva/titled_folder/data-visualization
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── Header.tsx           # Top header with actions
│   │   ├── TaskCard.tsx         # Product/task cards
│   │   ├── StatWidget.tsx       # KPI statistics widgets
│   │   ├── DarkModeToggle.tsx   # Dark mode toggle
│   │   └── Dashboard.tsx        # Main dashboard layout
│   ├── ChartPlaceholder.tsx     # Chart visualization placeholders
│   ├── DataTable.tsx            # Sortable data table
│   ├── FilterPanel.tsx          # Filter controls
│   └── DateRangeSelector.tsx    # Date range picker
├── types/
│   └── dashboard.ts             # TypeScript type definitions
├── App.tsx                       # Root component with dark mode
├── main.tsx                      # Application entry point
└── index.css                     # Global styles with Tailwind
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Adding Real Charts
The chart placeholders are ready to integrate with popular charting libraries:

- **Chart.js + react-chartjs-2**
- **Recharts**
- **Victory**
- **D3.js**

### Modifying Colors
Update the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Adding More Stats
Add new stat widgets in `Dashboard.tsx` by extending the `statsData` array:

```typescript
{
  title: 'Your Metric',
  value: '$XX,XXX',
  change: '+X.X%',
  trend: 'up',
  icon: YourIcon,
  color: 'blue'
}
```

## Dark Mode

Dark mode is automatically persisted to localStorage and can be toggled via the sun/moon icon in the header. The implementation uses Tailwind's `dark:` variant and the `class` strategy.

## Technologies Used

- **React 18.3** - UI library
- **TypeScript 5.5** - Type safety
- **Vite 5.4** - Build tool
- **Tailwind CSS 3.4** - Styling
- **Lucide React** - Icon library

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

For issues or questions, please create an issue in the project repository.
