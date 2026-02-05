import React from 'react';
import { SettingsPanel } from './SettingsPanel';

/**
 * Example implementation of the Settings Panel
 * 
 * To use this component in your app:
 * 
 * 1. Make sure you have Tailwind CSS configured with dark mode support
 * 2. Import the SettingsPanel component
 * 3. Add it to your app
 * 
 * Dark mode can be toggled by adding/removing the 'dark' class to your root element:
 * document.documentElement.classList.toggle('dark')
 */
export const Example: React.FC = () => {
  return (
    <div className="min-h-screen">
      <SettingsPanel />
    </div>
  );
};

/**
 * Example of using individual components separately
 */
export const IndividualComponentsExample: React.FC = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [email, setEmail] = React.useState('user@example.com');
  const [theme, setTheme] = React.useState('light');

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Individual Components Demo
        </h2>

        {/* Using FormInput */}
        <div>
          <FormInput
            id="demo-email"
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            helperText="Enter your email address"
          />
        </div>

        {/* Using FormSelect */}
        <div>
          <FormSelect
            id="demo-theme"
            label="Select Theme"
            value={theme}
            onChange={setTheme}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' },
            ]}
          />
        </div>

        {/* Using ToggleSwitch */}
        <div>
          <ToggleSwitch
            id="demo-notifications"
            label="Enable Notifications"
            description="Receive email notifications about updates"
            checked={notifications}
            onChange={setNotifications}
          />
        </div>

        <button
          type="button"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors duration-200 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

// Import the individual components for the example
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { ToggleSwitch } from './ToggleSwitch';

export default Example;
