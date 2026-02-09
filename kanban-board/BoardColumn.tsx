import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { TaskCard, Task } from './TaskCard';

export type ColumnId = 'todo' | 'in-progress' | 'done';

interface BoardColumnProps {
  id: ColumnId;
  title: string;
  tasks: Task[];
  onTaskEdit?: (task: Task) => void;
}

const columnStyles = {
  todo: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20',
  'in-progress': 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/20',
  done: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20',
};

const headerStyles = {
  todo: 'text-blue-700 dark:text-blue-300',
  'in-progress': 'text-yellow-700 dark:text-yellow-300',
  done: 'text-green-700 dark:text-green-300',
};

export const BoardColumn: React.FC<BoardColumnProps> = ({ id, title, tasks, onTaskEdit }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[280px] rounded-lg border-2 ${columnStyles[id]} p-4 transition-colors ${
        isOver ? 'ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2' : ''
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-bold ${headerStyles[id]}`}>{title}</h2>
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400">
          {tasks.length}
        </span>
      </div>

      {/* Task Cards */}
      <div className="space-y-2 min-h-[200px]">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400 dark:text-gray-600 text-sm">
            {isOver ? 'Drop task here' : 'No tasks'}
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onTaskEdit} />
          ))
        )}
      </div>

      {/* Drop Zone Indicator */}
      {tasks.length === 0 && !isOver && (
        <div className="mt-4 p-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center text-xs text-gray-400 dark:text-gray-600">
          Drop tasks here
        </div>
      )}
    </div>
  );
};
