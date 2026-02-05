interface PieChartMockProps {
  title: string;
}

function PieChartMock({ title }: PieChartMockProps) {
  const data = [
    { label: 'Direct', value: 35, color: 'rgb(59, 130, 246)' },
    { label: 'Organic', value: 28, color: 'rgb(16, 185, 129)' },
    { label: 'Social', value: 22, color: 'rgb(249, 115, 22)' },
    { label: 'Referral', value: 15, color: 'rgb(168, 85, 247)' },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;

  const createSlicePath = (percentage: number, startAngle: number) => {
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = 50 + 45 * Math.cos(startRad);
    const y1 = 50 + 45 * Math.sin(startRad);
    const x2 = 50 + 45 * Math.cos(endRad);
    const y2 = 50 + 45 * Math.sin(endRad);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    return `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 md:p-6 w-full min-w-0">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
        {title}
      </h3>
      <div className="h-64 sm:h-72 md:h-80 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
        {/* Pie chart */}
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const path = createSlicePath(percentage, currentAngle);
              currentAngle += (percentage / 100) * 360;
              
              return (
                <path
                  key={index}
                  d={path}
                  fill={item.color}
                  className="transition-all hover:opacity-80 cursor-pointer"
                  opacity={0.9}
                />
              );
            })}
            {/* Center circle for donut effect */}
            <circle
              cx="50"
              cy="50"
              r="25"
              fill="white"
              className="dark:fill-gray-800"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">100%</span>
            <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 flex-wrap sm:flex-nowrap justify-center sm:justify-start">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5 sm:gap-2">
              <div
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {item.label}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white ml-auto sm:ml-2">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PieChartMock;
