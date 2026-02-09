import { test, expect } from '@playwright/test';

const goHome = async (page: import('@playwright/test').Page) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Responsive Navigation Bar' })).toBeVisible();
};

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await goHome(page);
  });

  test('shows signed-in status by default', async ({ page }) => {
    await expect(page.getByText('Status: Signed in')).toBeVisible();
  });

  test('sign out button switches to signed out', async ({ page }) => {
    await page.getByRole('main').getByRole('button', { name: 'Sign out' }).click();
    await expect(page.getByText('Status: Signed out')).toBeVisible();
  });

  test('sign in button restores signed in state', async ({ page }) => {
    await page.getByRole('main').getByRole('button', { name: 'Sign out' }).click();
    await page.getByRole('main').getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Status: Signed in')).toBeVisible();
  });

  test('user menu is hidden after signing out', async ({ page }) => {
    await page.getByRole('main').getByRole('button', { name: 'Sign out' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toHaveCount(0);
  });

  test('user dropdown sign out updates status', async ({ page }) => {
    await page.getByRole('button', { name: 'User menu' }).click();
    await page.getByTestId('user-dropdown-menu').getByTestId('user-menu-item-logout').click();
    await expect(page.getByText('Status: Signed out')).toBeVisible();
  });

  test('sign in restores user menu', async ({ page }) => {
    await page.getByRole('main').getByRole('button', { name: 'Sign out' }).click();
    await page.getByRole('main').getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
  });
});

test.describe('Task operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await goHome(page);
  });

  test('search submission shows results', async ({ page }) => {
    const input = page.getByPlaceholder('Search for products, articles, or help...');
    await input.fill('pricing');
    await input.press('Enter');
    await expect(page.getByText('Search completed for "pricing"')).toBeVisible();
    await expect(page.getByText('Result for: pricing')).toBeVisible();
  });

  test('search results show two items', async ({ page }) => {
    const input = page.getByPlaceholder('Search for products, articles, or help...');
    await input.fill('docs');
    await input.press('Enter');
    await expect(page.getByTestId('search-results-list').getByRole('listitem')).toHaveCount(2);
  });

  test('clear search button clears input', async ({ page }) => {
    const input = page.getByPlaceholder('Search for products, articles, or help...');
    await input.fill('clear me');
    await page.getByRole('button', { name: 'Clear search' }).click();
    await expect(input).toHaveValue('');
  });

  test('clear results resets results section', async ({ page }) => {
    const input = page.getByPlaceholder('Search for products, articles, or help...');
    await input.fill('reset');
    await input.press('Enter');
    await page.getByRole('button', { name: 'Clear results' }).click();
    await expect(page.getByText('No search performed yet.')).toBeVisible();
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await goHome(page);
    await page.getByRole('button', { name: 'Toggle menu' }).click();
    await expect(page.getByRole('heading', { name: 'Menu' })).toBeVisible();
    await page.getByRole('button', { name: 'Close menu' }).click();
    await expect(page.getByTestId('mobile-menu-panel')).toHaveClass(/translate-x-full/);
  });

  test('escape closes mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await goHome(page);
    await page.getByRole('button', { name: 'Toggle menu' }).click();
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('mobile-menu-panel')).toHaveClass(/translate-x-full/);
  });

  test('scroll to top button appears after scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(page.getByRole('button', { name: 'Scroll to top' })).toBeVisible();
  });

  test('scroll to top button returns to top', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000));
    const button = page.getByRole('button', { name: 'Scroll to top' });
    await button.click();
    await page.waitForFunction(() => window.scrollY < 50);
  });
});

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await goHome(page);
  });

  test('primary nav links render', async ({ page }) => {
    const desktopNav = page.getByTestId('desktop-nav');
    await expect(desktopNav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(desktopNav.getByRole('link', { name: 'Features' })).toBeVisible();
    await expect(desktopNav.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('nav links target sections', async ({ page }) => {
    const desktopNav = page.getByTestId('desktop-nav');
    await expect(desktopNav.getByRole('link', { name: 'Features' })).toHaveAttribute('href', '#features');
    await expect(desktopNav.getByRole('link', { name: 'Demo' })).toHaveAttribute('href', '#demo');
  });

  test('logo link points to home', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'MyBrand' })).toHaveAttribute('href', '/');
  });

  test('mobile menu nav click closes menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await goHome(page);
    await page.getByRole('button', { name: 'Toggle menu' }).click();
    await page.getByTestId('mobile-nav').getByRole('link', { name: 'Demo' }).click();
    await expect(page.getByTestId('mobile-menu-panel')).toHaveClass(/translate-x-full/);
  });
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await goHome(page);
  });

  test('search button has aria-label', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await goHome(page);
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  });

  test('toggle menu has aria-label', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await goHome(page);
    await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeVisible();
  });

  test('user menu exposes aria-label', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
  });

  test('scroll to top button has aria-label', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(page.getByRole('button', { name: 'Scroll to top' })).toBeVisible();
  });

  test('clear search button has aria-label', async ({ page }) => {
    const input = page.getByPlaceholder('Search for products, articles, or help...');
    await input.fill('aria');
    await expect(page.getByRole('button', { name: 'Clear search' })).toBeVisible();
  });
});

test.describe('Responsive', () => {
  test('mobile shows hamburger and hides desktop nav', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await goHome(page);
    await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeVisible();
    await expect(page.getByTestId('desktop-nav')).toBeHidden();
  });

  test('mobile shows search icon and hides search input', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await goHome(page);
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(page.getByTestId('search-input')).toBeHidden();
  });

  test('tablet shows search input', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await goHome(page);
    await expect(page.getByTestId('search-input')).toBeVisible();
  });

  test('desktop shows user dropdown', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await goHome(page);
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
  });

  test('desktop shows nav links', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await goHome(page);
    await expect(page.getByTestId('desktop-nav').getByRole('link', { name: 'Testimonials' })).toBeVisible();
  });

  test('mobile menu includes user info when signed in', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await goHome(page);
    await page.getByRole('button', { name: 'Toggle menu' }).click();
    await expect(page.getByTestId('mobile-menu-user-name')).toBeVisible();
  });
});
