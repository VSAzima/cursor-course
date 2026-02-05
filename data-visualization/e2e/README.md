# E2E Tests for Product Search Feature

This directory contains Playwright end-to-end tests for the product search functionality.

## Test Coverage

The test suite covers the following scenarios:

### Search Functionality
- ✅ Search with valid query
- ✅ Search with no results (empty state)

### Filtering
- ✅ Apply single filter (Region, Status, Category)
- ✅ Apply multiple filters simultaneously
- ✅ Clear all filters
- ✅ Price range filtering

### Sorting
- ✅ Sort by Product Name (ascending/descending)
- ✅ Sort by Orders
- ✅ Sort by Revenue

### Pagination
- ✅ Pagination navigation (Next/Previous)
- ✅ Direct page number selection
- ✅ Pagination resets when search changes

### Combined Features
- ✅ Search combined with filters
- ✅ Error states (invalid price range)

## Running Tests

### Run all tests
```bash
npm run test:e2e
```

### Run tests with UI mode (interactive)
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Debug tests
```bash
npm run test:e2e:debug
```

### Run specific test file
```bash
npx playwright test e2e/product-search.spec.ts
```

### Run specific test
```bash
npx playwright test -g "Search with valid query"
```

## Test Data Attributes

The following test data attributes are used for reliable element selection:

- `data-testid="product-search-input"` - Search input field
- `data-testid="filter-toggle-button"` - Filter panel toggle button
- `data-testid="filter-panel"` - Filter panel container
- `data-testid="filter-region"` - Region filter dropdown
- `data-testid="filter-status"` - Status filter dropdown
- `data-testid="filter-category"` - Category filter dropdown
- `data-testid="filter-price-min"` - Minimum price input
- `data-testid="filter-price-max"` - Maximum price input
- `data-testid="filter-reset"` - Reset filters button
- `data-testid="filter-apply"` - Apply filters button
- `data-testid="sort-column-{columnKey}"` - Column sort buttons
- `data-testid="product-row-{id}"` - Product table rows
- `data-testid="empty-results"` - Empty results message
- `data-testid="pagination-controls"` - Pagination controls container
- `data-testid="pagination-prev"` - Previous page button
- `data-testid="pagination-next"` - Next page button
- `data-testid="pagination-page-{number}"` - Page number buttons
- `data-testid="pagination-info"` - Pagination info text

## Test Data

The tests use the following product data:
- Premium Plan ($45,231) - Active - North America
- Basic Plan ($32,451) - Active - Europe
- Enterprise Plan ($28,900) - Active - Asia
- Starter Plan ($18,008) - Active - North America
- Pro Plan ($15,234) - Inactive - Europe
- Business Plan ($52,100) - Active - North America
- Free Plan ($0) - Active - Europe
- Trial Plan ($8,500) - Pending - Asia

## Configuration

Tests are configured in `playwright.config.ts`:
- Base URL: `http://localhost:5173`
- Browser: Chromium
- Test directory: `./e2e`
- Dev server starts automatically before tests

## CI/CD Integration

The tests are configured to:
- Retry failed tests (2 retries on CI)
- Generate HTML reports
- Run in parallel (except on CI)
- Start dev server automatically
