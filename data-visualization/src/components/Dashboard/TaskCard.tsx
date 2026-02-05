import { MoreVertical, AlertCircle } from 'lucide-react';
import type { TaskData } from '../../types/dashboard';

interface TaskCardProps {
  task: TaskData;
}

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

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10';
    case 'medium':
      return 'border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10';
    case 'low':
      return 'border-l-green-500 bg-green-50/50 dark:bg-green-900/10';
    default:
      return 'border-l-gray-500 bg-gray-50/50 dark:bg-gray-900/10';
  }
};

const getPriorityBadgeColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'low':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
  }
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-lg border-l-4 
      border-r border-t border-b border-gray-200 dark:border-gray-700 
      ${getPriorityColor(task.priority)}
      p-4 hover:shadow-md transition-all duration-200
    `}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {task.product}
            </h3>
            {task.priority === 'High' && (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {task.region}
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Priority Badge */}
      <div className="mb-3">
        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getPriorityBadgeColor(task.priority)}`}>
          {task.priority} Priority
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Revenue</p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {task.revenue}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Orders</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {task.orders}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
        <button className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-medium transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
