import React, { useState, useRef, useEffect } from 'react';
import { UserDropdownProps } from './types';

const UserDropdown: React.FC<UserDropdownProps> = ({ 
  user, 
  dropdownItems = [],
  onLogout 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const defaultDropdownItems = [
    {
      id: 'profile',
      label: 'Your Profile',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      href: '/profile'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      href: '/settings'
    },
    {
      id: 'divider-1',
      label: '',
      divider: true
    },
    {
      id: 'logout',
      label: 'Sign out',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      onClick: onLogout
    }
  ];

  const items = dropdownItems.length > 0 ? dropdownItems : defaultDropdownItems;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 focus:outline-none group"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            {user.name}
          </span>
          {user.role && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {user.role}
            </span>
          )}
        </div>
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-gray-300 dark:group-hover:ring-gray-600 transition-all"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-gray-300 dark:group-hover:ring-gray-600 transition-all">
              {getInitials(user.name)}
            </div>
          )}
          <div className={`absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 transition-transform ${isOpen ? 'scale-110' : 'scale-100'}`} />
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        data-testid="user-dropdown-menu"
        className={`absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-right z-50 ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="p-3 border-b border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {user.email}
          </p>
        </div>
        <div className="py-1">
          {items.map((item) => {
            if (item.divider) {
              return (
                <div
                  key={item.id}
                  className="my-1 border-t border-gray-100 dark:border-gray-700"
                />
              );
            }

            const content = (
              <div
                data-testid={`user-menu-item-${item.id}`}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                {item.icon && (
                  <span className="text-gray-500 dark:text-gray-400">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </div>
            );

            if (item.href) {
              return (
                <a key={item.id} href={item.href}>
                  {content}
                </a>
              );
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
