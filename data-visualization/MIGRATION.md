# Structure Migration Guide

## Overview

The dashboard has been reorganized to follow a cleaner, more scalable directory structure. This guide explains the changes and how to work with the new organization.

## What Changed

### Old Structure
```
src/components/
├── Dashboard.tsx
├── KPICard.tsx
├── ChartPlaceholder.tsx
├── DataTable.tsx
├── FilterPanel.tsx
└── DateRangeSelector.tsx
```

### New Structure
```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── TaskCard.tsx
│   │   ├── StatWidget.tsx
│   │   ├── DarkModeToggle.tsx
│   │   └── Dashboard.tsx
│   ├── ChartPlaceholder.tsx
│   ├── DataTable.tsx
│   ├── FilterPanel.tsx
│   └── DateRangeSelector.tsx
└── types/
    └── dashboard.ts
```

## Component Renaming

| Old Name | New Name | Location |
|----------|----------|----------|
| `KPICard.tsx` | `StatWidget.tsx` | `components/Dashboard/` |
| `Dashboard.tsx` | `Dashboard.tsx` | `components/Dashboard/` (moved) |

## New Components

### `Sidebar.tsx`
A fully functional navigation sidebar with:
- 8 menu items (Dashboard, Analytics, Reports, etc.)
- Active state highlighting
- User profile section at bottom
- Responsive (hidden on mobile, visible on desktop)

**Features:**
- Logo and branding area
- Icon + label navigation items
- Smooth hover transitions
- User avatar with email display

### `Header.tsx`
Extracted header section featuring:
- Dashboard title and subtitle
- Dark mode toggle component
- Action buttons (Refresh, Export)
- Click handlers for actions

### `DarkModeToggle.tsx`
Standalone dark mode toggle component:
- Sun/moon icon switching
- Accessible button with aria-label
- Extracted for reusability

### `TaskCard.tsx`
Individual product/task card component:
- Card-based display
- Revenue and orders metrics
- Status badges
- Action menu (3-dot menu)
- "View Details" link

## Type Definitions

All TypeScript interfaces moved to `src/types/dashboard.ts`:

```typescript
// Available types:
- StatData          // For stat widgets
- TaskData          // For task cards
- TableColumn       // For table columns
- Filters           // For filter state
- DateRange         // For date range
- DashboardProps    // For dashboard props
- ColorVariant      // Type alias
- TrendType         // Type alias
- ChartType         // Type alias
```

## Import Changes

### Before
```typescript
import Dashboard from './components/Dashboard';
import KPICard from './components/KPICard';
```

### After
```typescript
import Dashboard from './components/Dashboard/Dashboard';
import StatWidget from './components/Dashboard/StatWidget';
import type { StatData } from './types/dashboard';
```

## Data Structure Changes

### KPI Data → Stats Data
```typescript
// Before
const kpiData = [ ... ];

// After
const statsData: StatData[] = [ ... ];
```

### Added Task Data
```typescript
// New in Dashboard.tsx
const tasksData: TaskData[] = [ ... ];
```

## Layout Changes

### New Flex Layout
The dashboard now uses a flex layout with sidebar:

```typescript
<div className="flex min-h-screen">
  <Sidebar />
  <div className="flex-1 flex flex-col">
    <Header />
    <main>
      {/* Dashboard content */}
    </main>
  </div>
</div>
```

### Sidebar Visibility
- **Desktop (lg+)**: Sidebar visible (fixed 64rem width)
- **Mobile/Tablet**: Sidebar hidden (can be enhanced with mobile menu)

## New Features

### 1. Task Cards Section
New section displaying top 3 products as cards:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {tasksData.slice(0, 3).map((task) => (
    <TaskCard key={task.id} task={task} />
  ))}
</div>
```

### 2. Navigation Menu
8 pre-configured menu items in sidebar:
- Dashboard (active by default)
- Analytics
- Reports
- Trends
- Calendar
- Users
- Notifications
- Settings

### 3. User Profile
User profile section in sidebar footer showing:
- Avatar with initials
- User name
- Email address

## Migration Steps

If you have custom code based on the old structure:

### Step 1: Update Imports
```typescript
// Old
import Dashboard from './components/Dashboard';

// New
import Dashboard from './components/Dashboard/Dashboard';
```

### Step 2: Rename Component References
```typescript
// Old
<KPICard {...data} />

// New
<StatWidget {...data} />
```

### Step 3: Add Type Imports
```typescript
import type { StatData, TaskData } from './types/dashboard';
```

### Step 4: Update Data Arrays
```typescript
// Rename kpiData to statsData
const statsData: StatData[] = [ ... ];
```

## Benefits of New Structure

### 1. Better Organization
- Dashboard-specific components grouped together
- Clear separation of concerns
- Easier to navigate codebase

### 2. Scalability
- Easy to add new dashboard types (create new folders)
- Shared components remain in root `components/`
- Types centralized for reuse

### 3. Type Safety
- All interfaces in one place
- Import types explicitly
- Better IDE autocomplete

### 4. Modularity
- Each component has single responsibility
- Header, Sidebar extracted for reuse
- DarkModeToggle can be used anywhere

### 5. Maintainability
- Clear file structure
- Logical component grouping
- Self-documenting organization

## Backward Compatibility

The old component files have been deleted:
- ❌ `src/components/Dashboard.tsx`
- ❌ `src/components/KPICard.tsx`

All functionality has been preserved and enhanced in the new structure.

## Testing Checklist

After migration, verify:
- [ ] Dashboard renders correctly
- [ ] Sidebar shows all menu items
- [ ] Header displays with title and actions
- [ ] Dark mode toggle works
- [ ] Stat widgets display metrics
- [ ] Task cards show product info
- [ ] Charts render in grid
- [ ] Data table is functional
- [ ] Filters work properly
- [ ] Date range selector works
- [ ] Responsive on mobile
- [ ] No console errors

## Next Steps

### Recommended Enhancements

1. **Add Routing**
   ```bash
   npm install react-router-dom
   ```
   Implement routing for sidebar menu items

2. **Mobile Menu**
   Add hamburger menu for mobile sidebar access

3. **State Management**
   Consider Zustand or Redux for complex state

4. **API Integration**
   Replace mock data with real API calls

5. **More Widgets**
   Create additional stat widget types

6. **Custom Dashboard Views**
   Allow users to customize layout

## Support

For questions or issues with the migration:
1. Check `STRUCTURE.md` for detailed component docs
2. Review `types/dashboard.ts` for type definitions
3. See example usage in `Dashboard.tsx`

## Reference Files

- `STRUCTURE.md` - Detailed structure documentation
- `README.md` - Main project documentation
- `QUICKSTART.md` - Quick start guide
- `PROJECT_OVERVIEW.md` - Technical overview
