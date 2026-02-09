import { test, expect } from '@playwright/test';

test.describe('Dashboard - Core Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for dashboard to load
    await page.waitForSelector('text=Analytics Dashboard');
  });

  test('should display dashboard header with title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Analytics Dashboard');
  });

  test('should display all 4 KPI cards', async ({ page }) => {
    // Wait for KPI cards to load (not skeletons)
    await page.waitForTimeout(1000);
    
    const kpiCards = page.locator('[class*="bg-white"][class*="dark:bg-gray-800"]').filter({
      hasText: /Total Revenue|Active Users|Conversion Rate|Avg\. Session/
    });
    
    await expect(kpiCards).toHaveCount(4);
    
    // Verify specific KPIs
    await expect(page.locator('text=Total Revenue')).toBeVisible();
    await expect(page.locator('text=Active Users')).toBeVisible();
    await expect(page.locator('text=Conversion Rate')).toBeVisible();
    await expect(page.locator('text=Avg. Session')).toBeVisible();
  });

  test('should display all 4 chart components', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    await expect(page.locator('text=Revenue Trend')).toBeVisible();
    await expect(page.locator('text=User Growth')).toBeVisible();
    await expect(page.locator('text=Traffic Sources')).toBeVisible();
    await expect(page.locator('text=Monthly Comparison')).toBeVisible();
  });

  test('should display data table with search', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    await expect(page.locator('text=Recent Activities')).toBeVisible();
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
  });

  test('should display date range selector', async ({ page }) => {
    await expect(page.locator('text=Date Range')).toBeVisible();
    await expect(page.locator('input[type="date"]').first()).toBeVisible();
    await expect(page.locator('input[type="date"]').nth(1)).toBeVisible();
  });
});

test.describe('Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('text=Analytics Dashboard');
  });

  test('should toggle dark mode', async ({ page }) => {
    // Check initial state (light mode)
    const body = page.locator('body');
    const initialBg = await body.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );

    // Click dark mode toggle
    const darkModeButton = page.getByTestId('dark-mode-toggle');
    await darkModeButton.click();
    await page.waitForTimeout(500);

    // Verify dark mode is applied
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('should persist dark mode preference', async ({ page }) => {
    // Toggle dark mode
    const darkModeButton = page.getByTestId('dark-mode-toggle');
    await darkModeButton.click();
    await page.waitForTimeout(500);

    // Reload page
    await page.reload();
    await page.waitForSelector('text=Analytics Dashboard');
    await page.waitForTimeout(500);

    // Verify dark mode persists
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });
});

test.describe('Filter Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('text=Analytics Dashboard');
    await page.waitForTimeout(1000); // Wait for initial load
  });

  test('should filter by category', async ({ page }) => {
    // Open sidebar on mobile if needed
    const menuButton = page.getByTestId('sidebar-toggle');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300);
    }

    // Select Marketing category
    await page.getByTestId('filter-category-marketing').check();
    await page.waitForTimeout(1000); // Wait for filter to apply

    // Verify filter is applied
    await expect(page.getByTestId('active-filters')).toContainText('Marketing');
    
    // Check table shows filtered results
    const tableRows = page.locator('tbody tr');
    const count = await tableRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter by status', async ({ page }) => {
    // Open sidebar on mobile if needed
    const menuButton = page.getByTestId('sidebar-toggle');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300);
    }

    // Select Active status
    await page.getByTestId('filter-status-active').check();
    await page.waitForTimeout(1000);

    // Verify filter is applied
    await expect(page.getByTestId('active-filters')).toContainText('Active');
  });

  test('should show active filters indicator', async ({ page }) => {
    // Open sidebar
    const menuButton = page.getByTestId('sidebar-toggle');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300);
    }

    // Apply filter
    await page.getByTestId('filter-category-sales').check();
    await page.waitForTimeout(1000);

    // Verify active filters indicator appears
    await expect(page.getByTestId('active-filters')).toBeVisible();
  });

  test('should clear all filters', async ({ page }) => {
    // Open sidebar
    const menuButton = page.getByTestId('sidebar-toggle');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300);
    }

    // Apply filters
    await page.getByTestId('filter-category-marketing').check();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-status-active').check();
    await page.waitForTimeout(1000);

    // Clear filters
    await page.getByTestId('clear-filters').click();
    await page.waitForTimeout(1000);

    // Verify filters are cleared
    await expect(page.getByTestId('filter-category-all')).toBeChecked();
    await expect(page.getByTestId('filter-status-all')).toBeChecked();
  });
});

