function TableSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden w-full min-w-0 animate-pulse">
      {/* Header skeleton */}
      <div className="p-4 sm:p-5 md:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-10 w-full sm:w-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              {['Name', 'Category', 'Value', 'Status', 'Date'].map((header) => (
                <th
                  key={header}
                  className="px-3 sm:px-4 md:px-6 py-2 sm:py-3"
                >
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination skeleton */}
      <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableSkeleton;
