import { BarChart3, LineChart, PieChart, Activity } from 'lucide-react';

interface ChartPlaceholderProps {
  title: string;
  subtitle: string;
  type: 'line' | 'bar' | 'pie' | 'area';
}

const chartIcons = {
  line: LineChart,
  bar: BarChart3,
  pie: PieChart,
  area: Activity
};

const ChartPlaceholder = ({ title, subtitle, type }: ChartPlaceholderProps) => {
  const Icon = chartIcons[type];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {subtitle}
        </p>
      </div>
      
      {/* Chart Placeholder */}
      <div className="h-64 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center">
        <Icon className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" />
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {type.charAt(0).toUpperCase() + type.slice(1)} Chart
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Chart visualization will appear here
        </p>
        
        {/* Mock chart elements */}
        <div className="mt-6 flex items-end gap-2 h-20">
          {[40, 65, 50, 75, 55, 80, 60].map((height, i) => (
            <div
              key={i}
              className="w-6 bg-primary-400 dark:bg-primary-600 rounded-t opacity-30"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
      
      {/* Chart Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Current Period</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Previous Period</span>
            </div>
          </div>
          <button className="text-primary-600 dark:text-primary-400 hover:underline">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartPlaceholder;
