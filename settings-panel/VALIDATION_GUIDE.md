# Form Validation Guide

## Overview

The Settings Panel includes comprehensive form validation to ensure data integrity and provide clear user feedback.

## Validation Features

### ✅ Real-time Validation
- Errors clear as users type
- Immediate feedback on field blur
- Visual error states with red borders and messages

### ✅ Required Field Validation
- First Name (minimum 2 characters)
- Last Name (minimum 2 characters)
- Email Address (valid format)

### ✅ Format Validation
- **Email**: Must match standard email pattern (user@domain.com)
- **Phone**: Optional, but if provided must contain at least 10 digits
  - Accepts: +1 (555) 123-4567, 555-123-4567, +1-555-123-4567
  - Validates: Proper format with digits, spaces, dashes, parentheses

### ✅ Error Display
- Inline error messages below each field
- Red border styling for invalid fields
- Summary count of errors in footer
- Auto-scroll to profile tab if validation fails

## Validation Rules

### Profile Tab

#### First Name
```typescript
- Required: Yes
- Min Length: 2 characters
- Validation: Not empty, trimmed
- Error Messages:
  - "First name is required"
  - "First name must be at least 2 characters"
```

#### Last Name
```typescript
- Required: Yes
- Min Length: 2 characters
- Validation: Not empty, trimmed
- Error Messages:
  - "Last name is required"
  - "Last name must be at least 2 characters"
```

#### Email
```typescript
- Required: Yes
- Pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
- Validation: Standard email format
- Error Messages:
  - "Email address is required"
  - "Please enter a valid email address"
```

#### Phone
```typescript
- Required: No
- Pattern: /^[\d\s\-\+\(\)]+$/
- Min Digits: 10
- Validation: Optional, but must be valid if provided
- Error Messages:
  - "Please enter a valid phone number (at least 10 digits)"
```

## User Experience

### When User Makes Changes
1. User types in a field
2. If field had an error, it clears immediately
3. Visual feedback updates in real-time

### When User Clicks Save
1. All fields are validated
2. If errors exist:
   - Save is prevented
   - Error messages display
   - User is redirected to Profile tab (if errors there)
   - Footer shows error count
   - Error message appears (red text)
3. If validation passes:
   - Save proceeds
   - Success message displays (green text)
   - Form state is preserved

### When User Clicks Cancel
1. All changes are discarded
2. Form resets to initial values
3. All validation errors are cleared
4. No confirmation dialog (immediate reset)

## Implementation Example

### Basic Validation
```tsx
const validateForm = (): boolean => {
  const errors: ValidationErrors = {};

  // Required field with min length
  if (!settings.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (settings.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(settings.email)) {
    errors.email = 'Please enter a valid email address';
  }

  return Object.keys(errors).length === 0;
};
```

### Clearing Errors on Input
```tsx
const updateSetting = (key, value) => {
  setSettings(prev => ({ ...prev, [key]: value }));
  
  // Clear error for this field
  if (validationErrors[key]) {
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  }
};
```

## Extending Validation

### Adding New Validation Rules

To add validation for a new field:

1. **Add validation logic in `validateForm()`:**
```tsx
// Validate Bio (example)
if (settings.bio.length > 500) {
  errors.bio = 'Bio must be less than 500 characters';
}
```

2. **Pass error to the component:**
```tsx
<FormInput
  id="bio"
  label="Bio"
  value={settings.bio}
  onChange={(value) => updateSetting('bio', value)}
  error={validationErrors.bio}
/>
```

### Custom Validators

Create reusable validator functions:

```tsx
// validators.ts
export const validators = {
  email: (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? null : 'Invalid email format';
  },
  
  minLength: (min: number) => (value: string) => {
    return value.length >= min ? null : `Minimum ${min} characters required`;
  },
  
  phone: (value: string) => {
    if (!value) return null; // Optional
    const digits = value.replace(/\D/g, '');
    return digits.length >= 10 ? null : 'Phone must have at least 10 digits';
  },
  
  url: (value: string) => {
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  }
};

// Usage
const error = validators.email(settings.email);
if (error) {
  errors.email = error;
}
```

### Async Validation

For server-side validation (e.g., checking if email exists):

```tsx
const checkEmailAvailability = async (email: string) => {
  try {
    const response = await fetch(`/api/check-email?email=${email}`);
    const data = await response.json();
    return data.available ? null : 'Email is already taken';
  } catch {
    return 'Unable to verify email';
  }
};

// Use in validation
const asyncErrors = await Promise.all([
  checkEmailAvailability(settings.email),
  // other async validations
]);
```

## Accessibility

### ARIA Attributes
- `aria-invalid`: Set to "true" when field has error
- `aria-describedby`: Links to error message element
- `role="alert"`: Error messages announce to screen readers

### Error Announcement
```tsx
<input
  aria-invalid={error ? 'true' : 'false'}
  aria-describedby={error ? `${id}-error` : undefined}
/>

<p id={`${id}-error`} role="alert">
  {error}
</p>
```

## Best Practices

1. **Validate on Save**: Always validate before submitting
2. **Clear on Type**: Remove errors as user corrects them
3. **Show Context**: Display errors inline near the field
4. **Provide Summary**: Show total error count
5. **Be Specific**: Give clear, actionable error messages
6. **Test Edge Cases**: Empty strings, whitespace, special characters
7. **Consider UX**: Don't validate too aggressively (wait for blur or submit)

## Testing Validation

### Manual Test Cases

1. **Empty Required Fields**
   - Clear first name → Error: "First name is required"
   - Clear last name → Error: "Last name is required"
   - Clear email → Error: "Email address is required"

2. **Invalid Formats**
   - Email: "notanemail" → Error: "Please enter a valid email address"
   - Phone: "123" → Error: "Please enter a valid phone number (at least 10 digits)"

3. **Valid Inputs**
   - First name: "John" → No error
   - Email: "john@example.com" → No error
   - Phone: "+1 (555) 123-4567" → No error

4. **Real-time Clearing**
   - Trigger error → Start typing → Error clears immediately

5. **Cancel Functionality**
   - Make changes → Click Cancel → All fields reset
   - Trigger errors → Click Cancel → All errors cleared

## Troubleshooting

### Validation Not Triggering
- Check that `validateForm()` is called in `handleSave()`
- Verify validation errors state is properly set
- Ensure error prop is passed to form components

### Errors Not Clearing
- Verify `updateSetting()` includes error clearing logic
- Check that field names match between state and validation

### Placeholders Not Showing
- Ensure `placeholder` prop is passed to FormInput
- Check that value is empty string (not undefined)

## Future Enhancements

Potential improvements:

1. **Debounced Validation**: Validate after user stops typing (300ms delay)
2. **Field-level Async Validation**: Real-time uniqueness checks
3. **Conditional Validation**: Rules based on other field values
4. **Custom Error Placement**: Toast notifications for global errors
5. **Validation Schema**: Integration with libraries like Yup or Zod
6. **Success States**: Green checkmarks for valid fields
7. **Progressive Validation**: Show hints before errors

## Resources

- [HTML5 Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [ARIA Form Validation](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA21)
- [UX Best Practices](https://www.nngroup.com/articles/errors-forms-design-guidelines/)
