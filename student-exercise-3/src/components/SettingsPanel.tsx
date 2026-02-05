import { useState } from 'react'

type TabType = 'profile' | 'notifications' | 'privacy' | 'appearance'

interface ToggleSwitchProps {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  id: string
}

const ToggleSwitch = ({ label, description, checked, onChange, id }: ToggleSwitchProps) => {
  return (
    <div className="flex items-start justify-between py-4">
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        id={id}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
          ${checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  )
}

export const SettingsPanel = () => {
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [isSaving, setIsSaving] = useState(false)
  
  // Profile state
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    bio: 'Software engineer passionate about creating great user experiences.',
    website: 'https://johndoe.com',
    location: 'San Francisco, CA',
  })

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyDigest: true,
    productUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
    newsAndUpdates: true,
  })

  // Privacy state
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public' as 'public' | 'friends' | 'private',
    searchEngineIndexing: true,
    showOnlineStatus: true,
    allowDataCollection: false,
    twoFactorAuth: true,
    sessionTimeout: '30' as '15' | '30' | '60' | 'never',
  })

  // Appearance state
  const [appearance, setAppearance] = useState({
    theme: 'light' as 'light' | 'dark' | 'system',
    language: 'en' as string,
    fontSize: 'medium' as 'small' | 'medium' | 'large',
    compactMode: false,
    animations: true,
  })

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { id: 'notifications' as const, label: 'Notifications', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    )},
    { id: 'privacy' as const, label: 'Privacy', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )},
    { id: 'appearance' as const, label: 'Appearance', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )},
  ]

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Settings saved successfully!')
  }

  const handleApplyTheme = () => {
    if (appearance.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (appearance.theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      // System theme
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
        </div>

        {/* Settings Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px overflow-x-auto" aria-label="Settings tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap
                    transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
                    ${activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }
                  `}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Update your account profile information and email address.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Tell us about yourself..."
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {profileData.bio.length}/200 characters
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Manage how you receive notifications and updates.</p>
                </div>

                <div className="space-y-1 border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Channels</h3>
                  <ToggleSwitch
                    id="emailNotifications"
                    label="Email Notifications"
                    description="Receive notifications via email"
                    checked={notifications.emailNotifications}
                    onChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                  <ToggleSwitch
                    id="pushNotifications"
                    label="Push Notifications"
                    description="Receive push notifications on your devices"
                    checked={notifications.pushNotifications}
                    onChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  />
                  <ToggleSwitch
                    id="smsNotifications"
                    label="SMS Notifications"
                    description="Receive text messages for important updates"
                    checked={notifications.smsNotifications}
                    onChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Content</h3>
                  <ToggleSwitch
                    id="weeklyDigest"
                    label="Weekly Digest"
                    description="Get a summary of your activity every week"
                    checked={notifications.weeklyDigest}
                    onChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                  />
                  <ToggleSwitch
                    id="productUpdates"
                    label="Product Updates"
                    description="News about product features and improvements"
                    checked={notifications.productUpdates}
                    onChange={(checked) => setNotifications({ ...notifications, productUpdates: checked })}
                  />
                  <ToggleSwitch
                    id="securityAlerts"
                    label="Security Alerts"
                    description="Important notifications about your account security"
                    checked={notifications.securityAlerts}
                    onChange={(checked) => setNotifications({ ...notifications, securityAlerts: checked })}
                  />
                  <ToggleSwitch
                    id="marketingEmails"
                    label="Marketing Emails"
                    description="Receive emails about promotions and offers"
                    checked={notifications.marketingEmails}
                    onChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                  />
                  <ToggleSwitch
                    id="newsAndUpdates"
                    label="News and Updates"
                    description="Latest news and company updates"
                    checked={notifications.newsAndUpdates}
                    onChange={(checked) => setNotifications({ ...notifications, newsAndUpdates: checked })}
                  />
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Privacy Settings</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Control your privacy and data settings.</p>
                </div>

                <div>
                  <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profile Visibility
                  </label>
                  <select
                    id="profileVisibility"
                    value={privacy.profileVisibility}
                    onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value as 'public' | 'friends' | 'private' })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="public">Public - Anyone can see your profile</option>
                    <option value="friends">Friends - Only friends can see your profile</option>
                    <option value="private">Private - Only you can see your profile</option>
                  </select>
                </div>

                <div className="space-y-1 pt-4">
                  <ToggleSwitch
                    id="searchEngineIndexing"
                    label="Search Engine Indexing"
                    description="Allow search engines to index your profile"
                    checked={privacy.searchEngineIndexing}
                    onChange={(checked) => setPrivacy({ ...privacy, searchEngineIndexing: checked })}
                  />
                  <ToggleSwitch
                    id="showOnlineStatus"
                    label="Show Online Status"
                    description="Let others see when you're online"
                    checked={privacy.showOnlineStatus}
                    onChange={(checked) => setPrivacy({ ...privacy, showOnlineStatus: checked })}
                  />
                  <ToggleSwitch
                    id="allowDataCollection"
                    label="Allow Data Collection"
                    description="Help improve our service by sharing usage data"
                    checked={privacy.allowDataCollection}
                    onChange={(checked) => setPrivacy({ ...privacy, allowDataCollection: checked })}
                  />
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Security</h3>
                  
                  <ToggleSwitch
                    id="twoFactorAuth"
                    label="Two-Factor Authentication"
                    description="Add an extra layer of security to your account"
                    checked={privacy.twoFactorAuth}
                    onChange={(checked) => setPrivacy({ ...privacy, twoFactorAuth: checked })}
                  />

                  <div className="mt-6">
                    <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Session Timeout
                    </label>
                    <select
                      id="sessionTimeout"
                      value={privacy.sessionTimeout}
                      onChange={(e) => setPrivacy({ ...privacy, sessionTimeout: e.target.value as '15' | '30' | '60' | 'never' })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="never">Never</option>
                    </select>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Automatically log out after period of inactivity
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appearance Settings</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Customize how the application looks and feels.</p>
                </div>

                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['light', 'dark', 'system'] as const).map((theme) => (
                      <button
                        key={theme}
                        onClick={() => {
                          setAppearance({ ...appearance, theme })
                          setTimeout(handleApplyTheme, 100)
                        }}
                        className={`
                          px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all
                          ${appearance.theme === theme
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                          }
                        `}
                      >
                        <div className="flex flex-col items-center gap-2">
                          {theme === 'light' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          )}
                          {theme === 'dark' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                          )}
                          {theme === 'system' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          )}
                          <span className="capitalize">{theme}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    id="language"
                    value={appearance.language}
                    onChange={(e) => setAppearance({ ...appearance, language: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="ja">日本語</option>
                    <option value="zh">中文</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Font Size
                  </label>
                  <select
                    id="fontSize"
                    value={appearance.fontSize}
                    onChange={(e) => setAppearance({ ...appearance, fontSize: e.target.value as 'small' | 'medium' | 'large' })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div className="space-y-1 pt-4">
                  <ToggleSwitch
                    id="compactMode"
                    label="Compact Mode"
                    description="Reduce spacing and padding for a denser layout"
                    checked={appearance.compactMode}
                    onChange={(checked) => setAppearance({ ...appearance, compactMode: checked })}
                  />
                  <ToggleSwitch
                    id="animations"
                    label="Enable Animations"
                    description="Show smooth transitions and animations"
                    checked={appearance.animations}
                    onChange={(checked) => setAppearance({ ...appearance, animations: checked })}
                  />
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Changes are saved automatically
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    // Reset to defaults
                    if (confirm('Are you sure you want to reset to default settings?')) {
                      setProfileData({
                        fullName: 'John Doe',
                        email: 'john.doe@example.com',
                        username: 'johndoe',
                        bio: '',
                        website: '',
                        location: '',
                      })
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
  )
}
