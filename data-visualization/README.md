# Data Analytics Dashboard

A modern, professional data analytics dashboard built with React, TypeScript, Vite, and Tailwind CSS. Features include KPI cards, chart placeholders, data tables, filter controls, and full dark mode support.

## Features

- **KPI Cards**: Display key performance indicators with trend indicators
- **Chart Placeholders**: Ready-to-integrate placeholders for Line, Bar, Pie, and Area charts
- **Data Tables**: Sortable, searchable tables with pagination
- **Sidebar Navigation**: Collapsible on mobile, fixed on desktop
- **Header**: User menu dropdown and notifications
- **Task Cards**: Color-coded priorities and status indicators
- **Dark Mode**: Smooth theme transitions with localStorage persistence
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher (comes with Node.js)
- **Git**: For cloning the repository (optional)

## Setup Instructions

### 1. Install Dependencies

Navigate to the project directory and install all required packages:

```bash
cd /Users/nkatanaeva/titled_folder/data-visualization
npm install
```

This will install:
- React 18.3
- TypeScript 5.5
- Vite 5.4
- Tailwind CSS 3.4
- Playwright (for E2E testing)
- Other development dependencies

### 2. Start Development Server

Start the Vite development server:

```bash
npm run dev
```

The server will start on `http://localhost:5173` and automatically open in your browser.

**Note**: If port 5173 is already in use, Vite will automatically use the next available port.

### 3. Build for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

### 4. Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### 5. Run Tests

Run the Playwright E2E test suite:

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with interactive UI
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests step-by-step
npm run test:e2e:debug
```

**Note**: Tests require the dev server to be running. If port 5173 is in use, use:

```bash
npm run test:e2e:clean
```

This will kill any process on port 5173 before running tests.

### 6. Lint Code

Check code quality with ESLint:

```bash
npm run lint
```

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
│   ├── FilterPanel.tsx         # Filter controls
│   └── DateRangeSelector.tsx    # Date range picker
├── types/
│   └── dashboard.ts             # TypeScript type definitions
├── App.tsx                       # Root component
├── main.tsx                      # Application entry point
└── index.css                     # Global styles
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:e2e:ui` | Run tests with interactive UI |
| `npm run test:e2e:headed` | Run tests in headed mode |
| `npm run test:e2e:debug` | Debug tests step-by-step |
| `npm run test:e2e:clean` | Kill port 5173 and run tests |

## Technologies Used

- **React 18.3** - UI library
- **TypeScript 5.5** - Type safety
- **Vite 5.4** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Playwright** - E2E testing framework

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Testing

This project includes comprehensive E2E tests using Playwright. See `TEST_REPORT.md` for detailed test coverage and report information.

## License

MIT
