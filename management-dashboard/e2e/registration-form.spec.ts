import { test, expect } from '@playwright/test'

const REGISTER_URL = '/register'

test.describe('Multi-Step Registration Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(REGISTER_URL)
    await expect(page.locator('h1')).toContainText('Create Your Account')
  })

  test.describe('Initial State and Layout', () => {
    test('should display the registration form with correct initial state', async ({ page }) => {
      // Check header
      await expect(page.locator('h1')).toContainText('Create Your Account')
      
      // Check progress indicator shows step 1
      const step1 = page.locator('[class*="rounded-full"]').first()
      await expect(step1).toContainText('1')
      
      // Check step title
      await expect(page.locator('h2')).toContainText('Personal Information')
      
      // Check form fields are visible
      await expect(page.locator('input[id="firstName"]')).toBeVisible()
      await expect(page.locator('input[id="lastName"]')).toBeVisible()
      await expect(page.locator('input[id="email"]')).toBeVisible()
      await expect(page.locator('input[id="phone"]')).toBeVisible()
      
      // Check navigation buttons
      await expect(page.getByRole('button', { name: /previous/i })).toBeDisabled()
      await expect(page.getByRole('button', { name: /next/i })).toBeEnabled()
    })

    test('should show step indicator text', async ({ page }) => {
      await expect(page.locator('text=Step 1 of 4')).toBeVisible()
    })
  })

  test.describe('Step 1: Personal Information - Field Validation', () => {
    test('should validate required fields', async ({ page }) => {
      // Try to proceed without filling fields
      await page.getByRole('button', { name: /next/i }).click()
      
      // Should stay on step 1
      await expect(page.locator('h2')).toContainText('Personal Information')
      
      // Check error messages appear
      await expect(page.locator('text=First name is required')).toBeVisible()
      await expect(page.locator('text=Last name is required')).toBeVisible()
      await expect(page.locator('text=Email is required')).toBeVisible()
    })

    test('should validate first name minimum length', async ({ page }) => {
      await page.locator('input[id="firstName"]').fill('A')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('test@example.com')
      
      await page.getByRole('button', { name: /next/i }).click()
      
      await expect(page.locator('text=First name must be at least 2 characters')).toBeVisible()
    })

    test('should validate last name minimum length', async ({ page }) => {
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('S')
      await page.locator('input[id="email"]').fill('test@example.com')
      
      await page.getByRole('button', { name: /next/i }).click()
      
      await expect(page.locator('text=Last name must be at least 2 characters')).toBeVisible()
    })

    test('should validate email format', async ({ page }) => {
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('invalid-email')
      
      await page.getByRole('button', { name: /next/i }).click()
      
      await expect(page.locator('text=Please enter a valid email address')).toBeVisible()
    })

    test('should validate phone number format when provided', async ({ page }) => {
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('test@example.com')
      await page.locator('input[id="phone"]').fill('123')
      
      await page.getByRole('button', { name: /next/i }).click()
      
      await expect(page.locator('text=Please enter a valid phone number')).toBeVisible()
    })

    test('should clear errors when user starts typing', async ({ page }) => {
      // Trigger validation error
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=First name is required')).toBeVisible()
      
      // Start typing
      await page.locator('input[id="firstName"]').fill('J')
      
      // Error should clear
      await expect(page.locator('text=First name is required')).not.toBeVisible()
    })

    test('should accept valid personal information', async ({ page }) => {
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('john.smith@example.com')
      await page.locator('input[id="phone"]').fill('+1 (555) 123-4567')
      
      await page.getByRole('button', { name: /next/i }).click()
      
      // Should move to step 2
      await expect(page.locator('h2')).toContainText('Account Details')
      await expect(page.locator('text=Step 2 of 4')).toBeVisible()
    })
  })

  test.describe('Step 2: Account Details - Field Validation', () => {
    test.beforeEach(async ({ page }) => {
      // Fill step 1 and proceed
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('john.smith@example.com')
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('h2')).toContainText('Account Details')
    })

    test('should validate username is required', async ({ page }) => {
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=Username is required')).toBeVisible()
    })

    test('should validate username minimum length', async ({ page }) => {
      await page.locator('input[id="username"]').fill('ab')
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=Username must be at least 3 characters')).toBeVisible()
    })

    test('should validate username format (alphanumeric and underscore only)', async ({ page }) => {
      await page.locator('input[id="username"]').fill('user-name')
      await page.locator('input[id="password"]').fill('Password123')
      await page.locator('input[id="confirmPassword"]').fill('Password123')
      
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=Username can only contain letters, numbers, and underscores')).toBeVisible()
    })

    test('should validate password is required', async ({ page }) => {
      await page.locator('input[id="username"]').fill('johndoe')
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=Password is required')).toBeVisible()
    })

    test('should validate password minimum length', async ({ page }) => {
      await page.locator('input[id="username"]').fill('johndoe')
      await page.locator('input[id="password"]').fill('Pass1')
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=Password must be at least 8 characters')).toBeVisible()
    })

    test('should validate password strength requirements', async ({ page }) => {
      await page.locator('input[id="username"]').fill('johndoe')
      
      // Test missing uppercase
      await page.locator('input[id="password"]').fill('password123')
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=Password must contain uppercase, lowercase, and a number')).toBeVisible()
      
      // Test missing lowercase
      await page.locator('input[id="password"]').fill('PASSWORD123')
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=Password must contain uppercase, lowercase, and a number')).toBeVisible()
      
      // Test missing number
      await page.locator('input[id="password"]').fill('Password')
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=Password must contain uppercase, lowercase, and a number')).toBeVisible()
    })

    test('should validate password confirmation is required', async ({ page }) => {
      await page.locator('input[id="username"]').fill('johndoe')
      await page.locator('input[id="password"]').fill('Password123')
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=Please confirm your password')).toBeVisible()
    })

    test('should validate password confirmation matches', async ({ page }) => {
      await page.locator('input[id="username"]').fill('johndoe')
      await page.locator('input[id="password"]').fill('Password123')
      await page.locator('input[id="confirmPassword"]').fill('Password456')
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=Passwords do not match')).toBeVisible()
    })

    test('should accept valid account details', async ({ page }) => {
      await page.locator('input[id="username"]').fill('johndoe')
      await page.locator('input[id="password"]').fill('Password123')
      await page.locator('input[id="confirmPassword"]').fill('Password123')
      
      await page.getByRole('button', { name: /next/i }).click()
      
      // Should move to step 3
      await expect(page.locator('h2')).toContainText('Additional Information')
      await expect(page.locator('text=Step 3 of 4')).toBeVisible()
    })
  })

  test.describe('Step 3: Additional Information - Field Validation', () => {
    test.beforeEach(async ({ page }) => {
      // Fill steps 1 and 2 and proceed
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('john.smith@example.com')
      await page.getByRole('button', { name: /next/i }).click()
      
      await page.locator('input[id="username"]').fill('johndoe')
      await page.locator('input[id="password"]').fill('Password123')
      await page.locator('input[id="confirmPassword"]').fill('Password123')
      await page.getByRole('button', { name: /next/i }).click()
      
      await expect(page.locator('h2')).toContainText('Additional Information')
    })

    test('should validate country is required', async ({ page }) => {
      // Set date of birth and terms, but not country
      const today = new Date()
      const birthDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate())
      await page.locator('input[id="dateOfBirth"]').fill(birthDate.toISOString().split('T')[0])
      await page.locator('input[id="acceptTerms"]').check()
      
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=Please select a country')).toBeVisible()
    })

    test('should validate date of birth is required', async ({ page }) => {
      await page.locator('select[id="country"]').selectOption('us')
      await page.locator('input[id="acceptTerms"]').check()
      
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=Date of birth is required')).toBeVisible()
    })

    test('should validate age requirement (18+)', async ({ page }) => {
      await page.locator('select[id="country"]').selectOption('us')
      
      // Set date of birth to 17 years ago
      const today = new Date()
      const birthDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate())
      await page.locator('input[id="dateOfBirth"]').fill(birthDate.toISOString().split('T')[0])
      await page.locator('input[id="acceptTerms"]').check()
      
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=You must be at least 18 years old')).toBeVisible()
    })

    test('should validate terms acceptance is required', async ({ page }) => {
      await page.locator('select[id="country"]').selectOption('us')
      const today = new Date()
      const birthDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate())
      await page.locator('input[id="dateOfBirth"]').fill(birthDate.toISOString().split('T')[0])
      
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('text=You must accept the terms and conditions')).toBeVisible()
    })

    test('should accept valid additional information', async ({ page }) => {
      await page.locator('select[id="country"]').selectOption('us')
      const today = new Date()
      const birthDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate())
      await page.locator('input[id="dateOfBirth"]').fill(birthDate.toISOString().split('T')[0])
      await page.locator('input[id="acceptTerms"]').check()
      await page.locator('input[id="subscribeNewsletter"]').check()
      
      await page.getByRole('button', { name: /next/i }).click()
      
      // Should move to step 4
      await expect(page.locator('h2')).toContainText('Review & Submit')
      await expect(page.locator('text=Step 4 of 4')).toBeVisible()
    })
  })

  test.describe('Step Navigation', () => {
    test('should navigate forward through all steps', async ({ page }) => {
      // Step 1
      await expect(page.locator('h2')).toContainText('Personal Information')
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('john.smith@example.com')
      await page.getByRole('button', { name: /next/i }).click()
      
      // Step 2
      await expect(page.locator('h2')).toContainText('Account Details')
      await page.locator('input[id="username"]').fill('johndoe')
      await page.locator('input[id="password"]').fill('Password123')
      await page.locator('input[id="confirmPassword"]').fill('Password123')
      await page.getByRole('button', { name: /next/i }).click()
      
      // Step 3
      await expect(page.locator('h2')).toContainText('Additional Information')
      await page.locator('select[id="country"]').selectOption('us')
      const today = new Date()
      const birthDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate())
      await page.locator('input[id="dateOfBirth"]').fill(birthDate.toISOString().split('T')[0])
      await page.locator('input[id="acceptTerms"]').check()
      await page.getByRole('button', { name: /next/i }).click()
      
      // Step 4
      await expect(page.locator('h2')).toContainText('Review & Submit')
    })

    test('should navigate backward through steps', async ({ page }) => {
      // Fill and go to step 2
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('john.smith@example.com')
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.locator('h2')).toContainText('Account Details')
      
      // Go back
      await page.getByRole('button', { name: /previous/i }).click()
      await expect(page.locator('h2')).toContainText('Personal Information')
      
      // Data should persist
      await expect(page.locator('input[id="firstName"]')).toHaveValue('John')
      await expect(page.locator('input[id="lastName"]')).toHaveValue('Smith')
      await expect(page.locator('input[id="email"]')).toHaveValue('john.smith@example.com')
    })

    test('should disable Previous button on first step', async ({ page }) => {
      await expect(page.getByRole('button', { name: /previous/i })).toBeDisabled()
    })

    test('should enable Previous button after step 1', async ({ page }) => {
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('john.smith@example.com')
      await page.getByRole('button', { name: /next/i }).click()
      
      await expect(page.getByRole('button', { name: /previous/i })).toBeEnabled()
    })

    test('should update progress indicator when navigating', async ({ page }) => {
      // Step 1
      const step1Indicator = page.locator('[class*="rounded-full"]').first()
      await expect(step1Indicator).toContainText('1')
      
      // Move to step 2
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('john.smith@example.com')
      await page.getByRole('button', { name: /next/i }).click()
      
      // Step 2 should be active
      await expect(page.locator('text=Step 2 of 4')).toBeVisible()
    })
  })

  test.describe('Step 4: Review & Submit', () => {
    test.beforeEach(async ({ page }) => {
      // Fill all steps and proceed to review
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('john.smith@example.com')
      await page.locator('input[id="phone"]').fill('+1 (555) 123-4567')
      await page.getByRole('button', { name: /next/i }).click()
      
      await page.locator('input[id="username"]').fill('johndoe')
      await page.locator('input[id="password"]').fill('Password123')
      await page.locator('input[id="confirmPassword"]').fill('Password123')
      await page.getByRole('button', { name: /next/i }).click()
      
      await page.locator('select[id="country"]').selectOption('us')
      const today = new Date()
      const birthDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate())
      await page.locator('input[id="dateOfBirth"]').fill(birthDate.toISOString().split('T')[0])
      await page.locator('input[id="acceptTerms"]').check()
      await page.locator('input[id="subscribeNewsletter"]').check()
      await page.getByRole('button', { name: /next/i }).click()
      
      await expect(page.locator('h2')).toContainText('Review & Submit')
    })

    test('should display all entered information', async ({ page }) => {
      // Check that review section contains all the entered data
      // Structure: <div><p>Label</p><p>Value</p></div>
      // Find the div that contains a paragraph with the label text, then get the value paragraph
      
      // Check First Name - find div that has a child p with "First Name", then get the second p (value)
      const firstNameLabel = page.getByText('First Name', { exact: true })
      const firstNameSection = firstNameLabel.locator('..') // parent div
      await expect(firstNameSection.locator('p').nth(1)).toContainText('John')
      
      // Check Last Name
      const lastNameLabel = page.getByText('Last Name', { exact: true })
      const lastNameSection = lastNameLabel.locator('..')
      await expect(lastNameSection.locator('p').nth(1)).toContainText('Smith')
      
      // Check Email
      const emailLabel = page.getByText('Email', { exact: true })
      const emailSection = emailLabel.locator('..')
      await expect(emailSection.locator('p').nth(1)).toContainText('john.smith@example.com')
      
      // Check Phone
      const phoneLabel = page.getByText('Phone', { exact: true })
      const phoneSection = phoneLabel.locator('..')
      await expect(phoneSection.locator('p').nth(1)).toContainText('+1 (555) 123-4567')
      
      // Check Username
      const usernameLabel = page.getByText('Username', { exact: true })
      const usernameSection = usernameLabel.locator('..')
      await expect(usernameSection.locator('p').nth(1)).toContainText('johndoe')
      
      // Check Country
      const countryLabel = page.getByText('Country', { exact: true })
      const countrySection = countryLabel.locator('..')
      await expect(countrySection.locator('p').nth(1)).toContainText('United States')
      
      // Check Newsletter
      const newsletterLabel = page.getByText('Newsletter', { exact: true })
      const newsletterSection = newsletterLabel.locator('..')
      await expect(newsletterSection.locator('p').nth(1)).toContainText('Subscribed')
    })

    test('should show submit button instead of next', async ({ page }) => {
      await expect(page.getByRole('button', { name: /submit registration/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /next/i })).not.toBeVisible()
    })

    test('should handle form submission', async ({ page }) => {
      // Mock alert dialog
      page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Registration successful')
        await dialog.accept()
      })
      
      await page.getByRole('button', { name: /submit registration/i }).click()
      
      // Button should show loading state
      await expect(page.getByRole('button', { name: /submitting/i })).toBeVisible()
      
      // Wait for submission to complete
      await page.waitForTimeout(2500)
    })

    test('should validate step 3 if trying to submit with invalid data', async ({ page }) => {
      // Go back to step 3 and uncheck terms
      await page.getByRole('button', { name: /previous/i }).click()
      await expect(page.locator('h2')).toContainText('Additional Information')
      
      // Uncheck terms
      await page.locator('input[id="acceptTerms"]').uncheck()
      
      // Try to proceed to step 4 - should fail validation
      await page.getByRole('button', { name: /next/i }).click()
      
      // Should stay on step 3 with error (validation prevents moving forward)
      await expect(page.locator('h2')).toContainText('Additional Information')
      await expect(page.locator('text=You must accept the terms and conditions')).toBeVisible()
      
      // Submit button should not exist since we're still on step 3
      await expect(page.getByRole('button', { name: /submit registration/i })).not.toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test('should have proper labels for all form fields', async ({ page }) => {
      // Step 1
      await expect(page.locator('label[for="firstName"]')).toContainText('First Name')
      await expect(page.locator('label[for="lastName"]')).toContainText('Last Name')
      await expect(page.locator('label[for="email"]')).toContainText('Email Address')
      await expect(page.locator('label[for="phone"]')).toContainText('Phone Number')
      
      // Navigate to step 2
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('john.smith@example.com')
      await page.getByRole('button', { name: /next/i }).click()
      
      await expect(page.locator('label[for="username"]')).toContainText('Username')
      await expect(page.locator('label[for="password"]')).toContainText('Password')
      await expect(page.locator('label[for="confirmPassword"]')).toContainText('Confirm Password')
    })

    test('should have required field indicators', async ({ page }) => {
      const firstNameLabel = page.locator('label[for="firstName"]')
      await expect(firstNameLabel.locator('text=*')).toBeVisible()
      
      const emailLabel = page.locator('label[for="email"]')
      await expect(emailLabel.locator('text=*')).toBeVisible()
    })

    test('should associate error messages with form fields', async ({ page }) => {
      await page.getByRole('button', { name: /next/i }).click()
      
      // Check that error messages are present and associated
      const firstNameInput = page.locator('input[id="firstName"]')
      await expect(firstNameInput).toHaveAttribute('aria-invalid', 'true')
      
      const errorMessage = page.locator('text=First name is required')
      await expect(errorMessage).toBeVisible()
    })

    test('should have proper ARIA attributes for progress indicator', async ({ page }) => {
      // Check step indicators are present
      const stepIndicators = page.locator('[class*="rounded-full"]')
      await expect(stepIndicators.first()).toBeVisible()
    })

    test('should have accessible button labels', async ({ page }) => {
      await expect(page.getByRole('button', { name: /previous/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /next/i })).toBeVisible()
    })

    test('should have proper form structure', async ({ page }) => {
      // Check that inputs have proper IDs and labels
      const firstNameInput = page.locator('input[id="firstName"]')
      await expect(firstNameInput).toBeVisible()
      
      const firstNameLabel = page.locator('label[for="firstName"]')
      await expect(firstNameLabel).toBeVisible()
    })

    test('should announce errors to screen readers', async ({ page }) => {
      // Trigger validation
      await page.getByRole('button', { name: /next/i }).click()
      
      // Check that error messages are visible (screen readers can access them)
      const errorMessages = page.locator('[class*="text-red-600"], [class*="text-red-400"]')
      await expect(errorMessages.first()).toBeVisible()
    })

    test('should have proper autocomplete attributes', async ({ page }) => {
      await expect(page.locator('input[id="firstName"]')).toHaveAttribute('autocomplete', 'given-name')
      await expect(page.locator('input[id="lastName"]')).toHaveAttribute('autocomplete', 'family-name')
      await expect(page.locator('input[id="email"]')).toHaveAttribute('autocomplete', 'email')
      await expect(page.locator('input[id="phone"]')).toHaveAttribute('autocomplete', 'tel')
    })

    test('should have accessible checkbox labels', async ({ page }) => {
      // Navigate to step 3
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('john.smith@example.com')
      await page.getByRole('button', { name: /next/i }).click()
      
      await page.locator('input[id="username"]').fill('johndoe')
      await page.locator('input[id="password"]').fill('Password123')
      await page.locator('input[id="confirmPassword"]').fill('Password123')
      await page.getByRole('button', { name: /next/i }).click()
      
      // Check checkbox labels
      const termsLabel = page.locator('label[for="acceptTerms"]')
      await expect(termsLabel).toBeVisible()
      await expect(termsLabel).toContainText('Terms and Conditions')
      
      const newsletterLabel = page.locator('label[for="subscribeNewsletter"]')
      await expect(newsletterLabel).toBeVisible()
    })
  })

  test.describe('Form Data Persistence', () => {
    test('should persist data when navigating between steps', async ({ page }) => {
      // Fill step 1
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('john.smith@example.com')
      await page.locator('input[id="phone"]').fill('+1 (555) 123-4567')
      await page.getByRole('button', { name: /next/i }).click()
      
      // Fill step 2
      await page.locator('input[id="username"]').fill('johndoe')
      await page.locator('input[id="password"]').fill('Password123')
      await page.locator('input[id="confirmPassword"]').fill('Password123')
      await page.getByRole('button', { name: /next/i }).click()
      
      // Go back to step 1
      await page.getByRole('button', { name: /previous/i }).click()
      await page.getByRole('button', { name: /previous/i }).click()
      
      // Data should still be there
      await expect(page.locator('input[id="firstName"]')).toHaveValue('John')
      await expect(page.locator('input[id="lastName"]')).toHaveValue('Smith')
      await expect(page.locator('input[id="email"]')).toHaveValue('john.smith@example.com')
      await expect(page.locator('input[id="phone"]')).toHaveValue('+1 (555) 123-4567')
    })
  })

  test.describe('Error Handling', () => {
    test('should show all validation errors at once', async ({ page }) => {
      await page.getByRole('button', { name: /next/i }).click()
      
      // All required field errors should appear
      await expect(page.locator('text=First name is required')).toBeVisible()
      await expect(page.locator('text=Last name is required')).toBeVisible()
      await expect(page.locator('text=Email is required')).toBeVisible()
    })

    test('should prevent navigation with invalid data', async ({ page }) => {
      // Try to proceed with invalid email
      await page.locator('input[id="firstName"]').fill('John')
      await page.locator('input[id="lastName"]').fill('Smith')
      await page.locator('input[id="email"]').fill('invalid-email')
      await page.getByRole('button', { name: /next/i }).click()
      
      // Should stay on step 1
      await expect(page.locator('h2')).toContainText('Personal Information')
    })
  })
})
