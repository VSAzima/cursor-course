// Shared types for the Settings Panel components

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SettingsState {
  // Profile Settings
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  phone: string;
  timezone: string;
  language: string;
  
  // Notification Settings
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  weeklyDigest: boolean;
  productUpdates: boolean;
  securityAlerts: boolean;
  
  // Privacy Settings
  profileVisibility: string;
  showEmail: boolean;
  showPhone: boolean;
  activityStatus: boolean;
  dataCollection: boolean;
  thirdPartySharing: boolean;
  
  // Appearance Settings
  theme: string;
  fontSize: string;
  compactMode: boolean;
  animations: boolean;
}

export type SettingsKey = keyof SettingsState;
