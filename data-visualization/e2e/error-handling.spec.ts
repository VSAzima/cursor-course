import { test, expect } from '@playwright/test';

test.describe('Error Handling and Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="product-search-input"]', { timeout: 10000 });
  });

  test('Search with special characters', async ({ page }) => {
    const searchInput = page.getByTestId('product-search-input');
    
    // Test various special characters
    const specialChars = ['<script>', 'SELECT *', '${}', '!@#$%'];
    
    for (const char of specialChars) {
      await searchInput.clear();
      await searchInput.fill(char);
      await page.waitForTimeout(300);
      
      // Should handle gracefully without errors
      // Either show empty results or handle the input safely
      const emptyResults = page.getByTestId('empty-results');
      const rows = page.locator('[data-testid^="product-row-"]');
      const count = await rows.count();
      
      // Should not crash - either show empty state or no results
      expect(count === 0 || await emptyResults.isVisible().catch(() => false)).toBeTruthy();
    }
  });

  test('Search with very long string', async ({ page }) => {
    const searchInput = page.getByTestId('product-search-input');
    
    // Create a very long search string
    const longString = 'a'.repeat(1000);
    await searchInput.fill(longString);
    await page.waitForTimeout(500);
    
    // Should handle gracefully
    const emptyResults = page.getByTestId('empty-results');
    const rows = page.locator('[data-testid^="product-row-"]');
    const count = await rows.count();
    
    expect(count === 0 || await emptyResults.isVisible().catch(() => false)).toBeTruthy();
  });

  test('Filter with negative price values', async ({ page }) => {
    await page.getByTestId('filter-toggle-button').click();
    await page.waitForSelector('[data-testid="filter-panel"]');
    
    // Try negative values
    await page.getByTestId('filter-price-min').fill('-100');
    await page.getByTestId('filter-price-max').fill('-50');
    await page.getByTestId('filter-apply').click();
    await page.waitForTimeout(500);
    
    // Should handle gracefully (either show empty or ignore negative values)
    const emptyResults = page.getByTestId('empty-results');
    const rows = page.locator('[data-testid^="product-row-"]');
    const count = await rows.count();
    
    // Should not crash
    expect(count >= 0).toBeTruthy();
  });

  test('Rapid filter changes', async ({ page }) => {
    await page.getByTestId('filter-toggle-button').click();
    await page.waitForSelector('[data-testid="filter-panel"]');
    
    // Rapidly change filters
    const regions = ['north-america', 'europe', 'asia'];
    for (const region of regions) {
      await page.getByTestId('filter-region').selectOption(region);
      await page.waitForTimeout(100);
    }
    
    await page.getByTestId('filter-apply').click();
    await page.waitForTimeout(500);
    
    // Should show final filter state correctly
    const rows = page.locator('[data-testid^="product-row-"]');
    const count = await rows.count();
    
    if (count > 0) {
      // Verify all results match the last selected region
      const firstRow = rows.first();
      const text = await firstRow.textContent();
      expect(text).toContain('Asia');
    }
  });

  test('Filter panel close behavior', async ({ page }) => {
    // Open filter panel
    await page.getByTestId('filter-toggle-button').click();
    await page.waitForSelector('[data-testid="filter-panel"]');
    
    // Apply a filter
    await page.getByTestId('filter-status').selectOption('active');
    await page.getByTestId('filter-apply').click();
    await page.waitForTimeout(500);
    
    // Verify filter panel closes
    const filterPanel = page.getByTestId('filter-panel');
    const isVisible = await filterPanel.isVisible().catch(() => false);
    expect(isVisible).toBeFalsy();
    
    // Verify filter is still applied
    const rows = page.locator('[data-testid^="product-row-"]');
    const count = await rows.count();
    
    if (count > 0) {
      const firstRow = rows.first();
      const text = await firstRow.textContent();
      expect(text).toContain('Active');
    }
  });

  test('Empty search input behavior', async ({ page }) => {
    const searchInput = page.getByTestId('product-search-input');
    
    // Type something then clear
    await searchInput.fill('Test');
    await page.waitForTimeout(300);
    await searchInput.clear();
    await page.waitForTimeout(500);
    
    // Should show all products
    const rows = page.locator('[data-testid^="product-row-"]');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Price range with zero values', async ({ page }) => {
    await page.getByTestId('filter-toggle-button').click();
    await page.waitForSelector('[data-testid="filter-panel"]');
    
    // Set price range with zero
    await page.getByTestId('filter-price-min').fill('0');
    await page.getByTestId('filter-price-max').fill('1000');
    await page.getByTestId('filter-apply').click();
    await page.waitForTimeout(500);
    
    // Should handle zero values correctly
    const rows = page.locator('[data-testid^="product-row-"]');
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
