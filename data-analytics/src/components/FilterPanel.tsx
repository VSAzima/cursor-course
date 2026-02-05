import { Filter } from 'lucide-react';
import type { FilterOption } from '../types';

interface FilterPanelProps {
  categoryOptions: FilterOption[];
  statusOptions: FilterOption[];
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

function FilterPanel({
  categoryOptions,
  statusOptions,
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
}: FilterPanelProps) {
  const hasActiveFilters = selectedCategory !== 'all' || selectedStatus !== 'all';

  return (
    <div className="p-6 h-full overflow-y-auto scrollbar-thin">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filters
          </h2>
        </div>
        {hasActiveFilters && (
          <span className="px-2 py-1 text-xs font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
            Active
          </span>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Category
        </label>
        <div className="space-y-2">
          {categoryOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                value={option.value}
                checked={selectedCategory === option.value}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-4 h-4 text-primary-600 focus:ring-2 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Status
        </label>
        <div className="space-y-2">
          {statusOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="status"
                value={option.value}
                checked={selectedStatus === option.value}
                onChange={(e) => onStatusChange(e.target.value)}
                className="w-4 h-4 text-primary-600 focus:ring-2 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => {
          onCategoryChange('all');
          onStatusChange('all');
        }}
        className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
}

export default FilterPanel;
