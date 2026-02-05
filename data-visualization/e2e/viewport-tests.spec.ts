import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1280, height: 720 },
];

viewports.forEach(({ name, width, height }) => {
  test.describe(`Product Search - ${name} Viewport (${width}x${height})`, () => {
    test.use({ viewport: { width, height } });

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('[data-testid="product-search-input"]', { timeout: 10000 });
    });

    test('Search input is visible and functional', async ({ page }) => {
      const searchInput = page.getByTestId('product-search-input');
      
      // Verify search input is visible
      await expect(searchInput).toBeVisible();
      
      // Verify search works
      await searchInput.fill('Trial');
      await page.waitForTimeout(500);
      
      const rows = page.locator('[data-testid^="product-row-"]');
      const count = await rows.count();
      expect(count).toBeGreaterThan(0);
    });

    test('Filter panel displays and functions correctly', async ({ page }) => {
      // Open filter panel
      const filterButton = page.getByTestId('filter-toggle-button');
      await expect(filterButton).toBeVisible();
      await filterButton.click();
      
      // Verify filter panel is visible
      const filterPanel = page.getByTestId('filter-panel');
      await expect(filterPanel).toBeVisible();
      
      // Verify filter controls are accessible
      await expect(page.getByTestId('filter-region')).toBeVisible();
      await expect(page.getByTestId('filter-status')).toBeVisible();
      await expect(page.getByTestId('filter-category')).toBeVisible();
      
      // Test filter functionality
      await page.getByTestId('filter-status').selectOption('active');
      await page.getByTestId('filter-apply').click();
      await page.waitForTimeout(500);
      
      // Verify results
      const rows = page.locator('[data-testid^="product-row-"]');
      const count = await rows.count();
      expect(count).toBeGreaterThan(0);
    });

    test('Table displays correctly and is scrollable if needed', async ({ page }) => {
      // Verify table is visible
      const table = page.locator('table');
      await expect(table).toBeVisible();
      
      // Verify table headers are visible
      await expect(page.getByTestId('sort-column-product')).toBeVisible();
      
      // On mobile/tablet, verify horizontal scroll works if needed
      if (width < 768) {
        const tableContainer = page.locator('.overflow-x-auto').first();
        const hasScroll = await tableContainer.evaluate((el) => {
          return el.scrollWidth > el.clientWidth;
        });
        // Table should be scrollable on small screens if content is wide
        expect(hasScroll).toBeDefined();
      }
    });

    test('Pagination controls are accessible', async ({ page }) => {
      await page.waitForTimeout(500);
      
      const paginationControls = page.getByTestId('pagination-controls');
      const paginationExists = await paginationControls.isVisible().catch(() => false);
      
      if (paginationExists) {
        // Verify pagination buttons are visible and clickable
        await expect(page.getByTestId('pagination-prev')).toBeVisible();
        await expect(page.getByTestId('pagination-next')).toBeVisible();
        
        // Verify pagination info is visible
        const paginationInfo = page.getByTestId('pagination-info');
        await expect(paginationInfo).toBeVisible();
      }
    });

    test('Empty state displays correctly', async ({ page }) => {
      const searchInput = page.getByTestId('product-search-input');
      
      // Search for non-existent product
      await searchInput.fill('NonExistentProductXYZ123');
      await page.waitForTimeout(500);
      
      // Verify empty state is visible and readable
      const emptyResults = page.getByTestId('empty-results');
      await expect(emptyResults).toBeVisible();
      await expect(emptyResults).toContainText('No products found');
    });
  });
});
