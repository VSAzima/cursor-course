function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 md:p-6 w-full min-w-0 animate-pulse">
      <div className="h-5 sm:h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-3 sm:mb-4" />
      <div className="h-64 sm:h-72 md:h-80 bg-gray-100 dark:bg-gray-700/50 rounded-lg relative overflow-hidden">
        {/* Grid lines skeleton */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border-t border-gray-200 dark:border-gray-600 border-dashed"
            />
          ))}
        </div>
        {/* Chart area skeleton */}
        <div className="absolute inset-0 ml-8 sm:ml-10 flex items-end justify-between px-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-gray-300 dark:bg-gray-600 rounded-t mx-0.5"
              style={{
                height: `${Math.random() * 60 + 20}%`,
                animationDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChartSkeleton;
