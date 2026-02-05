import type { ImgHTMLAttributes } from 'react'

interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  fallbackText?: string
}

export const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  fallbackText,
  className = '',
  ...props 
}: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
    '2xl': 'w-32 h-32 text-4xl'
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0 ${className}`}
      role="img"
      aria-label={alt}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
          {...props}
        />
      ) : (
        <span aria-hidden="true">
          {fallbackText ? getInitials(fallbackText) : '?'}
        </span>
      )}
    </div>
  )
}
