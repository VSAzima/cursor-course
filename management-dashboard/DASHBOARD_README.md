# Task Management Dashboard

A fully responsive task management dashboard with dark mode support, built with React, TypeScript, and Tailwind CSS.

## 🎯 Features

### Core Functionality
- ✅ **Responsive Sidebar Navigation** - Collapsible sidebar with smooth animations
- ✅ **Smart Header** - Search, notifications, dark mode toggle, and user menu
- ✅ **Statistics Widgets** - Real-time metrics with trend indicators
- ✅ **Task Cards** - Comprehensive task management with priority, status, and tags
- ✅ **Dark Mode** - Full dark mode support with smooth transitions
- ✅ **Accessibility** - WCAG compliant with keyboard navigation and ARIA labels

### Design Features
- 🎨 Modern, clean interface
- 📱 Mobile-first responsive design
- 🌙 Dark mode with one-click toggle
- ✨ Smooth animations and transitions
- 🎯 Color-coded priorities and statuses
- 💅 Tailwind CSS utility classes

### Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md to lg)
- **Desktop**: > 1024px (lg+)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd management-dashboard
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The dashboard will be available at `http://localhost:5173`

## 📁 Components Overview

### Layout Components

#### Sidebar (`src/components/layout/Sidebar.tsx`)
- Collapsible navigation sidebar
- Active state indicators
- Badge notifications
- User profile section
- Smooth collapse/expand animation

**Props:**
- `items`: Array of navigation items
- `onItemClick`: Callback when item is clicked
- `isCollapsed`: Collapsed state
- `onToggle`: Toggle callback

#### Header (`src/components/layout/Header.tsx`)
- Fixed header with search bar
- Dark mode toggle
- Notifications dropdown
- User profile menu
- Responsive mobile menu

**Props:**
- `onMenuToggle`: Mobile menu toggle callback
- `isSidebarCollapsed`: Sidebar state for positioning

### Dashboard Components

#### StatCard (`src/components/dashboard/StatCard.tsx`)
- Display key metrics
- Trend indicators (up/down)
- Color-coded icons
- Responsive sizing

**Props:**
- `title`: Metric title
- `value`: Metric value
- `icon`: Icon element
- `change`: Optional trend data
- `color`: Color theme (blue, green, purple, orange)

#### TaskCard (`src/components/dashboard/TaskCard.tsx`)
- Complete task information
- Priority levels (low, medium, high)
- Status indicators (todo, in-progress, review, completed)
- Assignee avatar
- Due date display
- Tags support
- Edit/delete actions

**Props:**
- `title`: Task title
- `description`: Task description
- `priority`: Priority level
- `status`: Current status
- `assignee`: Assignee information
- `dueDate`: Due date string
- `tags`: Array of tags
- `onEdit`: Edit callback
- `onDelete`: Delete callback

## 🎨 Customization

### Colors

Update colors in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#your-color',
    // ... other shades
  },
}
```

### Dark Mode

Dark mode is enabled by adding the `dark` class to `<html>`:

```typescript
// Toggle dark mode
document.documentElement.classList.toggle('dark')
```

All components use Tailwind's `dark:` prefix for dark mode styles:

```html
<div className="bg-white dark:bg-gray-900">
```

### Responsive Design

Uses Tailwind's responsive prefixes:

```html
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

## 🔧 Component Usage Examples

### Sidebar Navigation

```typescript
import { Sidebar } from './components/layout'

const items = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '#',
    icon: <DashboardIcon />,
  },
  {
    id: 'tasks',
    label: 'Tasks',
    href: '#',
    badge: 12,
    icon: <TaskIcon />,
  },
]

<Sidebar
  items={items}
  onItemClick={(id) => console.log(id)}
  isCollapsed={false}
  onToggle={() => {}}
/>
```

### Statistics Card

```typescript
import { StatCard } from './components/dashboard'

<StatCard
  title="Total Tasks"
  value="124"
  color="blue"
  change={{ value: 12, trend: 'up' }}
  icon={<TaskIcon />}
/>
```

