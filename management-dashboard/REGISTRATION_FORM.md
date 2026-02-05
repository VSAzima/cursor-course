# Multi-Step Registration Form

A comprehensive multi-step registration form component with validation, progress tracking, and a modern UI.

## 🎯 Features

- ✅ **4-Step Registration Process**
  - Step 1: Personal Information (Name, Email, Phone)
  - Step 2: Account Details (Username, Password)
  - Step 3: Additional Information (Country, Date of Birth, Terms)
  - Step 4: Review & Submit

- ✅ **Form Validation**
  - Real-time error clearing
  - Step-by-step validation
  - Required field validation
  - Email format validation
  - Password strength requirements
  - Age verification (18+)
  - Password confirmation matching

- ✅ **User Experience**
  - Visual progress indicator
  - Step navigation (Next/Previous)
  - Form data persistence across steps
  - Review step before submission
  - Loading states during submission
  - Responsive design (mobile-friendly)

- ✅ **Accessibility**
  - Proper labels and ARIA attributes
  - Keyboard navigation support
  - Focus management
  - Screen reader friendly

## 📁 File Structure

```
management-dashboard/
├── src/
│   ├── components/
│   │   └── registration/
│   │       ├── RegistrationForm.tsx    # Main form component
│   │       └── index.ts                # Exports
│   ├── pages/
│   │   └── Registration.tsx             # Registration page
│   ├── types/
│   │   └── registration.ts             # TypeScript types
│   └── App.tsx                          # Routes (includes /register)
```

## 🚀 Usage

### Access the Form

Navigate to `/register` in your browser:

```bash
# Start the dev server
npm run dev

# Then visit: http://localhost:5173/register
```

### Programmatic Usage

```tsx
import { RegistrationForm } from './components/registration'

function App() {
  return <RegistrationForm />
}
```

## 📋 Form Steps

### Step 1: Personal Information
- **First Name** (required, min 2 chars)
- **Last Name** (required, min 2 chars)
- **Email** (required, valid format)
- **Phone** (optional, validated if provided)

### Step 2: Account Details
- **Username** (required, 3+ chars, alphanumeric + underscore)
- **Password** (required, 8+ chars, uppercase + lowercase + number)
- **Confirm Password** (required, must match)

### Step 3: Additional Information
- **Country** (required, dropdown selection)
- **Date of Birth** (required, must be 18+)
- **Accept Terms** (required checkbox)
- **Subscribe Newsletter** (optional checkbox)

### Step 4: Review & Submit
- Review all entered information
- Submit registration

## ✅ Validation Rules

### Personal Information
- First/Last Name: Required, minimum 2 characters
- Email: Required, valid email format (regex)
- Phone: Optional, but must have 10+ digits if provided

### Account Details
- Username: Required, 3+ characters, alphanumeric + underscore only
- Password: Required, 8+ characters, must contain:
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
- Confirm Password: Must match password

### Additional Information
- Country: Required selection
- Date of Birth: Required, user must be 18+ years old
- Terms: Must be accepted (required)

## 🎨 Customization

### Modify Steps

Edit the `STEPS` array in `RegistrationForm.tsx`:

```tsx
const STEPS = [
  { id: 1, title: 'Your Title', description: 'Your description' },
  // Add more steps...
]
```

### Add/Remove Fields

1. Update `RegistrationFormData` type in `types/registration.ts`
2. Add field to form state initialization
3. Add input field in appropriate step's `renderStepContent()`
4. Add validation logic in `validateStep()`

### Customize Countries List

Modify the `COUNTRIES` array in `RegistrationForm.tsx`:

```tsx
const COUNTRIES = [
  { value: '', label: 'Select a country' },
  { value: 'us', label: 'United States' },
  // Add more countries...
]
```

### Styling

The form uses Tailwind CSS classes. Customize colors, spacing, and layout by modifying the className strings in the component.

## 🔧 API Integration

To connect to a real backend, modify the `handleSubmit` function:

```tsx
const handleSubmit = async () => {
  if (!validateStep(3)) {
    setCurrentStep(3)
    return
  }

  setIsSubmitting(true)
  
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    
    if (!response.ok) throw new Error('Registration failed')
    
    // Handle success (redirect, show message, etc.)
    alert('Registration successful!')
  } catch (error) {
    // Handle error
    alert('Registration failed. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}
```

## 📱 Responsive Design

The form is fully responsive:
- **Mobile**: Single column layout, stacked inputs
- **Tablet**: 2-column grid for name fields
- **Desktop**: Full layout with progress indicator

## ♿ Accessibility

- Semantic HTML elements
- Proper label associations
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- Error announcements

## 🧪 Testing

Test the form by:

1. **Validation Testing**
   - Try submitting with empty fields
   - Test invalid email formats
   - Test weak passwords
   - Test password mismatch
   - Test age requirement

2. **Navigation Testing**
   - Navigate forward/backward through steps
   - Verify data persists across steps
   - Test on mobile devices

3. **Submission Testing**
   - Complete all steps and submit
   - Verify loading state appears
   - Check console for submitted data

## 📝 Notes

- Form data is stored in component state (not persisted to localStorage)
- Validation errors clear as user types
- Step validation prevents moving forward with invalid data
- Review step shows all entered information before submission

## 🐛 Troubleshooting

### Form not validating
- Check that all required fields are filled
- Verify validation rules match your requirements
- Check browser console for errors

### Navigation not working
- Ensure all previous steps are validated
- Check that `currentStep` state is updating correctly

### Styling issues
- Verify Tailwind CSS is properly configured
- Check that dark mode classes are working if using dark mode

---

**Created**: February 2026  
**Component**: RegistrationForm  
**Location**: `/src/components/registration/RegistrationForm.tsx`
