import { Calendar } from 'lucide-react';

interface DateRangeSelectorProps {
  dateRange: {
    start: string;
    end: string;
  };
  setDateRange: (range: { start: string; end: string }) => void;
}

const DateRangeSelector = ({ dateRange, setDateRange }: DateRangeSelectorProps) => {
  const handleQuickSelect = (range: string) => {
    const end = new Date();
    let start = new Date();

    switch (range) {
      case 'today':
        start = new Date();
        break;
      case 'week':
        start.setDate(end.getDate() - 7);
        break;
      case 'month':
        start.setMonth(end.getMonth() - 1);
        break;
      case 'quarter':
        start.setMonth(end.getMonth() - 3);
        break;
      case 'year':
        start.setFullYear(end.getFullYear() - 1);
        break;
    }

    setDateRange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    });
  };

  return (
    <div className="flex items-center gap-3">
      {/* Quick Select Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuickSelect('today')}
          className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Today
        </button>
        <button
          onClick={() => handleQuickSelect('week')}
          className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Last 7 Days
        </button>
        <button
          onClick={() => handleQuickSelect('month')}
          className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Last 30 Days
        </button>
        <button
          onClick={() => handleQuickSelect('year')}
          className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Last Year
        </button>
      </div>

      {/* Custom Date Inputs */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
        <Calendar className="w-4 h-4 text-gray-400" />
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          className="bg-transparent text-sm focus:outline-none dark:text-white"
        />
        <span className="text-gray-400">—</span>
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="bg-transparent text-sm focus:outline-none dark:text-white"
        />
      </div>
    </div>
  );
};

export default DateRangeSelector;
