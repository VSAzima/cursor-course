import { test, expect, Page } from '@playwright/test';

const productTitles = [
  'Premium Wireless Headphones',
  'Smart Watch Pro',
  'Professional Camera Lens',
  'Ergonomic Office Chair',
  'Minimalist Backpack',
  'Portable Power Bank'
];

const getCardByTitle = (page: Page, title: string) =>
  page.locator('article').filter({ has: page.getByRole('heading', { name: title }) });

const getCartCount = async (page: Page) => {
  const cartButton = page.getByRole('button', { name: /Shopping cart with \d+ items/ });
  const label = await cartButton.getAttribute('aria-label');
  const match = label?.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
};

test.describe('Product Card - Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Product Showcase' })).toBeVisible();
  });

  test('shows sign in button by default', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });

  test('toggles to sign out after signing in', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
  });

  test('toggles back to sign in after signing out', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Sign out' }).click();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });

  test('blocks add to cart when signed out', async ({ page }) => {
    const title = 'Premium Wireless Headphones';
    const card = getCardByTitle(page, title);
    const addButton = card.getByRole('button', { name: `Add ${title} to cart` });
    await addButton.click();
    await expect(page.getByText('Please sign in to add items.')).toBeVisible();
    await expect(page.getByRole('button', { name: /Shopping cart with 0 items/ })).toBeVisible();
  });

  test('allows add to cart after signing in', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign in' }).click();
    const title = 'Smart Watch Pro';
    const card = getCardByTitle(page, title);
    const addButton = card.getByRole('button', { name: `Add ${title} to cart` });
    await addButton.click();
    await expect(page.getByText(`${title} added to cart!`)).toBeVisible();
    const count = await getCartCount(page);
    expect(count).toBe(1);
  });
});

test.describe('Product Card - Task Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Product Showcase' })).toBeVisible();
  });

  test('renders all product cards', async ({ page }) => {
    const cards = page.locator('article');
    await expect(cards).toHaveCount(6);
  });

  test('shows category badges when provided', async ({ page }) => {
    await expect(page.getByText('Audio')).toBeVisible();
    await expect(page.getByText('Photography')).toBeVisible();
  });

  test('shows out of stock state for unavailable product', async ({ page }) => {
    const title = 'Professional Camera Lens';
    const card = getCardByTitle(page, title);
    await expect(card.getByText('Out of Stock', { exact: true }).first()).toBeVisible();
    const addButton = card.getByRole('button', { name: `Add ${title} to cart` });
    await expect(addButton).toBeDisabled();
  });

  test('shows free shipping badge for items over $100', async ({ page }) => {
    const card = getCardByTitle(page, 'Ergonomic Office Chair');
    await expect(card.getByText('Free Shipping')).toBeVisible();
  });

  test('does not show free shipping badge for low priced items', async ({ page }) => {
    const card = getCardByTitle(page, 'Portable Power Bank');
    await expect(card.getByText('Free Shipping')).toHaveCount(0);
  });

  test('displays formatted price with currency symbol', async ({ page }) => {
    const card = getCardByTitle(page, 'Minimalist Backpack');
    await expect(card.getByText('$89.99')).toBeVisible();
  });

  test('shows rating number and review count', async ({ page }) => {
    const card = getCardByTitle(page, 'Premium Wireless Headphones');
    await expect(card.getByText('4.8')).toBeVisible();
    await expect(card.getByText('(1,243 reviews)')).toBeVisible();
  });

  test('shows image with product title as alt text', async ({ page }) => {
    const title = 'Smart Watch Pro';
    const card = getCardByTitle(page, title);
    await expect(card.getByRole('img', { name: title })).toBeVisible();
  });

  test('shows adding state when adding to cart', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign in' }).click();
    const title = 'Premium Wireless Headphones';
    const card = getCardByTitle(page, title);
    const addButton = card.getByRole('button', { name: `Add ${title} to cart` });
    await addButton.click();
    await expect(card.getByText('Adding...')).toBeVisible();
  });
});

test.describe('Product Card - Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
  });

  test('navigates to products section', async ({ page }) => {
    await page.getByRole('link', { name: 'Products' }).click();
    await expect(page).toHaveURL(/#products/);
  });

  test('navigates to footer section', async ({ page }) => {
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/#footer/);
  });
});

test.describe('Product Card - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('cart button has descriptive aria-label', async ({ page }) => {
    const cartButton = page.getByRole('button', { name: /Shopping cart with \d+ items/ });
    await expect(cartButton).toBeVisible();
  });

  test('product card uses aria-label with product title', async ({ page }) => {
    const card = getCardByTitle(page, 'Premium Wireless Headphones');
    await expect(card).toHaveAttribute('aria-label', 'Product: Premium Wireless Headphones');
  });

  test('rating stars expose accessible label', async ({ page }) => {
    const card = getCardByTitle(page, 'Smart Watch Pro');
    await expect(card.getByRole('img', { name: 'Rating: 4.6 out of 5 stars' })).toBeVisible();
  });

  test('all product images have alt text', async ({ page }) => {
    for (const title of productTitles) {
      await expect(page.getByRole('img', { name: title })).toBeVisible();
    }
  });

  test('primary actions are keyboard focusable', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Products' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'About' })).toBeFocused();
  });
});

test.describe('Product Card - Responsive', () => {
  test('mobile layout shows one column grid', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const grid = page.getByTestId('product-grid');
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(1);
  });

  test('mobile layout keeps cart button visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.getByRole('button', { name: /Shopping cart with 0 items/ })).toBeVisible();
  });

  test('tablet layout shows two column grid', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    const grid = page.getByTestId('product-grid');
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(2);
  });

  test('tablet layout keeps navigation visible', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
  });

  test('desktop layout shows three column grid', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    const grid = page.getByTestId('product-grid');
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(3);
  });

  test('desktop layout keeps footer visible when scrolled', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.getByText('Built with React, TypeScript, and Tailwind CSS')).toBeVisible();
  });
});
