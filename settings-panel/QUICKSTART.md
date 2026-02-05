# Settings Panel - Quick Start Guide

Get up and running with the Settings Panel in 5 minutes!

## 📦 Installation

### 1. Copy the Components
The components are located in `/Users/nkatanaeva/titled_folder/settings-panel/`

### 2. Required Dependencies
Make sure you have these installed:

```bash
npm install react react-dom
# or
yarn add react react-dom
```

### 3. Tailwind CSS Setup
If you don't have Tailwind CSS set up yet:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./settings-panel/**/*.{js,ts,jsx,tsx}", // Include settings panel files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add Tailwind directives to your CSS (e.g., `src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🚀 Basic Usage

### Option 1: Use the Complete Panel

```tsx
import React from 'react';
import { SettingsPanel } from './settings-panel';

function App() {
  return (
    <div className="min-h-screen">
      <SettingsPanel />
    </div>
  );
}

export default App;
```

That's it! You now have a fully functional settings panel.

### Option 2: Use Individual Components

```tsx
import React, { useState } from 'react';
import { FormInput, ToggleSwitch, FormSelect } from './settings-panel';

function MyCustomSettings() {
  const [name, setName] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [theme, setTheme] = useState('light');

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <FormInput
        id="name"
        label="Your Name"
        value={name}
        onChange={setName}
        placeholder="Enter your name"
      />

      <FormSelect
        id="theme"
        label="Theme"
        value={theme}
        onChange={setTheme}
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ]}
      />

      <ToggleSwitch
        id="notifications"
        label="Notifications"
        checked={enabled}
        onChange={setEnabled}
      />
    </div>
  );
}
```

## 🌓 Dark Mode Setup

### Method 1: Manual Toggle (Recommended for Testing)

Add a dark mode toggle button to your app:

```tsx
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button onClick={toggleDark}>
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
```

### Method 2: System Preference

Automatically detect system preference:

```tsx
import { useEffect, useState } from 'react';

function useSystemTheme() {
  const [isDark, setIsDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isDark;
}
```

## 📱 Testing Responsive Design

### Test in Different Viewports

1. **Mobile** (< 640px): Tabs become a dropdown
2. **Tablet** (640px - 1024px): Horizontal tabs, some 2-column layouts
3. **Desktop** (> 1024px): Full layout with optimal spacing

### Chrome DevTools
1. Press `F12` or `Cmd+Option+I` (Mac)
2. Click the device toggle icon
3. Test different screen sizes

## ✅ Verify It's Working

You should see:

- ✅ Settings panel with 4 tabs (Profile, Notifications, Privacy, Appearance)
- ✅ Tab navigation working (click or select from dropdown on mobile)
- ✅ Form inputs with proper styling
- ✅ Toggle switches that animate
- ✅ Save button at the bottom
- ✅ Dark mode working (if enabled)

## 🎨 Customization Quick Tips

### Change Primary Color

Find and replace `blue-` with your preferred color:
- `bg-blue-600` → `bg-purple-600`
- `text-blue-600` → `text-purple-600`
- `ring-blue-500` → `ring-purple-500`

### Adjust Container Width

In `SettingsPanel.tsx`, change:
```tsx
<div className="max-w-4xl mx-auto">
```
to:
```tsx
<div className="max-w-6xl mx-auto">
```

### Change Font Sizes

Update text classes:
- `text-sm` → `text-base`
- `text-3xl` → `text-4xl`

## 🐛 Troubleshooting

### Styles not appearing?
- Check that Tailwind CSS is properly installed
- Verify `tailwind.config.js` includes the correct content paths
- Restart your development server

### Dark mode not working?
- Ensure `darkMode: 'class'` is in `tailwind.config.js`
- Check that the `dark` class is added to `<html>` or root element

### TypeScript errors?
- Run: `npm install --save-dev @types/react @types/react-dom`
- Ensure TypeScript version >= 4.5

## 📚 Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check out [Example.tsx](./Example.tsx) for more usage examples
- Customize the components to match your design system
- Add form validation and API integration

## 🆘 Need Help?

Common patterns:

**Connecting to an API:**
```tsx
const handleSave = async () => {
  try {
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (response.ok) {
      alert('Settings saved!');
    }
  } catch (error) {
    console.error('Failed to save:', error);
  }
};
```

**Adding validation:**
```tsx
const [errors, setErrors] = useState<Record<string, string>>({});

const validate = () => {
  const newErrors: Record<string, string> = {};
  
  if (!settings.email.includes('@')) {
    newErrors.email = 'Invalid email address';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

Happy coding! 🚀