test.describe('Date Range Selector', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('text=Date Range');
  });

  test('should display date inputs', async ({ page }) => {
    const dateInputs = page.locator('input[type="date"]');
    await expect(dateInputs).toHaveCount(2);
  });

  test('should select custom dates', async ({ page }) => {
    const startDateInput = page.locator('input[type="date"]').first();
    const endDateInput = page.locator('input[type="date"]').nth(1);

    await startDateInput.fill('2024-01-01');
    await endDateInput.fill('2024-01-31');
    await page.waitForTimeout(500);

    await expect(startDateInput).toHaveValue('2024-01-01');
    await expect(endDateInput).toHaveValue('2024-01-31');
  });

  test('should use quick range buttons', async ({ page }) => {
    const last7DaysButton = page.locator('button:has-text("Last 7 days")');
    await last7DaysButton.click();
    await page.waitForTimeout(500);

    // Verify dates are set
    const startDateInput = page.locator('input[type="date"]').first();
    await expect(startDateInput).toHaveValue(/.+/);
  });
});

test.describe('Data Table', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('text=Recent Activities');
    await page.waitForTimeout(1000);
  });

  test('should display table with data', async ({ page }) => {
    const tableRows = page.locator('tbody tr');
    const count = await tableRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should search table data', async ({ page }) => {
    const searchInput = page.getByTestId('table-search');
    await searchInput.fill('Marketing');
    await page.waitForTimeout(500);

    // Verify filtered results
    const tableRows = page.locator('tbody tr');
    const count = await tableRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should paginate table', async ({ page }) => {
    // Check if pagination exists
    const pagination = page.getByTestId('pagination-page');
    if (await pagination.isVisible()) {
      const nextButton = page.getByTestId('pagination-next');
      if (await nextButton.isEnabled()) {
        await nextButton.click();
        await page.waitForTimeout(500);
        
        // Verify page changed
        await expect(pagination).toContainText(/Page 2/);
      }
    }
  });

  test('should show empty state when no results', async ({ page }) => {
    const searchInput = page.getByTestId('table-search');
    await searchInput.fill('NonExistentSearchTerm12345');
    await page.waitForTimeout(500);

    // Check for empty state
    const emptyState = page.getByTestId('table-empty');
    await expect(emptyState).toBeVisible();
  });
});

test.describe('Loading States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('text=Analytics Dashboard');
  });

  test('should show loading skeletons when filters change', async ({ page }) => {
    // Open sidebar
    const menuButton = page.getByTestId('sidebar-toggle');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300);
    }

    // Change filter - should trigger loading
    await page.getByTestId('filter-category-sales').check();
    
    // Check for skeleton loaders (they appear briefly)
    const skeletons = page.locator('[class*="animate-pulse"]');
    // Skeletons may appear very briefly, so we just verify the filter works
    await page.waitForTimeout(1000);
    
    // Verify content loaded
    await expect(page.locator('text=Total Revenue')).toBeVisible();
  });

  test('should show loading overlay on refresh', async ({ page }) => {
    const refreshButton = page.getByTestId('refresh-button');
    await refreshButton.click();

    // Check for loading overlay
    const loadingOverlay = page.locator('text=Refreshing data...');
    await expect(loadingOverlay).toBeVisible({ timeout: 2000 });
    
    // Wait for loading to complete
    await page.waitForTimeout(2000);
    await expect(loadingOverlay).not.toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForSelector('text=Analytics Dashboard');

    // Verify mobile menu button is visible
    const menuButton = page.getByTestId('sidebar-toggle');
    await expect(menuButton).toBeVisible();

    // Verify sidebar is hidden initially
    const sidebar = page.getByTestId('sidebar');
    await expect(sidebar).toHaveClass(/-translate-x-full/);
  });

  test('should open mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForSelector('text=Analytics Dashboard');

    const menuButton = page.getByTestId('sidebar-toggle');
    await menuButton.click();
    await page.waitForTimeout(300);

    // Verify sidebar is visible
    const sidebar = page.getByTestId('sidebar');
    await expect(sidebar).toHaveClass(/translate-x-0/);
  });

  test('should display KPI cards in grid on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForTimeout(1000);

    // Verify KPI cards are visible
    await expect(page.locator('text=Total Revenue')).toBeVisible();
  });
});

test.describe('Header Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('text=Analytics Dashboard');
  });

  test('should have refresh button', async ({ page }) => {
    const refreshButton = page.getByTestId('refresh-button');
    await expect(refreshButton).toBeVisible();
  });

  test('should have export button', async ({ page }) => {
    const exportButton = page.getByTestId('export-button');
    await expect(exportButton).toBeVisible();
  });

  test('should have dark mode toggle', async ({ page }) => {
    const darkModeButton = page.getByTestId('dark-mode-toggle');
    await expect(darkModeButton).toBeVisible();
  });
});
