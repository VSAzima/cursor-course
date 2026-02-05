interface BarChartMockProps {
  title: string;
}

function BarChartMock({ title }: BarChartMockProps) {
  const data = [
    { month: 'Jan', current: 45, previous: 38 },
    { month: 'Feb', current: 52, previous: 42 },
    { month: 'Mar', current: 48, previous: 45 },
    { month: 'Apr', current: 65, previous: 55 },
    { month: 'May', current: 58, previous: 50 },
    { month: 'Jun', current: 70, previous: 62 },
    { month: 'Jul', current: 75, previous: 68 },
    { month: 'Aug', current: 72, previous: 65 },
    { month: 'Sep', current: 80, previous: 72 },
    { month: 'Oct', current: 85, previous: 78 },
    { month: 'Nov', current: 82, previous: 75 },
    { month: 'Dec', current: 90, previous: 82 },
  ];

  const maxValue = Math.max(...data.flatMap(d => [d.current, d.previous]));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 md:p-6 w-full min-w-0">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
        {title}
      </h3>
      <div className="h-64 sm:h-72 md:h-80 relative min-w-0">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-12 sm:bottom-16 w-6 sm:w-8 flex flex-col justify-between text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 sm:ml-10 h-full pb-12 sm:pb-16 relative min-w-0 overflow-x-auto">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between mb-8">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border-t border-gray-200 dark:border-gray-700 border-dashed"
              />
            ))}
          </div>

          {/* Bars */}
          <div className="h-full flex items-end justify-between gap-0.5 sm:gap-1 relative z-10 pb-8 min-w-[600px] sm:min-w-0">
            {data.map((item, index) => (
              <div key={index} className="flex-1 flex gap-0.5 items-end min-w-0">
                {/* Current year bar */}
                <div className="flex-1 relative group min-w-0">
                  <div
                    className="bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer w-full"
                    style={{ height: `${(item.current / maxValue) * 100}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap z-20">
                      {item.current}
                    </div>
                  </div>
                </div>
                {/* Previous year bar */}
                <div className="flex-1 relative group min-w-0">
                  <div
                    className="bg-gray-400 dark:bg-gray-600 rounded-t hover:bg-gray-500 dark:hover:bg-gray-500 transition-colors cursor-pointer w-full"
                    style={{ height: `${(item.previous / maxValue) * 100}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap z-20">
                      {item.previous}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 min-w-[600px] sm:min-w-0">
            {data.map((item, index) => (
              <span 
                key={item.month} 
                className={`flex-1 text-center ${index % 2 === 0 ? 'block' : 'hidden'} sm:block`}
              >
                {item.month}
              </span>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-4 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Current Year</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-400 dark:bg-gray-600 rounded flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Previous Year</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarChartMock;
