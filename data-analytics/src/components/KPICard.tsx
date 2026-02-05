import { TrendingUp, TrendingDown, DollarSign, Users, Percent, Clock } from 'lucide-react';
import type { KPIData } from '../types';

interface KPICardProps {
  data: KPIData;
}

const iconMap = {
  dollar: DollarSign,
  users: Users,
  percent: Percent,
  clock: Clock,
};

function KPICard({ data }: KPICardProps) {
  const Icon = iconMap[data.icon as keyof typeof iconMap] || DollarSign;
  const isPositive = data.trend === 'up';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 md:p-6 transition-all hover:shadow-md w-full min-w-0">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="p-2 sm:p-2.5 md:p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex-shrink-0">
          <Icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div
          className={`flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-medium ${
            isPositive
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          <TrendIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{Math.abs(data.change)}%</span>
        </div>
      </div>

      <div className="min-w-0">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 truncate">
          {data.title}
        </h3>
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 break-words">
          {data.value}
        </p>
        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
          {data.changeLabel}
        </p>
      </div>
    </div>
  );
}

export default KPICard;
