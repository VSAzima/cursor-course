import React, { useState, useEffect } from 'react';
import { NavbarProps } from './types';
import MobileMenu from './MobileMenu';
import UserDropdown from './UserDropdown';
import ScrollToTop from './ScrollToTop';
import { handleAnchorClick, enableGlobalSmoothScroll } from './utils';
import { useActiveSection, extractSectionIds } from './useActiveSection';

const Navbar: React.FC<NavbarProps> = ({
  logo,
  logoText = 'Brand',
  navItems,
  user,
  onSearch,
  searchPlaceholder = 'Search for products, articles, or help...',
  onLogout,
  smoothScroll = true,
  showScrollToTop = true,
  scrollOffset = 80,
  className = ''
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Track active section for link highlighting
  const sectionIds = extractSectionIds(navItems);
  const activeSection = useActiveSection(sectionIds, scrollOffset);

  // Enable smooth scroll globally
  useEffect(() => {
    if (smoothScroll) {
      enableGlobalSmoothScroll();
    }
  }, [smoothScroll]);

  // Handle scroll for sticky navbar with shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  // Handle navigation link clicks with smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (smoothScroll && handleAnchorClick(href, scrollOffset)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
            : 'bg-white dark:bg-gray-900'
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-8">
              <a 
                href="/" 
                className="flex items-center space-x-3 group"
              >
                {logo ? (
                  <div className="transition-transform duration-200 group-hover:scale-110">
                    {logo}
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-md">
                    <span className="text-white font-bold text-xl">
                      {logoText.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                  {logoText}
                </span>
              </a>

              {/* Desktop Navigation */}
              <ul data-testid="desktop-nav" className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = item.href.startsWith('#') && 
                                   item.href.substring(1) === activeSection;
                  
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                          isActive
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                      >
                        {item.icon && (
                          <span className="w-4 h-4">{item.icon}</span>
                        )}
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right Section: Search + User/Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <form 
                onSubmit={handleSearchSubmit}
                data-testid="search-form"
                className={`hidden md:flex items-center transition-all duration-300 ${
                  isSearchFocused ? 'w-72' : 'w-64'
                }`}
              >
                <div className="relative w-full">
                  <input
                    data-testid="search-input"
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-2 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 focus:outline-none ${
                      isSearchFocused
                        ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20'
                        : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </form>

              {/* Mobile Search Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* User Dropdown (Desktop) */}
              {user && (
                <div className="hidden lg:block">
                  <UserDropdown user={user} onLogout={onLogout} />
                </div>
              )}

              {/* Notifications Button */}
              <button
                className="hidden md:block relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Notifications"
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
                    isMobileMenuOpen ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar indicator (subtle scroll indicator) */}
        <div 
          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
          }}
        />
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        user={user}
        smoothScroll={smoothScroll}
        scrollOffset={scrollOffset}
        activeSection={activeSection}
      />

      {/* Scroll to Top Button */}
      {showScrollToTop && <ScrollToTop />}

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
