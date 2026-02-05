export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface DropdownItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  divider?: boolean;
}

export interface NavbarProps {
  logo?: React.ReactNode;
  logoText?: string;
  navItems: NavItem[];
  user?: User;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  onLogout?: () => void;
  smoothScroll?: boolean;
  showScrollToTop?: boolean;
  scrollOffset?: number;
  className?: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  user?: User;
  smoothScroll?: boolean;
  scrollOffset?: number;
  activeSection?: string;
}

export interface UserDropdownProps {
  user: User;
  dropdownItems?: DropdownItem[];
  onLogout?: () => void;
}
