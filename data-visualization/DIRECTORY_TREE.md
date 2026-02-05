# Complete Directory Tree

## Full Project Structure

```
data-visualization/
│
├── public/
│   └── vite.svg                      # Favicon
│
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx         # Main dashboard container
│   │   │   ├── Header.tsx            # Top navigation header
│   │   │   ├── Sidebar.tsx           # Left navigation sidebar
│   │   │   ├── StatWidget.tsx        # KPI/statistics card
│   │   │   ├── TaskCard.tsx          # Product/task card component
│   │   │   └── DarkModeToggle.tsx    # Dark mode toggle button
│   │   │
│   │   ├── ChartPlaceholder.tsx      # Chart placeholders
│   │   ├── DataTable.tsx             # Sortable data table
│   │   ├── FilterPanel.tsx           # Filter controls
│   │   └── DateRangeSelector.tsx     # Date range picker
│   │
│   ├── types/
│   │   └── dashboard.ts              # TypeScript type definitions
│   │
│   ├── App.tsx                       # Root application component
│   ├── main.tsx                      # Application entry point
│   ├── index.css                     # Global styles (Tailwind)
│   └── vite-env.d.ts                 # Vite type definitions
│
├── .gitignore                        # Git ignore rules
├── eslint.config.js                  # ESLint configuration
├── index.html                        # HTML entry point
├── package.json                      # Dependencies and scripts
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── tsconfig.node.json                # TypeScript config for Node
├── vite.config.ts                    # Vite build configuration
│
├── README.md                         # Main documentation
├── QUICKSTART.md                     # Quick start guide
├── PROJECT_OVERVIEW.md               # Technical overview
├── STRUCTURE.md                      # Structure documentation
├── MIGRATION.md                      # Migration guide
└── DIRECTORY_TREE.md                 # This file
```

## Component Tree Visualization

```
App
│
└── Dashboard
    │
    ├── Sidebar
    │   ├── Logo Section
    │   ├── Navigation Menu
    │   │   ├── Dashboard
    │   │   ├── Analytics
    │   │   ├── Reports
    │   │   ├── Trends
    │   │   ├── Calendar
    │   │   ├── Users
    │   │   ├── Notifications
    │   │   └── Settings
    │   └── User Profile
    │
    ├── Header
    │   ├── Title & Subtitle
    │   ├── DarkModeToggle
    │   ├── Refresh Button
    │   └── Export Button
    │
    └── Main Content
        │
        ├── Controls Bar
        │   ├── Filter Button
        │   ├── DateRangeSelector
        │   └── Last Updated
        │
        ├── FilterPanel (conditional)
        │   ├── Region Select
        │   ├── Status Select
        │   ├── Category Select
        │   ├── Reset Button
        │   └── Apply Button
        │
        ├── Stats Grid
        │   ├── StatWidget (Revenue)
        │   ├── StatWidget (Users)
        │   ├── StatWidget (Orders)
        │   └── StatWidget (Conversion)
        │
        ├── Task Cards Section
        │   ├── TaskCard (Premium Plan)
        │   ├── TaskCard (Basic Plan)
        │   └── TaskCard (Enterprise Plan)
        │
        ├── Charts Grid
        │   ├── ChartPlaceholder (Line)
        │   ├── ChartPlaceholder (Bar)
        │   ├── ChartPlaceholder (Pie)
        │   └── ChartPlaceholder (Area)
        │
        └── DataTable
            ├── Search Bar
            ├── Table Headers (sortable)
            ├── Table Rows
            └── Pagination
```

## File Sizes Overview

| File | Lines | Purpose |
|------|-------|---------|
| `Dashboard.tsx` | ~215 | Main dashboard orchestration |
| `Header.tsx` | ~60 | Top navigation and actions |
| `Sidebar.tsx` | ~95 | Navigation menu and profile |
| `StatWidget.tsx` | ~70 | KPI statistics display |
| `TaskCard.tsx` | ~65 | Product/task card |
| `DarkModeToggle.tsx` | ~25 | Dark mode toggle |
| `ChartPlaceholder.tsx` | ~85 | Chart placeholder |
| `DataTable.tsx` | ~175 | Sortable data table |
| `FilterPanel.tsx` | ~120 | Filter controls |
| `DateRangeSelector.tsx` | ~90 | Date range selector |
| `dashboard.ts` | ~45 | Type definitions |

## Import Relationship Map

```
App.tsx
  └─ imports → Dashboard/Dashboard.tsx
                 ├─ imports → Dashboard/Header.tsx
                 │             └─ imports → Dashboard/DarkModeToggle.tsx
                 ├─ imports → Dashboard/Sidebar.tsx
                 ├─ imports → Dashboard/StatWidget.tsx
                 ├─ imports → Dashboard/TaskCard.tsx
                 ├─ imports → ChartPlaceholder.tsx
                 ├─ imports → DataTable.tsx
                 ├─ imports → FilterPanel.tsx
                 ├─ imports → DateRangeSelector.tsx
                 └─ imports → types/dashboard.ts
```

## Props Flow

