interface TaskCardProps {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'review' | 'completed'
  assignee?: {
    name: string
    avatar?: string
  }
  dueDate: string
  tags?: string[]
  onEdit?: () => void
  onDelete?: () => void
}

export const TaskCard = ({
  title,
  description,
  priority,
  status,
  assignee,
  dueDate,
  tags = [],
  onEdit,
  onDelete,
}: TaskCardProps) => {
  const priorityColors = {
    low: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  }

  const statusColors = {
    'todo': 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    'in-progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    'review': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    'completed': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  }

  const statusLabels = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'review': 'In Review',
    'completed': 'Completed',
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${priorityColors[priority]}`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[status]}`}>
              {statusLabels[status]}
            </span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Edit task"
          >
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            aria-label="Delete task"
          >
            <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        {/* Assignee */}
        {assignee && (
          <div className="flex items-center gap-2">
            {assignee.avatar ? (
              <img
                src={assignee.avatar}
                alt={assignee.name}
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {assignee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
            )}
            <span className="text-xs text-gray-600 dark:text-gray-400">{assignee.name}</span>
          </div>
        )}

        {/* Due Date */}
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {dueDate}
        </div>
      </div>
    </div>
  )
}