### Task Card

```typescript
import { TaskCard } from './components/dashboard'

<TaskCard
  title="Design new landing page"
  description="Create mockups for the new product landing page"
  priority="high"
  status="in-progress"
  assignee={{ name: 'Sarah Wilson' }}
  dueDate="Today"
  tags={['Design', 'UI/UX']}
  onEdit={() => console.log('Edit')}
  onDelete={() => console.log('Delete')}
/>
```

## ♿ Accessibility Features

### Keyboard Navigation
- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close dropdowns and menus

### Screen Reader Support
- Semantic HTML elements (`<nav>`, `<header>`, `<main>`)
- ARIA labels for all interactive elements
- ARIA states (expanded, current, etc.)
- Descriptive button labels

### Focus Management
- Clear focus indicators with ring utilities
- Focus visible on all interactive elements
- Logical tab order

### Color Contrast
- WCAG AA compliant contrast ratios
- Dark mode meets accessibility standards
- Status colors distinguishable

## 📱 Responsive Behavior

### Mobile (< 768px)
- Sidebar hidden by default
- Hamburger menu in header
- Single column layout
- Touch-optimized interactions

### Tablet (768px - 1024px)
- Sidebar visible
- 2-column grid for tasks
- Optimized spacing

### Desktop (> 1024px)
- Full sidebar visible
- 3-column grid for tasks
- Hover effects enabled

## 🎯 Status & Priority Colors

### Priority Levels
- **High**: Red (`red-100`, `red-700`)
- **Medium**: Yellow (`yellow-100`, `yellow-700`)
- **Low**: Green (`green-100`, `green-700`)

### Status Colors
- **To Do**: Gray (`gray-100`, `gray-700`)
- **In Progress**: Blue (`blue-100`, `blue-700`)
- **In Review**: Purple (`purple-100`, `purple-700`)
- **Completed**: Green (`green-100`, `green-700`)

## 🔍 Code Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   ├── Header.tsx        # Top header bar
│   │   └── index.ts
│   └── dashboard/
│       ├── StatCard.tsx      # Statistics widget
│       ├── TaskCard.tsx      # Task card component
│       └── index.ts
├── pages/
│   └── Dashboard.tsx         # Main dashboard page
├── App.tsx                    # Root component
└── index.css                  # Global styles
```

## 💡 Best Practices

### Component Design
- Keep components focused and reusable
- Use TypeScript interfaces for props
- Export types alongside components
- Follow single responsibility principle

### Styling
- Use Tailwind utility classes
- Follow dark mode conventions (`dark:`)
- Use responsive prefixes (`sm:`, `md:`, `lg:`)
- Maintain consistent spacing

### State Management
- Local state for UI (sidebar, dropdowns)
- Lift state when needed
- Consider global state for complex apps

### Accessibility
- Always provide ARIA labels
- Use semantic HTML
- Test with keyboard only
- Verify with screen readers

## 🚀 Next Steps

### Immediate Enhancements
1. **Add routing** - Implement React Router for multi-page navigation
2. **Connect API** - Integrate with backend services
3. **Add forms** - Create/edit task functionality
4. **Implement search** - Filter and search tasks
5. **Add drag & drop** - Reorder tasks

### Advanced Features
- [ ] Real-time updates with WebSocket
- [ ] Task filtering and sorting
- [ ] Kanban board view
- [ ] Calendar integration
- [ ] Team collaboration features
- [ ] File attachments
- [ ] Comments and activity feed
- [ ] Analytics and reporting

## 📚 Dependencies

- **React**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Vite**: Build tool

## 🐛 Troubleshooting

### Dark mode not working
Ensure the HTML element has the `dark` class:
```javascript
document.documentElement.classList.add('dark')
```

### Sidebar not responsive
Check that viewport meta tag is in `index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Styles not applying
Rebuild Tailwind:
```bash
npm run dev
```

## 📖 Learn More

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Built with** ❤️ **using React, TypeScript, and Tailwind CSS**
