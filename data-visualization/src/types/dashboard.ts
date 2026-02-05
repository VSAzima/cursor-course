import { LucideIcon } from 'lucide-react';

export interface StatData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'green' | 'blue' | 'purple' | 'orange';
}

export interface TaskData {
  id: number;
  product: string;
  revenue: string;
  revenueValue?: number; // Numeric value for filtering
  orders: number;
  status: 'Active' | 'Inactive' | 'Pending';
  priority: 'High' | 'Medium' | 'Low';
  region: string;
  category?: string;
  price?: number; // Price for filtering
}

export interface TableColumn {
  key: string;
  label: string;
}

export interface Filters {
  region: string;
  status: string;
  category: string;
  priceMin?: number;
  priceMax?: number;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface DashboardProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export type ColorVariant = 'green' | 'blue' | 'purple' | 'orange';
export type TrendType = 'up' | 'down';
export type ChartType = 'line' | 'bar' | 'pie' | 'area';
