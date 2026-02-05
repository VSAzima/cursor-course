import { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar, Header } from '../components/layout'
import type { SidebarItem } from '../components/layout'
import {
  Button,
  Input,
  Select,
  Textarea,
  ToggleSwitch,
  SettingsTabs,
  SettingsPanel,
  SettingsSection,
} from '../components/common'

type TabId = 'general' | 'account' | 'security' | 'notifications'

export const Settings = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>('general')
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    // General settings
    siteName: 'My Dashboard',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    
    // Account settings
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Product Manager with a passion for building great user experiences.',
    
    // Security settings
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    taskUpdates: true,
    projectUpdates: true,
    teamUpdates: false,
    weeklyDigest: true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize dark mode from system preference or localStorage
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                   (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked)
    setHasUnsavedChanges(true)
    if (checked) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (activeTab === 'account') {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required'
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email format'
      }
    }

    if (activeTab === 'security') {
      if (formData.newPassword) {
        if (!formData.currentPassword) {
          newErrors.currentPassword = 'Current password is required'
        }
        if (formData.newPassword.length < 8) {
          newErrors.newPassword = 'Password must be at least 8 characters'
        }
        if (formData.newPassword !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match'
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSaving(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSaving(false)
    setHasUnsavedChanges(false)
    
    // Show success message (you could add a toast notification here)
    console.log('Settings saved:', formData)
  }

  const handleCancel = () => {
    // Reset form or navigate away
    setHasUnsavedChanges(false)
    console.log('Changes cancelled')
  }

  const sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      href: '/settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  const tabs = [
    {
      id: 'general' as TabId,
      label: 'General',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
    {
      id: 'account' as TabId,
      label: 'Account',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: 'security' as TabId,
      label: 'Security',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      id: 'notifications' as TabId,
      label: 'Notifications',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      badge: 3,
    },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <SettingsPanel
              title="General Settings"
              description="Manage your application preferences and appearance"
            >
              <div className="space-y-6">
                <Input
                  id="siteName"
                  label="Site Name"
                  value={formData.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  placeholder="Enter site name"
                />

                <Select
                  id="language"
                  label="Language"
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                    { value: 'de', label: 'German' },
                  ]}
                />

                <Select
                  id="timezone"
                  label="Timezone"
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  options={[
                    { value: 'UTC', label: 'UTC' },
                    { value: 'America/New_York', label: 'Eastern Time' },
                    { value: 'America/Chicago', label: 'Central Time' },
                    { value: 'America/Los_Angeles', label: 'Pacific Time' },
                  ]}
                />

                <Select
                  id="dateFormat"
                  label="Date Format"
                  value={formData.dateFormat}
                  onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                  options={[
                    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                  ]}
                />
              </div>
            </SettingsPanel>

            <SettingsPanel
              title="Appearance"
              description="Customize how the application looks"
            >
              <ToggleSwitch
                id="darkMode"
                label="Dark Mode"
                description="Enable dark mode for a better viewing experience in low light"
                checked={isDarkMode}
                onChange={handleDarkModeToggle}
              />
            </SettingsPanel>
          </div>
        )

      case 'account':
        return (
          <SettingsPanel
            title="Account Information"
            description="Update your personal information and profile details"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    JPG, PNG or GIF. Max size 2MB
                  </p>
                </div>
              </div>

              <Input
                id="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                error={errors.fullName}
                required
              />

              <Input
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
              />

              <Input
                id="phone"
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />

              <Textarea
                id="bio"
                label="Bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                placeholder="Tell us about yourself..."
                helperText="Brief description for your profile. Maximum 200 characters."
              />
            </div>
          </SettingsPanel>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <SettingsPanel
              title="Change Password"
              description="Ensure your account is using a strong password"
            >
              <div className="space-y-6">
                <Input
                  id="currentPassword"
                  label="Current Password"
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  error={errors.currentPassword}
                  placeholder="Enter current password"
                />

                <Input
                  id="newPassword"
                  label="New Password"
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  error={errors.newPassword}
                  placeholder="Enter new password"
                  helperText="Password must be at least 8 characters"
                />

                <Input
                  id="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                  placeholder="Confirm new password"
                />
              </div>
            </SettingsPanel>

            <SettingsPanel
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
            >
              <ToggleSwitch
                id="twoFactor"
                label="Enable Two-Factor Authentication"
                description="Receive a code on your phone to confirm it's really you"
                checked={formData.twoFactorEnabled}
                onChange={(checked) => handleInputChange('twoFactorEnabled', checked)}
              />
            </SettingsPanel>

            <SettingsPanel
              title="Active Sessions"
              description="Manage your active sessions across devices"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">MacBook Pro</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">San Francisco, CA • Current session</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </SettingsPanel>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <SettingsPanel
              title="Notification Preferences"
              description="Choose what notifications you want to receive"
            >
              <div className="space-y-6">
                <SettingsSection
                  title="Channels"
                  description="Select how you want to receive notifications"
                >
                  <ToggleSwitch
                    id="emailNotifications"
                    label="Email Notifications"
                    description="Receive notifications via email"
                    checked={formData.emailNotifications}
                    onChange={(checked) => handleInputChange('emailNotifications', checked)}
                  />
                  
                  <ToggleSwitch
                    id="pushNotifications"
                    label="Push Notifications"
                    description="Receive push notifications in your browser"
                    checked={formData.pushNotifications}
                    onChange={(checked) => handleInputChange('pushNotifications', checked)}
                  />
                </SettingsSection>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <SettingsSection
                    title="Activity"
                    description="Choose what activities trigger notifications"
                  >
                    <ToggleSwitch
                      id="taskUpdates"
                      label="Task Updates"
                      description="Get notified when tasks are updated or completed"
                      checked={formData.taskUpdates}
                      onChange={(checked) => handleInputChange('taskUpdates', checked)}
                    />
                    
                    <ToggleSwitch
                      id="projectUpdates"
                      label="Project Updates"
                      description="Get notified about project milestones and changes"
                      checked={formData.projectUpdates}
                      onChange={(checked) => handleInputChange('projectUpdates', checked)}
                    />
                    
                    <ToggleSwitch
                      id="teamUpdates"
                      label="Team Updates"
                      description="Get notified when team members join or leave"
                      checked={formData.teamUpdates}
                      onChange={(checked) => handleInputChange('teamUpdates', checked)}
                    />
                  </SettingsSection>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <SettingsSection
                    title="Digests"
                    description="Receive periodic summaries"
                  >
                    <ToggleSwitch
                      id="weeklyDigest"
                      label="Weekly Digest"
                      description="Receive a weekly summary of your activity"
                      checked={formData.weeklyDigest}
                      onChange={(checked) => handleInputChange('weeklyDigest', checked)}
                    />
                  </SettingsSection>
                </div>
              </div>
            </SettingsPanel>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        items={sidebarItems}
        onItemClick={(id) => {
          const item = sidebarItems.find((item) => item.id === id)
          if (item?.href) {
            navigate(item.href)
          }
        }}
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <Header
        isSidebarCollapsed={isSidebarCollapsed}
        onMenuToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main
        className={`
          pt-16 min-h-screen transition-all duration-300
          ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
        `}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Settings Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Tabs - Desktop */}
            <div className="hidden lg:block">
              <SettingsTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={(id) => setActiveTab(id as TabId)}
                orientation="vertical"
              />
            </div>

            {/* Horizontal Tabs - Mobile */}
            <div className="lg:hidden">
              <SettingsTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={(id) => setActiveTab(id as TabId)}
                orientation="horizontal"
              />
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSave}>
                {renderTabContent()}

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={!hasUnsavedChanges}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSaving}
                    disabled={!hasUnsavedChanges}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
