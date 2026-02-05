import { ReactNode } from 'react'

export interface SettingsPanelProps {
  children: ReactNode
  title?: string
  description?: string
  footer?: ReactNode
}

export const SettingsPanel = ({
  children,
  title,
  description,
  footer,
}: SettingsPanelProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {(title || description) && (
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="px-6 py-6">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  )
}

export interface SettingsSectionProps {
  title?: string
  description?: string
  children: ReactNode
}

export const SettingsSection = ({
  title,
  description,
  children,
}: SettingsSectionProps) => {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div>
          {title && (
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              {title}
            </h4>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}
