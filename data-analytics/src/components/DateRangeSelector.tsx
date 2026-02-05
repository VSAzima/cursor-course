import { Calendar } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import type { DateRange } from '../types';

interface DateRangeSelectorProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  isLoading?: boolean;
}

function DateRangeSelector({ dateRange, onDateRangeChange, isLoading = false }: DateRangeSelectorProps) {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onDateRangeChange({ ...dateRange, start: date });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onDateRangeChange({ ...dateRange, end: date });
  };

  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const quickRanges = [
    { label: 'Today', days: 0 },
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 },
  ];

  const handleQuickRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    onDateRangeChange({ start, end });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          Date Range
        </h3>
      </div>

      <div className="flex flex-col xl:flex-row gap-3 sm:gap-4">
        {/* Date Inputs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 min-w-0">
          <div className="flex-1 min-w-0">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formatDateForInput(dateRange.start)}
                onChange={handleStartDateChange}
                disabled={isLoading}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <LoadingSpinner size="sm" />
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formatDateForInput(dateRange.end)}
                onChange={handleEndDateChange}
                disabled={isLoading}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <LoadingSpinner size="sm" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Range Buttons */}
        <div className="flex flex-wrap gap-2 items-end">
          {quickRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => handleQuickRange(range.days)}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 rounded-lg transition-colors whitespace-nowrap"
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DateRangeSelector;
