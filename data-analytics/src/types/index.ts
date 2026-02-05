export interface KPIData {
  id: string;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface TableData {
  id: string;
  name: string;
  category: string;
  value: number;
  status: 'active' | 'pending' | 'completed';
  date: string;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface ChartConfig {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  height: string;
}
