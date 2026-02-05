# Project Structure

## Directory Layout

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Sidebar.tsx          # Navigation sidebar with menu items
│   │   ├── Header.tsx            # Top header with title and actions
│   │   ├── TaskCard.tsx          # Individual task/product card component
│   │   ├── StatWidget.tsx        # KPI/statistics widget
│   │   ├── DarkModeToggle.tsx    # Dark mode toggle button
│   │   └── Dashboard.tsx         # Main dashboard layout
│   ├── ChartPlaceholder.tsx      # Chart visualization placeholders
│   ├── DataTable.tsx             # Sortable data table component
│   ├── FilterPanel.tsx           # Filter controls panel
│   └── DateRangeSelector.tsx     # Date range picker
└── types/
    └── dashboard.ts              # TypeScript type definitions
```

## Component Overview

### Dashboard Components

#### `Dashboard.tsx`
Main dashboard container that orchestrates all components. Manages:
- Dashboard state (filters, date ranges)
- Data for stats, tasks, and tables
- Layout structure with sidebar

#### `Header.tsx`
Top navigation header featuring:
- Dashboard title and subtitle
- Dark mode toggle
- Action buttons (Refresh, Export)

#### `Sidebar.tsx`
Left navigation sidebar with:
- Logo and branding
- Navigation menu items
- Active state management
- User profile section

#### `StatWidget.tsx`
KPI cards displaying key metrics:
- Title and value
- Trend indicators (up/down)
- Percentage change
- Color-coded icons

#### `TaskCard.tsx`
Individual product/task cards showing:
- Product name and region
- Revenue and orders
- Status badge
- Quick actions

#### `DarkModeToggle.tsx`
Standalone dark mode toggle:
- Sun/moon icon switching
- Persisted to localStorage
- Accessible button

### Shared Components

#### `ChartPlaceholder.tsx`
Ready-to-integrate chart areas for:
- Line charts
- Bar charts
- Pie charts
- Area charts

#### `DataTable.tsx`
Full-featured data table with:
- Column sorting
- Search functionality
- Pagination
- Status badges

#### `FilterPanel.tsx`
Multi-criteria filtering:
- Region selector
- Status selector
- Category selector
- Reset/apply actions

#### `DateRangeSelector.tsx`
Flexible date selection:
- Quick select buttons
- Custom date range
- Calendar inputs

## Type Definitions

### `types/dashboard.ts`

**StatData**
```typescript
{
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'green' | 'blue' | 'purple' | 'orange';
}
```

**TaskData**
```typescript
{
  id: number;
  product: string;
  revenue: string;
  orders: number;
  status: 'Active' | 'Inactive' | 'Pending';
  region: string;
}
```

**Filters**
```typescript
{
  region: string;
  status: string;
  category: string;
}
```

**DateRange**
```typescript
{
  start: string;
  end: string;
}
```

**DashboardProps**
```typescript
{
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}
```

## Component Hierarchy

```
App
└── Dashboard
    ├── Sidebar
    ├── Header
    │   └── DarkModeToggle
    ├── FilterPanel
    ├── DateRangeSelector
    ├── StatWidget (x4)
    ├── TaskCard (x3)
    ├── ChartPlaceholder (x4)
    └── DataTable
```

## Data Flow

1. **App.tsx** - Manages dark mode state at the root level
2. **Dashboard.tsx** - Manages filters, date range, and data
3. **Child Components** - Receive data and callbacks via props
4. **Type Safety** - All props are typed using `types/dashboard.ts`

## Styling System

- **Framework**: Tailwind CSS 3.4
- **Dark Mode**: Class-based strategy (`dark:` prefix)
- **Colors**: Custom primary color palette
- **Responsive**: Mobile-first breakpoints (sm, md, lg, xl)

## File Responsibilities

### Dashboard Directory
All dashboard-specific components grouped together for better organization.

### Types Directory
Centralized type definitions for type safety and reusability.

### Shared Components
Components outside Dashboard/ are reusable across different views.

## Import Patterns

### Importing Dashboard Components
```typescript
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Dashboard/Header';
import StatWidget from './components/Dashboard/StatWidget';
```

### Importing Types
```typescript
import type { StatData, TaskData, DashboardProps } from './types/dashboard';
```

### Importing Shared Components
```typescript
import ChartPlaceholder from '../ChartPlaceholder';
import DataTable from '../DataTable';
```

## Key Features by Component

### Sidebar
- 8 navigation items
- Active state highlighting
- User profile display
- Responsive (hidden on mobile)

### Header
- Branding and title
- Dark mode toggle
- Action buttons
- Responsive layout

### StatWidget
- 4 color variants
- Trend visualization
- Percentage changes
- Icon-based indicators

### TaskCard
- Card-based layout
- Revenue/orders display
- Status badges
- Action menu

### DataTable
- Sortable columns
- Real-time search
- Pagination controls
- Status color coding

## Extension Points

### Adding New Dashboard Items
1. Add menu item to `Sidebar.tsx` menuItems array
2. Create route/view component
3. Update active state logic

### Adding New Stats
1. Define data in `Dashboard.tsx` statsData array
2. Follows StatData type from `types/dashboard.ts`
3. Automatically renders in grid layout

### Adding New Task Cards
1. Add to `Dashboard.tsx` tasksData array
2. Follows TaskData type
3. TaskCard component handles rendering

## Best Practices

1. **Type Safety**: Always import and use types from `types/dashboard.ts`
2. **Component Size**: Keep components focused and single-responsibility
3. **Props**: Pass only necessary data, avoid prop drilling
4. **State**: Manage state at appropriate levels (local vs global)
5. **Styling**: Use Tailwind utilities, maintain dark mode support
6. **Accessibility**: Include ARIA labels and semantic HTML

## Performance Considerations

- **Lazy Loading**: Ready for React.lazy() on routes
- **Memoization**: Consider memo() for expensive components
- **Virtual Scrolling**: For large data tables
- **Code Splitting**: Organized structure supports easy splitting

## Future Enhancements

- Add routing (React Router)
- State management (Zustand/Redux)
- API integration layer
- Real chart implementations
- More dashboard views
- User settings persistence
