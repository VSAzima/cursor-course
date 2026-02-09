import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  dueDate: string;
  priority: Priority;
  columnId: 'todo' | 'in-progress' | 'done';
}

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent opening modal when dragging
    if (isDragging || !onEdit) return;
    e.stopPropagation();
    onEdit(task);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today && task.columnId !== 'done';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow duration-200 ${
        isDragging ? 'z-50' : onEdit ? 'hover:border-blue-400 dark:hover:border-blue-500' : ''
      }`}
    >
      {/* Priority Label */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[task.priority]}`}
        >
          {priorityLabels[task.priority]}
        </span>
      </div>

      {/* Task Title */}
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Assignee and Due Date */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
            {task.assignee.charAt(0).toUpperCase()}
          </div>
          <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
            {task.assignee}
          </span>
        </div>
        <div
          className={`text-xs font-medium ${
            isOverdue(task.dueDate)
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          {isOverdue(task.dueDate) && '⚠️ '}
          {formatDate(task.dueDate)}
        </div>
      </div>
    </div>
  );
};
