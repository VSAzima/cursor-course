import React, { useState } from 'react';
import { SettingsTabs, Tab } from './SettingsTabs';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { ToggleSwitch } from './ToggleSwitch';

// Icons (using SVG for simplicity - you can replace with your icon library)
const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const PaletteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

interface SettingsState {
  // Profile
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  phone: string;
  timezone: string;
  language: string;
  
  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  weeklyDigest: boolean;
  productUpdates: boolean;
  securityAlerts: boolean;
  
  // Privacy
  profileVisibility: string;
  showEmail: boolean;
  showPhone: boolean;
  activityStatus: boolean;
  dataCollection: boolean;
  thirdPartySharing: boolean;
  
  // Appearance
  theme: string;
  fontSize: string;
  language: string;
  compactMode: boolean;
  animations: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

export const SettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const initialSettings: SettingsState = {
    // Profile
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bio: '',
    phone: '',
    timezone: 'UTC',
    language: 'en',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyDigest: true,
    productUpdates: false,
    securityAlerts: true,
    
    // Privacy
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    activityStatus: true,
    dataCollection: true,
    thirdPartySharing: false,
    
    // Appearance
    theme: 'system',
    fontSize: 'medium',
    compactMode: false,
    animations: true,
  };

  const [settings, setSettings] = useState<SettingsState>(initialSettings);

