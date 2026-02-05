import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart,
  Filter,
  Calendar
} from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';
import StatWidget from './StatWidget';
import TaskCard from './TaskCard';
import ChartPlaceholder from '../ChartPlaceholder';
import DataTable from '../DataTable';
import FilterPanel from '../FilterPanel';
import DateRangeSelector from '../DateRangeSelector';
import type { DashboardProps, StatData, TaskData, Filters, DateRange } from '../../types/dashboard';

const Dashboard = ({ darkMode, setDarkMode }: DashboardProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({ start: '2024-01-01', end: '2024-12-31' });
  const [filters, setFilters] = useState<Filters>({
    region: 'all',
    status: 'all',
    category: 'all',
    priceMin: undefined,
    priceMax: undefined
  });

  const statsData: StatData[] = [
    {
      title: 'Total Revenue',
      value: '$124,590',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: '8,549',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '-3.1%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'purple'
    },
    {
      title: 'Conversion Rate',
      value: '3.45%',
      change: '+1.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const tasksData: TaskData[] = [
    { id: 1, product: 'Premium Plan', revenue: '$45,231', revenueValue: 45231, orders: 423, status: 'Active', priority: 'High', region: 'North America', category: 'premium', price: 45231 },
    { id: 2, product: 'Basic Plan', revenue: '$32,451', revenueValue: 32451, orders: 876, status: 'Active', priority: 'Medium', region: 'Europe', category: 'basic', price: 32451 },
    { id: 3, product: 'Enterprise Plan', revenue: '$28,900', revenueValue: 28900, orders: 145, status: 'Active', priority: 'High', region: 'Asia', category: 'enterprise', price: 28900 },
    { id: 4, product: 'Starter Plan', revenue: '$18,008', revenueValue: 18008, orders: 632, status: 'Active', priority: 'Low', region: 'North America', category: 'starter', price: 18008 },
    { id: 5, product: 'Pro Plan', revenue: '$15,234', revenueValue: 15234, orders: 298, status: 'Inactive', priority: 'Medium', region: 'Europe', category: 'premium', price: 15234 },
    { id: 6, product: 'Business Plan', revenue: '$52,100', revenueValue: 52100, orders: 210, status: 'Active', priority: 'High', region: 'North America', category: 'enterprise', price: 52100 },
    { id: 7, product: 'Free Plan', revenue: '$0', revenueValue: 0, orders: 1543, status: 'Active', priority: 'Low', region: 'Europe', category: 'basic', price: 0 },
    { id: 8, product: 'Trial Plan', revenue: '$8,500', revenueValue: 8500, orders: 89, status: 'Pending', priority: 'Low', region: 'Asia', category: 'starter', price: 8500 },
  ];

  const tableColumns = [
    { key: 'product', label: 'Product' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'orders', label: 'Orders' },
    { key: 'status', label: 'Status' },
    { key: 'region', label: 'Region' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
          {/* Filters and Date Range */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                data-testid="filter-toggle-button"
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
                {Object.values(filters).filter(v => v !== 'all' && v !== undefined).length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                    {Object.values(filters).filter(v => v !== 'all' && v !== undefined).length}
                  </span>
                )}
              </button>
              
              <DateRangeSelector 
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Last updated: Just now</span>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div data-testid="filter-panel">
              <FilterPanel 
                filters={filters}
                setFilters={setFilters}
                onClose={() => setShowFilters(false)}
              />
            </div>
          )}

          {/* Stats Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <StatWidget key={index} {...stat} />
            ))}
          </div>

          {/* Task Cards */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Top Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasksData.slice(0, 3).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartPlaceholder
              title="Revenue Trends"
              subtitle="Monthly revenue over time"
              type="line"
            />
            <ChartPlaceholder
              title="Sales by Category"
              subtitle="Product category distribution"
              type="bar"
            />
            <ChartPlaceholder
              title="Traffic Sources"
              subtitle="Visitor acquisition channels"
              type="pie"
            />
            <ChartPlaceholder
              title="User Growth"
              subtitle="New vs returning users"
              type="area"
            />
          </div>

          {/* Data Table */}
          <DataTable
            title="All Products Performance"
            subtitle="Complete product performance breakdown"
            columns={tableColumns}
            data={tasksData as unknown as Record<string, string | number>[]}
            filters={filters}
            itemsPerPage={3}
          />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
