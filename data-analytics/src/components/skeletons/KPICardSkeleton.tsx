function KPICardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 md:p-6 w-full min-w-0 animate-pulse">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="p-2 sm:p-2.5 md:p-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12" />
        <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      <div className="min-w-0">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-7 sm:h-8 md:h-9 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export default KPICardSkeleton;