  const tabs: Tab[] = [
    { id: 'profile', label: 'Profile', icon: <UserIcon /> },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon /> },
    { id: 'privacy', label: 'Privacy', icon: <ShieldIcon /> },
    { id: 'appearance', label: 'Appearance', icon: <PaletteIcon /> },
  ];

  const timezoneOptions = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time' },
    { value: 'America/Chicago', label: 'Central Time' },
    { value: 'America/Denver', label: 'Mountain Time' },
    { value: 'America/Los_Angeles', label: 'Pacific Time' },
    { value: 'Europe/London', label: 'London' },
    { value: 'Europe/Paris', label: 'Paris' },
    { value: 'Asia/Tokyo', label: 'Tokyo' },
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'ja', label: '日本語' },
  ];

  const visibilityOptions = [
    { value: 'public', label: 'Public' },
    { value: 'friends', label: 'Friends Only' },
    { value: 'private', label: 'Private' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[key]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Validate First Name
    if (!settings.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (settings.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }

    // Validate Last Name
    if (!settings.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (settings.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!settings.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(settings.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate Phone (optional, but if provided must be valid)
    if (settings.phone.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(settings.phone) || settings.phone.replace(/\D/g, '').length < 10) {
        errors.phone = 'Please enter a valid phone number (at least 10 digits)';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCancel = () => {
    // Reset to initial values
    setSettings(initialSettings);
    setValidationErrors({});
    setSaveMessage('');
  };

  const handleSave = async () => {
    // Validate form before saving
    if (!validateForm()) {
      setSaveMessage('Please fix the errors before saving');
      // Switch to profile tab if there are validation errors there
      if (validationErrors.firstName || validationErrors.lastName || validationErrors.email || validationErrors.phone) {
        setActiveTab('profile');
      }
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSaveMessage('Settings saved successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save settings. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                id="firstName"
                label="First Name"
                value={settings.firstName}
                onChange={(value) => updateSetting('firstName', value)}
                required
                autoComplete="given-name"
                placeholder="Enter your first name"
                error={validationErrors.firstName}
              />
              <FormInput
                id="lastName"
                label="Last Name"
                value={settings.lastName}
                onChange={(value) => updateSetting('lastName', value)}
                required
                autoComplete="family-name"
                placeholder="Enter your last name"
                error={validationErrors.lastName}
              />
            </div>

            <FormInput
              id="email"
              label="Email Address"
              type="email"
              value={settings.email}
              onChange={(value) => updateSetting('email', value)}
              required
              autoComplete="email"
              placeholder="example@domain.com"
              helperText="We'll never share your email with anyone else."
              error={validationErrors.email}
            />

            <FormInput
              id="phone"
              label="Phone Number"
              type="tel"
              value={settings.phone}
              onChange={(value) => updateSetting('phone', value)}
              autoComplete="tel"
              placeholder="+1 (555) 000-0000"
              helperText="Optional - Enter your phone number with country code"
              error={validationErrors.phone}
            />

            <div className="space-y-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                value={settings.bio}
                onChange={(e) => updateSetting('bio', e.target.value)}
                placeholder="Tell us about yourself..."
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100
                           placeholder:text-gray-400 dark:placeholder:text-gray-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                id="timezone"
                label="Timezone"
                value={settings.timezone}
                onChange={(value) => updateSetting('timezone', value)}
                options={timezoneOptions}
              />
              <FormSelect
                id="language"
                label="Language"
                value={settings.language}
                onChange={(value) => updateSetting('language', value)}
                options={languageOptions}
              />
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-1 divide-y divide-gray-200 dark:divide-gray-700">
            <ToggleSwitch
              id="emailNotifications"
              label="Email Notifications"
              description="Receive notifications via email"
              checked={settings.emailNotifications}
              onChange={(value) => updateSetting('emailNotifications', value)}
            />
            <ToggleSwitch
              id="pushNotifications"
              label="Push Notifications"
              description="Receive push notifications on your device"
              checked={settings.pushNotifications}
              onChange={(value) => updateSetting('pushNotifications', value)}
            />
            <ToggleSwitch
              id="smsNotifications"
              label="SMS Notifications"
              description="Receive notifications via text message"
              checked={settings.smsNotifications}
              onChange={(value) => updateSetting('smsNotifications', value)}
            />
            <ToggleSwitch
              id="weeklyDigest"
              label="Weekly Digest"
              description="Get a weekly summary of your activity"
              checked={settings.weeklyDigest}
              onChange={(value) => updateSetting('weeklyDigest', value)}
            />
            <ToggleSwitch
              id="productUpdates"
              label="Product Updates"
              description="Receive updates about new features and improvements"
              checked={settings.productUpdates}
              onChange={(value) => updateSetting('productUpdates', value)}
            />
            <ToggleSwitch
              id="securityAlerts"
              label="Security Alerts"
              description="Get notified about security-related events"
              checked={settings.securityAlerts}
              onChange={(value) => updateSetting('securityAlerts', value)}
            />
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <FormSelect
              id="profileVisibility"
              label="Profile Visibility"
              value={settings.profileVisibility}
              onChange={(value) => updateSetting('profileVisibility', value)}
              options={visibilityOptions}
              helperText="Control who can see your profile information"
            />

            <div className="space-y-1 divide-y divide-gray-200 dark:divide-gray-700 pt-4">
              <ToggleSwitch
                id="showEmail"
                label="Show Email on Profile"
                description="Allow others to see your email address"
                checked={settings.showEmail}
                onChange={(value) => updateSetting('showEmail', value)}
              />
              <ToggleSwitch
                id="showPhone"
                label="Show Phone on Profile"
                description="Allow others to see your phone number"
                checked={settings.showPhone}
                onChange={(value) => updateSetting('showPhone', value)}
              />
              <ToggleSwitch
                id="activityStatus"
                label="Activity Status"
                description="Show when you're active"
                checked={settings.activityStatus}
                onChange={(value) => updateSetting('activityStatus', value)}
              />
              <ToggleSwitch
                id="dataCollection"
                label="Data Collection"
                description="Allow us to collect anonymous usage data"
                checked={settings.dataCollection}
                onChange={(value) => updateSetting('dataCollection', value)}
              />
              <ToggleSwitch
                id="thirdPartySharing"
                label="Third-party Sharing"
                description="Share data with trusted partners"
                checked={settings.thirdPartySharing}
                onChange={(value) => updateSetting('thirdPartySharing', value)}
              />
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <FormSelect
              id="theme"
              label="Theme"
              value={settings.theme}
              onChange={(value) => updateSetting('theme', value)}
              options={themeOptions}
              helperText="Choose your preferred color scheme"
            />

            <FormSelect
              id="fontSize"
              label="Font Size"
              value={settings.fontSize}
              onChange={(value) => updateSetting('fontSize', value)}
              options={fontSizeOptions}
              helperText="Adjust text size for better readability"
            />

            <div className="space-y-1 divide-y divide-gray-200 dark:divide-gray-700 pt-4">
              <ToggleSwitch
                id="compactMode"
                label="Compact Mode"
                description="Display more content by reducing spacing"
                checked={settings.compactMode}
                onChange={(value) => updateSetting('compactMode', value)}
              />
              <ToggleSwitch
                id="animations"
                label="Enable Animations"
                description="Show smooth transitions and animations"
                checked={settings.animations}
                onChange={(value) => updateSetting('animations', value)}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Main Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {/* Tabs */}
          <div className="px-4 sm:px-6">
            <SettingsTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 py-6">
            {renderTabContent()}
          </div>

          {/* Footer with Save Button */}
          <div className="px-4 sm:px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1">
                {saveMessage && (
                  <p
                    className={`text-sm ${
                      saveMessage.includes('success')
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {saveMessage}
                  </p>
                )}
                {Object.keys(validationErrors).length > 0 && (
                  <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                    {Object.keys(validationErrors).length} validation error(s) - please check the form
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                             bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                             rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                             dark:focus:ring-offset-gray-800
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-medium text-white 
                             bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                             rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 
                             focus:ring-blue-500 dark:focus:ring-offset-gray-800
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-200"
                >
                  {isSaving ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