```
App (darkMode state)
  │
  └─ Dashboard
      │
      ├─ Header (darkMode, setDarkMode)
      │   └─ DarkModeToggle (darkMode, setDarkMode)
      │
      ├─ Sidebar ()
      │
      ├─ StatWidget (title, value, change, trend, icon, color)
      │
      ├─ TaskCard (task: TaskData)
      │
      ├─ ChartPlaceholder (title, subtitle, type)
      │
      ├─ DataTable (title, subtitle, columns, data)
      │
      ├─ FilterPanel (filters, setFilters, onClose)
      │
      └─ DateRangeSelector (dateRange, setDateRange)
```

## State Management

### App Level
```
darkMode: boolean (localStorage)
```

### Dashboard Level
```
showFilters: boolean
dateRange: { start: string, end: string }
filters: { region: string, status: string, category: string }
statsData: StatData[]
tasksData: TaskData[]
tableColumns: TableColumn[]
```

### Sidebar Level
```
activeItem: string
```

## Type Dependencies

```
types/dashboard.ts
  │
  ├─ StatData
  │   └─ used by → StatWidget.tsx
  │   └─ used by → Dashboard.tsx (statsData)
  │
  ├─ TaskData
  │   └─ used by → TaskCard.tsx
  │   └─ used by → Dashboard.tsx (tasksData)
  │   └─ used by → DataTable.tsx (data prop)
  │
  ├─ TableColumn
  │   └─ used by → DataTable.tsx
  │   └─ used by → Dashboard.tsx (tableColumns)
  │
  ├─ Filters
  │   └─ used by → FilterPanel.tsx
  │   └─ used by → Dashboard.tsx (filters state)
  │
  ├─ DateRange
  │   └─ used by → DateRangeSelector.tsx
  │   └─ used by → Dashboard.tsx (dateRange state)
  │
  └─ DashboardProps
      └─ used by → Dashboard.tsx
      └─ used by → Header.tsx
```

## Styling Organization

### Tailwind Classes by Purpose

**Layout**
- `flex`, `grid`, `max-w-7xl`, `mx-auto`, `px-4`

**Colors**
- Light: `bg-white`, `text-gray-900`, `border-gray-200`
- Dark: `dark:bg-gray-800`, `dark:text-white`, `dark:border-gray-700`

**Spacing**
- `p-6`, `mb-8`, `gap-6`, `py-4`

**Typography**
- `text-2xl`, `font-bold`, `text-sm`, `font-medium`

**Interactions**
- `hover:bg-gray-50`, `transition-colors`, `cursor-pointer`

**Responsive**
- `md:grid-cols-2`, `lg:grid-cols-4`, `sm:px-6`

## Build Output Structure

```
dist/
├── assets/
│   ├── index-[hash].js      # Main bundle
│   ├── index-[hash].css     # Compiled styles
│   └── vite.svg             # Copied assets
└── index.html               # Entry point
```

## Development Workflow

```
1. npm install        → Install dependencies
2. npm run dev       → Start dev server (localhost:5173)
3. Edit components   → Hot reload
4. npm run lint      → Check code quality
5. npm run build     → Production build
6. npm run preview   → Preview production build
```

## Feature Map

### Header
- ✅ Title and subtitle
- ✅ Dark mode toggle
- ✅ Refresh button
- ✅ Export button

### Sidebar
- ✅ Logo/branding
- ✅ 8 navigation items
- ✅ Active state
- ✅ User profile
- ✅ Responsive hiding

### StatWidget
- ✅ 4 color variants
- ✅ Trend indicators
- ✅ Percentage changes
- ✅ Icon display

### TaskCard
- ✅ Product info
- ✅ Revenue/orders
- ✅ Status badges
- ✅ Action menu

### ChartPlaceholder
- ✅ 4 chart types
- ✅ Mock visualizations
- ✅ Legend display

### DataTable
- ✅ Column sorting
- ✅ Search functionality
- ✅ Pagination
- ✅ Status badges

### FilterPanel
- ✅ 3 filter types
- ✅ Active count badge
- ✅ Reset/apply

### DateRangeSelector
- ✅ Quick select buttons
- ✅ Custom date inputs
- ✅ Calendar icon

## Quick Reference

### To Add a New Stat
Edit: `src/components/Dashboard/Dashboard.tsx`
```typescript
statsData: StatData[] = [...]
```

### To Add a Sidebar Item
Edit: `src/components/Dashboard/Sidebar.tsx`
```typescript
menuItems = [...]
```

### To Add a Type
Edit: `src/types/dashboard.ts`
```typescript
export interface NewType { ... }
```

### To Modify Header
Edit: `src/components/Dashboard/Header.tsx`

### To Customize Sidebar
Edit: `src/components/Dashboard/Sidebar.tsx`

### To Change Dark Mode Behavior
Edit: `src/App.tsx` (state management)
Edit: `src/components/Dashboard/DarkModeToggle.tsx` (UI)

## Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation and setup |
| `QUICKSTART.md` | Quick start guide for beginners |
| `PROJECT_OVERVIEW.md` | Comprehensive technical overview |
| `STRUCTURE.md` | Component structure documentation |
| `MIGRATION.md` | Migration guide from old structure |
| `DIRECTORY_TREE.md` | This file - visual tree reference |

---

**Last Updated**: 2026-02-05
**Structure Version**: 2.0
**Total Components**: 11
**Total Types**: 9
