import { useState, useMemo, useEffect } from 'react';
import { Moon, Sun, Download, RefreshCw, Menu, X } from 'lucide-react';
import KPICard from './KPICard';
import LineChartMock from './charts/LineChartMock';
import AreaChartMock from './charts/AreaChartMock';
import PieChartMock from './charts/PieChartMock';
import BarChartMock from './charts/BarChartMock';
import DataTable from './DataTable';
import FilterPanel from './FilterPanel';
import DateRangeSelector from './DateRangeSelector';
import LoadingOverlay from './LoadingOverlay';
import KPICardSkeleton from './skeletons/KPICardSkeleton';
import ChartSkeleton from './skeletons/ChartSkeleton';
import TableSkeleton from './skeletons/TableSkeleton';
import type { KPIData, DateRange, FilterOption } from '../types';

interface DashboardProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const categoryOptions: FilterOption[] = [
  { id: 'all', label: 'All Categories', value: 'all' },
  { id: 'sales', label: 'Sales', value: 'sales' },
  { id: 'marketing', label: 'Marketing', value: 'marketing' },
  { id: 'product', label: 'Product', value: 'product' },
];

const statusOptions: FilterOption[] = [
  { id: 'all', label: 'All Status', value: 'all' },
  { id: 'active', label: 'Active', value: 'active' },
  { id: 'pending', label: 'Pending', value: 'pending' },
  { id: 'completed', label: 'Completed', value: 'completed' },
];

function Dashboard({ darkMode, onToggleDarkMode }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);


  // Generate dynamic KPIs based on filtered data
  const mockKPIs: KPIData[] = useMemo(() => {
    const baseRevenue = 124592;
    const baseUsers = 8492;
    const baseConversion = 3.24;
    const baseSession = 4.52;

    // Adjust based on filters (simplified calculation)
    const filterMultiplier = 
      selectedCategory === 'all' && selectedStatus === 'all' ? 1 : 0.85;

    return [
      {
        id: '1',
        title: 'Total Revenue',
        value: `$${(baseRevenue * filterMultiplier).toLocaleString()}`,
        change: selectedCategory === 'all' ? 12.5 : 8.2,
        changeLabel: 'vs last month',
        icon: 'dollar',
        trend: 'up',
      },
      {
        id: '2',
        title: 'Active Users',
        value: Math.floor(baseUsers * filterMultiplier).toLocaleString(),
        change: selectedCategory === 'all' ? 8.2 : 5.5,
        changeLabel: 'vs last month',
        icon: 'users',
        trend: 'up',
      },
      {
        id: '3',
        title: 'Conversion Rate',
        value: `${(baseConversion * filterMultiplier).toFixed(2)}%`,
        change: selectedStatus === 'active' ? 2.1 : -2.1,
        changeLabel: 'vs last month',
        icon: 'percent',
        trend: selectedStatus === 'active' ? 'up' : 'down',
      },
      {
        id: '4',
        title: 'Avg. Session',
        value: `${Math.floor(baseSession * filterMultiplier)}m ${Math.floor((baseSession * filterMultiplier % 1) * 60)}s`,
        change: selectedCategory === 'all' ? 5.8 : 3.2,
        changeLabel: 'vs last month',
        icon: 'clock',
        trend: 'up',
      },
    ];
  }, [selectedCategory, selectedStatus]);

  const hasActiveFilters = selectedCategory !== 'all' || selectedStatus !== 'all';

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Simulate 800ms loading time

    return () => clearTimeout(timer);
  }, [selectedCategory, selectedStatus, dateRange]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    console.log('Exporting data...');
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* Loading Overlay for refresh */}
      {isRefreshing && <LoadingOverlay isLoading={isRefreshing} message="Refreshing data..." />}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                data-testid="sidebar-toggle"
                className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
              >
                {sidebarOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white truncate">
                Analytics Dashboard
              </h1>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                data-testid="refresh-button"
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
                title="Refresh data"
              >
                <RefreshCw
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${isRefreshing ? 'animate-spin' : ''}`}
                />
              </button>
              <button
                onClick={handleExport}
                data-testid="export-button"
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Export data"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={onToggleDarkMode}
                data-testid="dark-mode-toggle"
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Filters */}
        <aside
          data-testid="sidebar"
          className={`
            fixed lg:sticky top-14 sm:top-16 left-0 z-30 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)]
            w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <FilterPanel
            categoryOptions={categoryOptions}
            statusOptions={statusOptions}
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onCategoryChange={handleCategoryChange}
            onStatusChange={handleStatusChange}
          />
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden max-w-[1920px] mx-auto w-full">
          {/* Date Range Selector */}
          <div className="mb-4 sm:mb-6">
            <DateRangeSelector
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              isLoading={isLoading}
            />
          </div>

          {/* Active Filters Indicator */}
          {hasActiveFilters && (
            <div className="mb-4 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div
                data-testid="active-filters"
                className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-blue-700 dark:text-blue-300"
              >
                <span className="font-medium">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 rounded text-xs sm:text-sm">
                    {categoryOptions.find((opt) => opt.value === selectedCategory)?.label}
                  </span>
                )}
                {selectedStatus !== 'all' && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 rounded text-xs sm:text-sm">
                    {statusOptions.find((opt) => opt.value === selectedStatus)?.label}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-4 lg:gap-4 mb-6 sm:mb-8">
            {isLoading || isRefreshing ? (
              <>
                <KPICardSkeleton />
                <KPICardSkeleton />
                <KPICardSkeleton />
                <KPICardSkeleton />
              </>
            ) : (
              mockKPIs.map((kpi) => <KPICard key={kpi.id} data={kpi} />)
            )}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6 mb-6 sm:mb-8">
            {isLoading || isRefreshing ? (
              <>
                <ChartSkeleton />
                <ChartSkeleton />
                <ChartSkeleton />
                <ChartSkeleton />
              </>
            ) : (
              <>
                <div className="min-w-0">
                  <LineChartMock title="Revenue Trend" />
                </div>
                <div className="min-w-0">
                  <AreaChartMock title="User Growth" />
                </div>
                <div className="min-w-0 md:col-span-1 lg:col-span-1">
                  <PieChartMock title="Traffic Sources" />
                </div>
                <div className="min-w-0 md:col-span-1 lg:col-span-1">
                  <BarChartMock title="Monthly Comparison" />
                </div>
              </>
            )}
          </div>

          {/* Data Table */}
          <div className="mb-6 sm:mb-8">
            {isLoading || isRefreshing ? (
              <TableSkeleton />
            ) : (
              <DataTable
                selectedCategory={selectedCategory}
                selectedStatus={selectedStatus}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
