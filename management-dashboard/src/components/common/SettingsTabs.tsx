import { ReactNode } from 'react'

export interface Tab {
  id: string
  label: string
  icon?: ReactNode
  badge?: number
}

export interface SettingsTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  orientation?: 'horizontal' | 'vertical'
}

export const SettingsTabs = ({
  tabs,
  activeTab,
  onTabChange,
  orientation = 'horizontal',
}: SettingsTabsProps) => {
  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
              ${activeTab === tab.id
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }
            `}
          >
            {tab.icon && (
              <span className={activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}>
                {tab.icon}
              </span>
            )}
            <span className="flex-1">{tab.label}</span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className={`
                px-2 py-0.5 text-xs font-medium rounded-full
                ${activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }
              `}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    )
  }

  // Horizontal orientation
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
              ${activeTab === tab.id
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
          >
            {tab.icon && (
              <span className="w-5 h-5">
                {tab.icon}
              </span>
            )}
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className={`
                ml-2 px-2 py-0.5 text-xs font-medium rounded-full
                ${activeTab === tab.id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }
              `}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}
