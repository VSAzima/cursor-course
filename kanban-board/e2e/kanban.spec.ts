import { test, expect, Page } from '@playwright/test';

const openBoard = async (page: Page) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Kanban Board' })).toBeVisible();
};

test.describe('Authentication (Team Management)', () => {
  test.beforeEach(async ({ page }) => {
    await openBoard(page);
  });

  test('opens team management modal', async ({ page }) => {
    await page.getByTestId('team-button').click();
    await expect(page.getByTestId('user-modal')).toBeVisible();
  });

  test('requires name to add a member', async ({ page }) => {
    await page.getByTestId('team-button').click();
    await page.getByTestId('add-user-submit').click();
    await expect(page.getByTestId('user-name-input')).toBeFocused();
  });

  test('adds a new team member', async ({ page }) => {
    await page.getByTestId('team-button').click();
    await page.getByTestId('user-name-input').fill('Frank');
    await page.getByTestId('user-email-input').fill('frank@example.com');
    await page.getByTestId('add-user-submit').click();
    await expect(page.getByTestId('user-modal').getByText('Frank', { exact: true })).toBeVisible();
  });

  test('removes a team member', async ({ page }) => {
    await page.getByTestId('team-button').click();
    await page.getByTestId('user-name-input').fill('Grace');
    await page.getByTestId('add-user-submit').click();
    const removeButton = page.getByRole('button', { name: 'Remove Grace' });
    await removeButton.click();
    await expect(page.getByText('Grace')).toHaveCount(0);
  });

  test('closes team management modal', async ({ page }) => {
    await page.getByTestId('team-button').click();
    await page.getByRole('button', { name: 'Close modal' }).click();
    await expect(page.getByTestId('user-modal')).toHaveCount(0);
  });
});

test.describe('Task operations', () => {
  test.beforeEach(async ({ page }) => {
    await openBoard(page);
  });

  test('opens add task modal', async ({ page }) => {
    await page.getByTestId('add-task-button').click();
    await expect(page.getByTestId('task-modal')).toBeVisible();
  });

  test('adds a new task to Todo', async ({ page }) => {
    await page.getByTestId('add-task-button').click();
    const modal = page.getByTestId('task-modal');
    await modal.getByLabel('Title').fill('New Task');
    await modal.getByLabel('Description').fill('Task description');
    await modal.getByLabel('Assignee').selectOption('Alice');
    await modal.getByLabel('Due Date').fill('2026-02-15');
    await modal.getByLabel('Priority').selectOption('high');
    await page.getByTestId('task-submit').click();
    await expect(page.getByText('New Task')).toBeVisible();
    await expect(page.getByTestId('column-todo')).toContainText('New Task');
  });

  test('edits an existing task', async ({ page }) => {
    await page.getByText('Design new landing page').click();
    await expect(page.getByTestId('task-modal')).toBeVisible();
    await page.getByLabel('Title').fill('Landing page v2');
    await page.getByTestId('task-submit').click();
    await expect(page.getByText('Landing page v2')).toBeVisible();
  });

  test('filters tasks by search query', async ({ page }) => {
    await page.getByTestId('search-input').fill('authentication');
    await expect(page.getByText('Implement user authentication')).toBeVisible();
    await expect(page.getByText('Design new landing page')).toHaveCount(0);
  });

  test('filters tasks by priority', async ({ page }) => {
    await page.getByTestId('priority-filter').selectOption('urgent');
    await expect(page.getByText('Implement user authentication')).toBeVisible();
    await expect(page.getByText('Design new landing page')).toHaveCount(0);
  });

  test('filters tasks by assignee', async ({ page }) => {
    await page.getByTestId('assignee-filter').selectOption('Alice');
    await expect(page.getByText('Design new landing page')).toBeVisible();
    await expect(page.getByText('Write API documentation')).toHaveCount(0);
  });

  test('clear filters resets list', async ({ page }) => {
    await page.getByTestId('priority-filter').selectOption('urgent');
    await page.getByTestId('clear-filters').click();
    await expect(page.getByText('Design new landing page')).toBeVisible();
    await expect(page.getByText('Write API documentation')).toBeVisible();
  });

  test('shows updated todo count after adding', async ({ page }) => {
    const initialCount = await page.getByTestId('column-count-todo').textContent();
    await page.getByTestId('add-task-button').click();
    const modal = page.getByTestId('task-modal');
    await modal.getByLabel('Title').fill('Count Task');
    await modal.getByLabel('Assignee').selectOption('Alice');
    await modal.getByLabel('Due Date').fill('2026-02-16');
    await modal.getByLabel('Priority').selectOption('low');
    await page.getByTestId('task-submit').click();
    const updatedCount = await page.getByTestId('column-count-todo').textContent();
    expect(Number(updatedCount)).toBe(Number(initialCount) + 1);
  });
});

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await openBoard(page);
  });

  test('shows board columns', async ({ page }) => {
    await expect(page.getByTestId('column-title-todo')).toHaveText('Todo');
    await expect(page.getByTestId('column-title-in-progress')).toHaveText('In Progress');
    await expect(page.getByTestId('column-title-done')).toHaveText('Done');
  });

  test('clicking task opens edit modal', async ({ page }) => {
    await page.getByText('Write API documentation').click();
    await expect(page.getByTestId('task-modal')).toBeVisible();
  });

  test('closing modal returns to board', async ({ page }) => {
    await page.getByText('Write API documentation').click();
    await page.getByTestId('task-cancel').click();
    await expect(page.getByTestId('task-modal')).toHaveCount(0);
  });
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await openBoard(page);
  });

  test('search input has associated label', async ({ page }) => {
    await expect(page.getByLabel('Search')).toBeVisible();
  });

  test('filters have labels', async ({ page }) => {
    await expect(page.getByLabel('Priority')).toBeVisible();
    await expect(page.getByLabel('Assignee')).toBeVisible();
  });

  test('modals have close buttons with labels', async ({ page }) => {
    await page.getByTestId('add-task-button').click();
    await expect(page.getByRole('button', { name: 'Close modal' })).toBeVisible();
  });

  test('required fields are enforced in task form', async ({ page }) => {
    await page.getByTestId('add-task-button').click();
    await page.getByTestId('task-submit').click();
    await expect(page.getByLabel('Title')).toBeFocused();
  });
});

test.describe('Responsive', () => {
  test('mobile layout keeps filters visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await openBoard(page);
    await expect(page.getByTestId('filters-bar')).toBeVisible();
  });

  test('mobile layout enables horizontal scroll for columns', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await openBoard(page);
    const scrollable = await page.getByTestId('columns-container').evaluate((el) => el.scrollWidth > el.clientWidth);
    expect(scrollable).toBe(true);
  });

  test('tablet layout shows columns', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await openBoard(page);
    await expect(page.getByTestId('column-title-in-progress')).toBeVisible();
  });

  test('desktop layout shows team and add task buttons', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await openBoard(page);
    await expect(page.getByTestId('team-button')).toBeVisible();
    await expect(page.getByTestId('add-task-button')).toBeVisible();
  });

  test('desktop layout shows search input', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await openBoard(page);
    await expect(page.getByTestId('search-input')).toBeVisible();
  });

  test('desktop layout shows columns container', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await openBoard(page);
    await expect(page.getByTestId('columns-container')).toBeVisible();
  });
});
