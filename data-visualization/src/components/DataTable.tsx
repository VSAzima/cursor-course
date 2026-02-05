import { useState, useMemo, useEffect } from 'react';
import { ChevronUp, ChevronDown, Search, MoreVertical } from 'lucide-react';
import type { Filters } from '../types/dashboard';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  title: string;
  subtitle: string;
  columns: Column[];
  data: Record<string, string | number>[];
  filters?: Filters;
  itemsPerPage?: number;
}

const DataTable = ({ title, subtitle, columns, data, filters, itemsPerPage = 5 }: DataTableProps) => {
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedAndFilteredData = useMemo(() => {
    let filtered = [...data];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(row => 
        Object.values(row).some(value => 
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters from FilterPanel
    if (filters) {
      filtered = filtered.filter(row => {
        // Region filter
        if (filters.region && filters.region !== 'all') {
          const rowRegion = (row.region as string)?.toLowerCase().replace(/\s+/g, '-');
          if (rowRegion !== filters.region.toLowerCase()) return false;
        }

        // Status filter
        if (filters.status && filters.status !== 'all') {
          const rowStatus = (row.status as string)?.toLowerCase();
          if (rowStatus !== filters.status.toLowerCase()) return false;
        }

        // Category filter
        if (filters.category && filters.category !== 'all') {
          const rowCategory = (row.category as string)?.toLowerCase();
          const productName = (row.product as string)?.toLowerCase();
          if (rowCategory !== filters.category.toLowerCase() && 
              !productName.includes(filters.category.toLowerCase())) return false;
        }

        // Price range filter
        if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
          const price = (row.price as number) || (row.revenueValue as number) || 0;
          if (filters.priceMin !== undefined && typeof price === 'number' && price < filters.priceMin) return false;
          if (filters.priceMax !== undefined && typeof price === 'number' && price > filters.priceMax) return false;
        }

        return true;
      });
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      if (!sortKey) return 0;
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      return sortDirection === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [data, searchTerm, filters, sortKey, sortDirection]);

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Pagination
  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedAndFilteredData.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'inactive':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Table Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, revenue, region..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            data-testid="product-search-input"
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  data-testid={`sort-column-${column.key}`}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    <div className="flex flex-col">
                      <ChevronUp 
                        className={`w-3 h-3 ${
                          sortKey === column.key && sortDirection === 'asc'
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                      <ChevronDown 
                        className={`w-3 h-3 -mt-1 ${
                          sortKey === column.key && sortDirection === 'desc'
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </div>
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center">
                  <div data-testid="empty-results" className="flex flex-col items-center justify-center gap-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      No products found
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
              <tr 
                key={row.id}
                data-testid={`product-row-${row.id}`}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                {columns.map((column) => (
                  <td 
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm"
                  >
                    {column.key === 'status' ? (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row[column.key] as string)}`}>
                        {row[column.key]}
                      </span>
                    ) : column.key === 'product' ? (
                      <span className="font-medium text-gray-900 dark:text-white">
                        {row[column.key]}
                      </span>
                    ) : column.key === 'revenue' ? (
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {row[column.key]}
                      </span>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-300">
                        {row[column.key]}
                      </span>
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400" data-testid="pagination-info">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedAndFilteredData.length)} of{' '}
            {sortedAndFilteredData.length} results
          </div>
          <div className="flex items-center gap-2" data-testid="pagination-controls">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              data-testid="pagination-prev"
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                data-testid={`pagination-page-${page}`}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === page
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              data-testid="pagination-next"
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {totalPages <= 1 && sortedAndFilteredData.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400" data-testid="pagination-info">
            Showing {sortedAndFilteredData.length} of {data.length} results
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
