import type { HTMLAttributes } from 'react'

interface StatItemProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  label: string
  clickable?: boolean
  onStatClick?: () => void
}

export const StatItem = ({ 
  value, 
  label, 
  clickable = false,
  onStatClick,
  className = '',
  ...props 
}: StatItemProps) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const Component = clickable ? 'button' : 'div'
  
  return (
    <Component
      className={`text-center ${
        clickable 
          ? 'hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-3 -mx-3 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer' 
          : ''
      } ${className}`}
      onClick={clickable ? onStatClick : undefined}
      aria-label={clickable ? `${formatNumber(value)} ${label.toLowerCase()}` : undefined}
      {...props}
    >
      <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
        {formatNumber(value)}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {label}
      </div>
    </Component>
  )
}
