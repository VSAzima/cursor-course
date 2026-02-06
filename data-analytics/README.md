# Data Analytics Dashboard

A modern, professional data analytics dashboard built with React, TypeScript, Vite, and Tailwind CSS. Features comprehensive data visualization capabilities, KPI tracking, and full dark mode support.

## Features

- **KPI Cards**: Track key performance indicators with trend indicators
- **Chart Components**: Mock chart visualizations (Line, Area, Pie, Bar)
- **Data Tables**: Searchable, paginated tables with filtering
- **Filter Controls**: Category and status filters with active indicators
- **Date Range Selector**: Custom date inputs and quick range buttons
- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive Design**: Mobile-first design that works on all devices
- **Loading States**: Skeleton loaders and loading overlays

## Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

## Installation

1. Navigate to the project directory:

```bash
cd /Users/nkatanaeva/titled_folder/data-analytics
```

1. Install dependencies:

```bash
npm install
```

1. Install Playwright browsers (for E2E tests):

```bash
npx playwright install --with-deps chromium firefox webkit
```

## Development

### Start Development Server

```bash
npm run dev
```

Then open **[http://localhost:5173](http://localhost:5173)** in your browser.

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Testing

### Run E2E Tests

```bash
npm run test:e2e
```

This will:

- Start the dev server automatically
- Run all Playwright tests across multiple browsers
- Generate HTML and JSON reports

### View Test Report

```bash
npm run test:e2e:report
```

Or manually:

```bash
npx playwright show-report
```

### Run Tests in UI Mode (Interactive)

```bash
npm run test:e2e:ui
```

### Run Tests for Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Project Structure

```
data-analytics/
├── src/
│   ├── components/          # React components
│   │   ├── charts/         # Chart mock components
│   │   └── skeletons/      # Loading skeleton components
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── e2e/                    # Playwright E2E tests
├── public/                 # Static assets
└── playwright.config.ts    # Playwright configuration
```

## Technology Stack

- **React 18.3.1** - UI library
- **TypeScript 5.4.5** - Type safety
- **Vite 5.2.11** - Build tool and dev server
- **Tailwind CSS 3.4.3** - Utility-first CSS framework
- **Playwright 1.40.0** - E2E testing framework
- **Lucide React** - Icon library

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run tests in interactive UI mode
- `npm run test:e2e:report` - View test report

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Documentation

- **README.md** - This file (setup and usage)
- **TEST_REPORT.md** - Playwright E2E test report
- **AI_PROMPTS.md** - Brief explanation of AI prompts used

## License

MIT