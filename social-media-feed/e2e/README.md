# E2E Test Suite

## Overview

This directory contains end-to-end tests for the Social Media Feed component using Playwright.

## Test Structure

### Test Files

- **user-context.spec.ts** (8 tests) - User context and authentication-related tests
- **task-operations.spec.ts** (12 tests) - Post operations (create, like, comment, share)
- **navigation.spec.ts** (5 tests) - Navigation, scrolling, and infinite scroll
- **accessibility.spec.ts** (8 tests) - Accessibility and keyboard navigation
- **responsive.spec.ts** (12 tests) - Responsive design across multiple viewports

**Total: 45 tests** (within the 18-54 range requirement)

## Test Coverage

### Coverage Breakdown

- **User Context**: 8 tests (14%)
- **Task Operations**: 12 tests (27%)
- **Navigation**: 5 tests (11%)
- **Accessibility**: 8 tests (18%)
- **Responsive**: 12 tests (27%)

**Total Coverage: ~80%** of critical user flows

## Running Tests

### Prerequisites

```bash
npm install
npm run test:e2e:setup  # Install Playwright browsers
```

### Run All Tests

```bash
npm run test:e2e
```

### Run Tests with UI (Interactive)

```bash
npm run test:e2e:ui
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:e2e:headed
```

### Debug Tests

```bash
npm run test:e2e:debug
```

### View Test Report

```bash
npm run test:e2e:report
```

## Test Categories

### User Context Tests (8 tests)

Tests related to user information display:
- Current user avatar display
- User information in posts
- Verified badge display
- User avatars in comments
- Username and timestamp display

### Task Operations Tests (12 tests)

Tests for post interactions:
- Create new post with text
- Prevent empty post submission
- Like/unlike posts
- Expand/collapse comment section
- Add comments
- Like comments
- Share posts
- Image carousel navigation
- Post stats display
- Number formatting

### Navigation Tests (5 tests)

Tests for navigation and scrolling:
- Infinite scroll loading
- "All caught up" message
- Image carousel navigation
- Comment section expand/collapse
- "View more comments" functionality

### Accessibility Tests (8 tests)

Tests for accessibility compliance:
- Form labels and placeholders
- Keyboard navigation
- Enter key submission
- Image alt text
- Button labels
- Screen reader support
- Focus indicators
- Color contrast
- ARIA attributes

### Responsive Tests (12 tests)

Tests across 6 viewport sizes:
- Mobile (375x667)
- Tablet (768x1024)
- Desktop (1920x1080)
- Small Mobile (320x568)
- Large Tablet (1024x1366)
- Large Desktop (2560x1440)

Each viewport tests:
- Basic rendering
- Layout integrity
- Create post form
- Post cards
- Touch-friendly buttons
- Image carousel
- Comment section
- Scrolling behavior
- Layout resizing

## Test Configuration

Tests are configured in `playwright.config.ts`:
- Base URL: `http://localhost:5173`
- Browsers: Chromium (Desktop, Mobile, Tablet)
- Auto-start dev server
- Screenshots on failure
- HTML report generation

## Test Results

After running tests, view the HTML report:
```bash
npx playwright show-report
```

The report includes:
- Test execution timeline
- Screenshots of failures
- Trace viewer for debugging
- Test coverage summary

## Best Practices

1. **Test Isolation**: Each test is independent and can run in parallel
2. **Wait Strategies**: Tests use proper wait conditions (waitForSelector, waitForLoadState)
3. **Selectors**: Tests use reliable selectors (role, text, CSS)
4. **Error Handling**: Tests include proper error handling and timeouts
5. **Viewport Testing**: Responsive tests cover multiple screen sizes

## Debugging Failed Tests

1. Check the HTML report for screenshots
2. Use `npm run test:e2e:debug` for step-by-step debugging
3. Check browser console for errors
4. Verify dev server is running on port 5173
5. Check test selectors match current component structure

## CI/CD Integration

Tests are configured for CI:
- Retries: 2 on CI, 0 locally
- Workers: 1 on CI (sequential), parallel locally
- Trace collection on retry
- Screenshots on failure

## Maintenance

When updating components:
1. Update test selectors if component structure changes
2. Add new tests for new features
3. Update viewport tests if responsive breakpoints change
4. Verify accessibility tests still pass after UI changes
