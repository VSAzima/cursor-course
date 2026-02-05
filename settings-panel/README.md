# Settings Panel Components

A comprehensive, accessible, and responsive settings panel built with React, TypeScript, and Tailwind CSS.

## 🎯 Features

- **4 Settings Tabs**: Profile, Notifications, Privacy, and Appearance
- **Dark Mode Support**: Full dark mode implementation with smooth transitions
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Form Components**: Inputs, selects, toggles with validation support
- **TypeScript**: Full type safety throughout all components

## 📦 Components

### SettingsPanel.tsx
Main component that orchestrates the entire settings interface.

**Features:**
- Tab navigation
- State management for all settings
- Save functionality with loading states
- Success/error message handling

### SettingsTabs.tsx
Responsive tab navigation component.

**Features:**
- Desktop horizontal tabs with icons
- Mobile dropdown selector
- Active state indication
- Keyboard accessible

### ToggleSwitch.tsx
Accessible toggle switch component.

**Props:**
- `id`: Unique identifier
- `label`: Switch label
- `description`: Optional helper text
- `checked`: Current state
- `onChange`: Change handler
- `disabled`: Disable state

### FormInput.tsx
Text input component with validation.

**Props:**
- `id`: Unique identifier
- `label`: Input label
- `type`: Input type (text, email, password, etc.)
- `value`: Current value
- `onChange`: Change handler
- `error`: Error message
- `helperText`: Helper text
- `required`: Required field indicator
- `disabled`: Disable state

### FormSelect.tsx
Dropdown select component.

**Props:**
- `id`: Unique identifier
- `label`: Select label
- `value`: Current value
- `onChange`: Change handler
- `options`: Array of options
- `placeholder`: Placeholder text
- `required`: Required field indicator
- `disabled`: Disable state

## 🎨 Design System

### Colors
- **Primary**: Blue (blue-500, blue-600)
- **Background Light**: White, gray-50
- **Background Dark**: gray-800, gray-900
- **Text Light**: gray-900, gray-700
- **Text Dark**: gray-100, gray-300
- **Borders**: gray-300 (light), gray-600 (dark)

### Typography
- **Headers**: Font bold, sizes 3xl, 2xl, xl
- **Body**: Font medium/normal, size sm
- **Helper Text**: Size sm, muted colors

### Spacing
- Consistent padding: px-4, py-2.5, py-4
- Gap spacing: gap-4, gap-6
- Responsive margins: mb-8, mt-2

## 🚀 Usage

```tsx
import { SettingsPanel } from './settings-panel';

function App() {
  return <SettingsPanel />;
}
```

### Individual Components

```tsx
import { ToggleSwitch, FormInput, FormSelect } from './settings-panel';

function MyForm() {
  const [enabled, setEnabled] = useState(false);
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('light');

  return (
    <>
      <FormInput
        id="name"
        label="Name"
        value={name}
        onChange={setName}
      />
      
      <FormSelect
        id="theme"
        label="Theme"
        value={theme}
        onChange={setTheme}
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' }
        ]}
      />
      
      <ToggleSwitch
        id="notifications"
        label="Enable Notifications"
        checked={enabled}
        onChange={setEnabled}
      />
    </>
  );
}
```

## 🎨 Tailwind Configuration

Make sure your `tailwind.config.js` includes:

```js
module.exports = {
  darkMode: 'class', // or 'media'
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './settings-panel/**/*.{js,jsx,ts,tsx}',
  ],
  // ... rest of config
}
```

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of labels, buttons, and form elements
- **ARIA Labels**: All interactive elements have appropriate ARIA attributes
- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Space, Arrow keys)
- **Focus Management**: Visible focus indicators with ring-2
- **Screen Reader Support**: Proper announcements for state changes
- **Color Contrast**: WCAG AA compliant color combinations

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
  - Stacked layout
  - Dropdown tab selector
  - Full-width inputs
  
- **Tablet**: 640px - 1024px (sm-lg)
  - Horizontal tabs
  - 2-column forms where appropriate
  
- **Desktop**: > 1024px (lg+)
  - Max-width container (4xl)
  - Optimal spacing and layout

## 🔧 Customization

### Changing Theme Colors

Edit the button and focus ring classes in the components:

```tsx
// Change primary color from blue to purple
className="bg-blue-600 hover:bg-blue-700"
// to
className="bg-purple-600 hover:bg-purple-700"
```

### Adding New Tabs

1. Add tab to the `tabs` array in SettingsPanel:

```tsx
const tabs: Tab[] = [
  // ... existing tabs
  { id: 'security', label: 'Security', icon: <LockIcon /> },
];
```

2. Add case to `renderTabContent()`:

```tsx
case 'security':
  return (
    <div>
      {/* Your security settings */}
    </div>
  );
```

3. Add settings state properties:

```tsx
interface SettingsState {
  // ... existing settings
  twoFactorAuth: boolean;
  loginAlerts: boolean;
}
```

## 📝 TypeScript Types

All components are fully typed. Key interfaces:

```tsx
interface SettingsState {
  firstName: string;
  lastName: string;
  // ... all settings
}

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SelectOption {
  value: string;
  label: string;
}
```

## 🎯 Best Practices

1. **Always provide unique IDs** for form elements
2. **Use helperText** for additional context
3. **Provide error messages** for validation
4. **Keep labels concise** but descriptive
5. **Group related settings** logically
6. **Test with keyboard only** for accessibility
7. **Test in dark mode** to ensure proper contrast

## 🐛 Common Issues

### Dark mode not working
- Ensure `darkMode: 'class'` is set in tailwind.config.js
- Add the `dark` class to your root element

### Styles not applying
- Check that Tailwind is properly configured
- Verify the content paths in tailwind.config.js
- Ensure the CSS is imported in your app

### TypeScript errors
- Install @types/react if missing
- Ensure TypeScript version >= 4.5

## 📄 License

MIT - Feel free to use in your projects!
