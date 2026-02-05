# Playwright E2E Tests

End-to-end tests for the Management Dashboard application using Playwright.

## 🧪 Test Coverage

### Registration Form Tests (`registration-form.spec.ts`)

Comprehensive test suite covering:

#### ✅ Field Validation
- **Step 1 (Personal Information)**
  - Required field validation (first name, last name, email)
  - Minimum length validation (2+ characters for names)
  - Email format validation
  - Phone number format validation (when provided)
  - Real-time error clearing

- **Step 2 (Account Details)**
  - Username validation (required, min 3 chars, alphanumeric + underscore only)
  - Password validation (required, min 8 chars, strength requirements)
  - Password confirmation matching
  - Format validation for all fields

- **Step 3 (Additional Information)**
  - Country selection validation
  - Date of birth validation (required, 18+ age requirement)
  - Terms acceptance validation
  - Optional newsletter subscription

#### ✅ Step Navigation
- Forward navigation through all steps
- Backward navigation with data persistence
- Previous button state (disabled on step 1, enabled after)
- Progress indicator updates
- Step validation prevents invalid navigation

#### ✅ Form Submission
- Review step displays all entered information
- Submit button replaces Next button on final step
- Loading state during submission
- Success state handling
- Validation on submit (redirects to step 3 if invalid)

#### ✅ Accessibility
- Proper form labels for all fields
- Required field indicators (*)
- Error message association with fields
- ARIA attributes
- Autocomplete attributes
- Accessible checkbox labels
- Screen reader error announcements
- Proper button labels

#### ✅ Additional Tests
- Form data persistence across steps
- Error handling (multiple errors at once)
- Navigation prevention with invalid data
- Initial state and layout verification

## 🚀 Running Tests

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
npx playwright test registration-form
```

### Run specific test
```bash
npx playwright test registration-form -g "should validate email format"
```

## 📋 Test Structure

```
e2e/
├── registration-form.spec.ts    # Registration form tests
└── README.md                    # This file
```

## 🔧 Configuration

Tests are configured in `playwright.config.ts`:
- Base URL: `http://localhost:5173`
- Browser: Chromium
- Auto-start dev server before tests
- Screenshots on failure
- HTML report generation

## 📊 Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## 🎯 Test Scenarios

### Field Validation Tests
1. ✅ Required fields show errors when empty
2. ✅ Minimum length validation works
3. ✅ Format validation (email, phone, username, password)
4. ✅ Password strength requirements enforced
5. ✅ Password confirmation matching
6. ✅ Age requirement validation (18+)
7. ✅ Terms acceptance required
8. ✅ Errors clear when user starts typing

### Navigation Tests
1. ✅ Can navigate forward through all steps
2. ✅ Can navigate backward through steps
3. ✅ Previous button disabled on step 1
4. ✅ Previous button enabled after step 1
5. ✅ Progress indicator updates correctly
6. ✅ Cannot proceed with invalid data

### Submission Tests
1. ✅ Review step shows all entered data
2. ✅ Submit button appears on final step
3. ✅ Loading state during submission
4. ✅ Success state handled correctly
5. ✅ Validation on submit redirects if invalid

### Accessibility Tests
1. ✅ All form fields have labels
2. ✅ Required fields have indicators
3. ✅ Error messages associated with fields
4. ✅ ARIA attributes present
5. ✅ Autocomplete attributes set
6. ✅ Checkbox labels accessible
7. ✅ Button labels descriptive

## 🐛 Debugging

### View test execution
```bash
npx playwright test --headed
```

### Step through test
```bash
npx playwright test --debug
```

### Run with trace
```bash
npx playwright test --trace on
```

### View trace
```bash
npx playwright show-trace trace.zip
```

## 📝 Writing New Tests

Example test structure:
```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/path')
  })

  test('should do something', async ({ page }) => {
    // Arrange
    await page.locator('selector').fill('value')
    
    // Act
    await page.getByRole('button', { name: 'Submit' }).click()
    
    // Assert
    await expect(page.locator('result')).toBeVisible()
  })
})
```

## ✅ Best Practices

1. **Use semantic selectors**: Prefer `getByRole`, `getByLabel`, `getByText`
2. **Wait for elements**: Use `expect().toBeVisible()` instead of `waitFor()`
3. **Isolate tests**: Each test should be independent
4. **Use beforeEach**: Set up common test state
5. **Test user flows**: Test complete user journeys
6. **Accessibility**: Always test accessibility features
7. **Error states**: Test both success and error paths

## 🔍 Test Coverage Summary

- **Field Validation**: ✅ Complete
- **Step Navigation**: ✅ Complete
- **Form Submission**: ✅ Complete
- **Accessibility**: ✅ Complete
- **Error Handling**: ✅ Complete
- **Data Persistence**: ✅ Complete

---

**Last Updated**: February 2026  
**Test Framework**: Playwright  
**Browser**: Chromium
