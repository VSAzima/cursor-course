interface LineChartMockProps {
  title: string;
}

function LineChartMock({ title }: LineChartMockProps) {
  const dataPoints = [30, 45, 35, 50, 42, 60, 55, 65, 70, 62, 75, 80];
  const maxValue = Math.max(...dataPoints);
  const width = 100 / (dataPoints.length - 1);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 md:p-6 w-full min-w-0">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
        {title}
      </h3>
      <div className="h-64 sm:h-72 md:h-80 relative min-w-0">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 sm:bottom-8 w-6 sm:w-8 flex flex-col justify-between text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 sm:ml-10 h-full pb-6 sm:pb-8 relative min-w-0">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border-t border-gray-200 dark:border-gray-700 border-dashed"
              />
            ))}
          </div>

          {/* Line chart */}
          <svg className="w-full h-full" preserveAspectRatio="none">
            {/* Area fill */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(14, 165, 233)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(14, 165, 233)" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Area path */}
            <path
              d={`
                M 0,${100 - (dataPoints[0] / maxValue) * 100}
                ${dataPoints.map((point, i) => 
                  `L ${i * width},${100 - (point / maxValue) * 100}`
                ).join(' ')}
                L 100,100
                L 0,100
                Z
              `}
              fill="url(#lineGradient)"
            />

            {/* Line path */}
            <path
              d={`
                M 0,${100 - (dataPoints[0] / maxValue) * 100}
                ${dataPoints.map((point, i) => 
                  `L ${i * width},${100 - (point / maxValue) * 100}`
                ).join(' ')}
              `}
              fill="none"
              stroke="rgb(14, 165, 233)"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />

            {/* Data points */}
            {dataPoints.map((point, i) => (
              <circle
                key={i}
                cx={`${i * width}%`}
                cy={`${100 - (point / maxValue) * 100}%`}
                r="3"
                fill="white"
                stroke="rgb(14, 165, 233)"
                strokeWidth="2"
                className="dark:fill-gray-800"
              />
            ))}
          </svg>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 pt-1 sm:pt-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
              <span 
                key={month} 
                className={`${index % 2 === 0 ? 'block' : 'hidden'} sm:block`}
              >
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LineChartMock;
