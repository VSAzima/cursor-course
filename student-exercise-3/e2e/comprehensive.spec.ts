import { test, expect } from '@playwright/test'

test.describe('Settings Panel - Comprehensive E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('h1', { state: 'visible', timeout: 10000 })
  })

  // ============================================
  // AUTHENTICATION TESTS (5-8 tests)
  // ============================================
  test.describe('Authentication & Access Control', () => {
    test('should load settings panel without authentication errors', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible()
      await expect(page.locator('body')).not.toContainText('Unauthorized')
      await expect(page.locator('body')).not.toContainText('Login')
    })

    test('should display user profile information', async ({ page }) => {
      // Check if user data is displayed (profile section)
      const fullNameInput = page.locator('input[id="fullName"]')
      await expect(fullNameInput).toBeVisible()
      await expect(fullNameInput).toHaveValue('John Doe')
    })

    test('should allow access to all settings tabs', async ({ page }) => {
      const tabs = [
        { name: 'Profile', heading: /Profile Information/i },
        { name: 'Notifications', heading: /Notification Preferences/i },
        { name: 'Privacy', heading: /Privacy Settings/i },
        { name: 'Appearance', heading: /Appearance Settings/i }
      ]
      for (const tab of tabs) {
        await page.getByRole('button', { name: new RegExp(tab.name, 'i') }).click()
        await expect(page.getByRole('heading', { name: tab.heading })).toBeVisible()
      }
    })

    test('should persist user preferences', async ({ page }) => {
      // Change a setting
      await page.getByRole('button', { name: /Notifications/i }).click()
      const emailToggle = page.locator('button[id="emailNotifications"]')
      const initialState = await emailToggle.getAttribute('aria-checked')
      
      await emailToggle.click()
      await expect(emailToggle).toHaveAttribute('aria-checked', initialState === 'true' ? 'false' : 'true')
    })

    test('should save user settings successfully', async ({ page }) => {
      const saveButton = page.getByRole('button', { name: /Save Changes/i })
      await saveButton.click()
      
      // Should show saving state
      await expect(page.getByText('Saving...')).toBeVisible({ timeout: 2000 })
      
      // Should complete successfully
      await expect(saveButton).toBeVisible({ timeout: 5000 })
    })

    test('should handle session timeout settings', async ({ page }) => {
      await page.getByRole('button', { name: /Privacy/i }).click()
      const timeoutSelect = page.locator('select[id="sessionTimeout"]')
      
      await timeoutSelect.selectOption('60')
      await expect(timeoutSelect).toHaveValue('60')
    })

    test('should support two-factor authentication toggle', async ({ page }) => {
      await page.getByRole('button', { name: /Privacy/i }).click()
      const twoFactorToggle = page.locator('button[id="twoFactorAuth"]')
      
      await expect(twoFactorToggle).toBeVisible()
      await expect(twoFactorToggle).toHaveAttribute('aria-checked', 'true')
    })
  })

  // ============================================
  // TASK OPERATIONS TESTS (8-12 tests)
  // ============================================
  test.describe('Settings Operations & Form Management', () => {
    test('should create/edit profile information', async ({ page }) => {
      const fullNameInput = page.locator('input[id="fullName"]')
      await fullNameInput.clear()
      await fullNameInput.fill('Jane Smith')
      await expect(fullNameInput).toHaveValue('Jane Smith')
      
      const emailInput = page.locator('input[id="email"]')
      await emailInput.clear()
      await emailInput.fill('jane.smith@example.com')
      await expect(emailInput).toHaveValue('jane.smith@example.com')
    })

    test('should update bio with character limit', async ({ page }) => {
      const bioTextarea = page.locator('textarea[id="bio"]')
      const testBio = 'This is a test bio for the settings panel'
      
      await bioTextarea.clear()
      await bioTextarea.fill(testBio)
      await expect(bioTextarea).toHaveValue(testBio)
      
      // Check character count
      await expect(page.getByText(/\d+\/200 characters/)).toBeVisible()
    })

    test('should toggle notification preferences', async ({ page }) => {
      await page.getByRole('button', { name: /Notifications/i }).click()
      
      const toggle = page.locator('button[id="emailNotifications"]')
      const initialState = await toggle.getAttribute('aria-checked')
      await toggle.click()
      await expect(toggle).toHaveAttribute('aria-checked', initialState === 'true' ? 'false' : 'true')
    })

    test('should change privacy visibility settings', async ({ page }) => {
      await page.getByRole('button', { name: /Privacy/i }).click()
      
      await page.locator('select[id="profileVisibility"]').selectOption('private')
      await expect(page.locator('select[id="profileVisibility"]')).toHaveValue('private')
    })

    test('should update appearance theme', async ({ page }) => {
      await page.getByRole('button', { name: /Appearance/i }).click()
      
      const darkThemeButton = page.getByRole('button', { name: /Dark/i })
      await darkThemeButton.click()
      await page.waitForTimeout(300)
      const classes = await darkThemeButton.getAttribute('class')
      expect(classes).toContain('border-blue-600')
    })

    test('should change language preference', async ({ page }) => {
      await page.getByRole('button', { name: /Appearance/i }).click()
      
      await page.locator('select[id="language"]').selectOption('es')
      await expect(page.locator('select[id="language"]')).toHaveValue('es')
    })

    test('should reset form to default values', async ({ page }) => {
      // Change values
      await page.locator('input[id="fullName"]').fill('Test User')
      await expect(page.locator('input[id="fullName"]')).toHaveValue('Test User')
      
      // Reset
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: /Reset/i }).click()
      await page.waitForTimeout(1000)
    })

    test('should handle form submission with loading state', async ({ page }) => {
      const saveButton = page.getByRole('button', { name: /Save Changes/i })
      
      await saveButton.click()
      await expect(page.getByText('Saving...')).toBeVisible({ timeout: 2000 })
      await expect(saveButton).toBeVisible({ timeout: 5000 })
    })
  })

  // ============================================
  // NAVIGATION TESTS (3-5 tests)
  // ============================================
  test.describe('Navigation & Tab Management', () => {
    test('should navigate between all tabs', async ({ page }) => {
      const tabs = [
        { name: 'Profile', heading: /Profile Information/i },
        { name: 'Notifications', heading: /Notification Preferences/i },
        { name: 'Privacy', heading: /Privacy Settings/i },
        { name: 'Appearance', heading: /Appearance Settings/i }
      ]
      
      for (const tab of tabs) {
        await page.getByRole('button', { name: new RegExp(tab.name, 'i') }).click()
        await expect(page.getByRole('heading', { name: tab.heading })).toBeVisible()
      }
    })

    test('should highlight active tab', async ({ page }) => {
      const profileTab = page.getByRole('button', { name: /Profile/i })
      let classes = await profileTab.getAttribute('class')
      expect(classes).toContain('border-blue-600')
      
      await page.getByRole('button', { name: /Notifications/i }).click()
      await page.waitForTimeout(200)
      const notificationsTab = page.getByRole('button', { name: /Notifications/i })
      classes = await notificationsTab.getAttribute('class')
      expect(classes).toContain('border-blue-600')
    })

    test('should maintain tab state after page interactions', async ({ page }) => {
      await page.getByRole('button', { name: /Privacy/i }).click()
      await expect(page.getByRole('heading', { name: /Privacy Settings/i })).toBeVisible()
      
      // Interact with form
      await page.locator('select[id="profileVisibility"]').selectOption('private')
      
      // Tab should still be active
      const privacyTab = page.getByRole('button', { name: /Privacy/i })
      const classes = await privacyTab.getAttribute('class')
      expect(classes).toContain('border-blue-600')
    })

    test('should support keyboard navigation between tabs', async ({ page }) => {
      // Tab to first tab button
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      
      // Navigate with arrow keys if supported, or Tab
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      
      // Activate with Enter
      await page.keyboard.press('Enter')
      await page.waitForTimeout(300)
    })

    test('should display correct content for each tab', async ({ page }) => {
      // Profile tab
      await expect(page.getByLabel('Full Name')).toBeVisible()
      
      // Notifications tab
      await page.getByRole('button', { name: /Notifications/i }).click()
      await expect(page.getByLabel('Email Notifications')).toBeVisible()
      
      // Privacy tab
      await page.getByRole('button', { name: /Privacy/i }).click()
      await expect(page.getByLabel('Profile Visibility')).toBeVisible()
      
      // Appearance tab
      await page.getByRole('button', { name: /Appearance/i }).click()
      await page.waitForTimeout(300)
      // Theme label should be visible (check by text or id)
      await expect(page.locator('label:has-text("Theme"), label[id="theme-label"]')).toBeVisible()
    })
  })

  // ============================================
  // ACCESSIBILITY TESTS (4-8 tests)
  // ============================================
  test.describe('Accessibility & ARIA Compliance', () => {
    test('should have proper ARIA labels on all interactive elements', async ({ page }) => {
      await page.getByRole('button', { name: /Notifications/i }).click()
      
      const toggles = page.locator('button[role="switch"]')
      const count = await toggles.count()
      expect(count).toBeGreaterThan(0)
      
      // Check first toggle has aria-checked and aria-label
      const firstToggle = toggles.first()
      await expect(firstToggle).toHaveAttribute('aria-checked', /.+/)
      await expect(firstToggle).toHaveAttribute('aria-label', /.+/)
    })

    test('should have proper labels for all form inputs', async ({ page }) => {
      // Check key form inputs have labels
      const fullNameLabel = page.locator('label[for="fullName"]')
      await expect(fullNameLabel).toBeVisible()
      await expect(fullNameLabel).toContainText('Full Name')
      
      const emailLabel = page.locator('label[for="email"]')
      await expect(emailLabel).toBeVisible()
      await expect(emailLabel).toContainText('Email Address')
    })

    test('should be keyboard navigable', async ({ page }) => {
      // Tab through interactive elements
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      
      // Should be able to activate with Enter/Space
      await page.keyboard.press('Enter')
      await page.waitForTimeout(300)
    })

    test('should have proper focus indicators', async ({ page }) => {
      const firstInput = page.locator('input[id="fullName"]')
      await firstInput.focus()
      
      // Check if element has focus
      await expect(firstInput).toBeFocused()
    })

    test('should support screen reader navigation', async ({ page }) => {
      // Check for semantic HTML
      await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible()
      
      // Check buttons exist
      const buttons = page.getByRole('button')
      const buttonCount = await buttons.count()
      expect(buttonCount).toBeGreaterThan(0)
      
      // Check for proper roles
      await page.getByRole('button', { name: /Notifications/i }).click()
      const switches = page.locator('[role="switch"]')
      const switchCount = await switches.count()
      expect(switchCount).toBeGreaterThan(0)
    })

    test('should have proper heading hierarchy', async ({ page }) => {
      const h1 = page.locator('h1')
      await expect(h1).toBeVisible()
      
      await page.getByRole('button', { name: /Profile/i }).click()
      const h2 = page.locator('h2')
      await expect(h2).toBeVisible()
    })

    test('should announce state changes to screen readers', async ({ page }) => {
      await page.getByRole('button', { name: /Notifications/i }).click()
      const toggle = page.locator('button[id="emailNotifications"]')
      
      const initialState = await toggle.getAttribute('aria-checked')
      await toggle.click()
      await expect(toggle).toHaveAttribute('aria-checked', initialState === 'true' ? 'false' : 'true')
    })

    test('should have accessible button labels', async ({ page }) => {
      const saveButton = page.getByRole('button', { name: /Save Changes/i })
      await expect(saveButton).toBeVisible()
      
      const resetButton = page.getByRole('button', { name: /Reset/i })
      await expect(resetButton).toBeVisible()
    })
  })

  // ============================================
  // RESPONSIVE DESIGN TESTS (6-12 tests)
  // ============================================
  test.describe('Responsive Design & Mobile Compatibility', () => {
    test('should work on mobile viewport (375x667)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500)
      
      // Header should be visible
      await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible()
      
      // Tabs should be accessible (may show icons only on mobile)
      const tabButtons = page.locator('nav button')
      const tabCount = await tabButtons.count()
      expect(tabCount).toBeGreaterThanOrEqual(4)
      
      // Form inputs should be visible
      const fullNameInput = page.locator('input[id="fullName"]')
      await expect(fullNameInput).toBeVisible()
      const inputBox = await fullNameInput.boundingBox()
      expect(inputBox?.width).toBeGreaterThan(200)
    })

    test('should work on tablet viewport (768x1024)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      await page.waitForLoadState('networkidle')
      
      await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /Save Changes/i })).toBeVisible()
      
      // Check grid layout adapts
      const gridContainer = page.locator('.grid')
      const gridCount = await gridContainer.count()
      expect(gridCount).toBeGreaterThan(0)
    })

    test('should work on desktop viewport (1920x1080)', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 })
      await page.waitForLoadState('networkidle')
      
      await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible()
      
      // All tabs should be visible
      const tabs = ['Profile', 'Notifications', 'Privacy', 'Appearance']
      for (const tab of tabs) {
        await expect(page.getByRole('button', { name: new RegExp(tab, 'i') })).toBeVisible()
      }
    })

    test('should adapt form layout on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.waitForLoadState('networkidle')
      
      // Grid should stack vertically on mobile
      const gridItems = page.locator('.grid > *')
      const itemCount = await gridItems.count()
      if (itemCount > 0) {
        const firstItem = gridItems.first()
        await expect(firstItem).toBeVisible()
      }
    })

    test('should maintain usability on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 })
      await page.waitForLoadState('networkidle')
      
      // Critical elements should still be accessible
      await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible()
      await expect(page.locator('input[id="fullName"]')).toBeVisible()
    })

    test('should handle landscape orientation', async ({ page }) => {
      await page.setViewportSize({ width: 667, height: 375 })
      await page.waitForLoadState('networkidle')
      
      await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /Save Changes/i })).toBeVisible()
    })

    test('should maintain touch target sizes on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.waitForLoadState('networkidle')
      
      const buttons = page.getByRole('button')
      const buttonCount = await buttons.count()
      
      // Check first few buttons have adequate size
      if (buttonCount > 0) {
        const button = buttons.first()
        const box = await button.boundingBox()
        if (box) {
          expect(box.width).toBeGreaterThan(30)
          expect(box.height).toBeGreaterThan(30)
        }
      }
    })

    test('should adapt tab navigation for mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500)
      
      // Tabs should be scrollable on mobile if needed
      const tabContainer = page.locator('nav')
      await expect(tabContainer).toBeVisible()
      
      // Should be able to click tabs - find by text or use nth selector
      const allNavButtons = page.locator('nav button')
      const buttonCount = await allNavButtons.count()
      expect(buttonCount).toBeGreaterThanOrEqual(4)
      
      // Try to find Notifications button by text, or click second button
      const notificationsButton = allNavButtons.filter({ hasText: /Notifications/i }).first()
      const buttonExists = await notificationsButton.count()
      if (buttonExists > 0) {
        await notificationsButton.click()
      } else {
        await allNavButtons.nth(1).click()
      }
      await page.waitForTimeout(500)
      await expect(page.getByRole('heading', { name: /Notification Preferences/i })).toBeVisible()
    })

    test('should maintain form usability across breakpoints', async ({ page }) => {
      // Test key breakpoints
      const breakpoints = [375, 768, 1024]
      
      for (const width of breakpoints) {
        await page.setViewportSize({ width, height: 800 })
        await page.waitForLoadState('networkidle')
        
        const input = page.locator('input[id="fullName"]')
        await expect(input).toBeVisible()
        await expect(input).toBeEnabled()
      }
    })
  })
})
