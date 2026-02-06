import React, { useState, useMemo, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type {
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { BoardColumn } from './BoardColumn';
import type { ColumnId } from './BoardColumn';
import type { Task, Priority } from './TaskCard';
import { TaskModal } from './AddTaskModal';
import { UserManagement } from './UserManagement';
import type { User } from './UserManagement';

const STORAGE_KEY = 'kanban-board-tasks';
const USERS_STORAGE_KEY = 'kanban-board-users';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create wireframes and mockups for the new landing page design',
    assignee: 'Alice',
    dueDate: '2026-02-10',
    priority: 'high',
    columnId: 'todo',
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Add login and registration functionality',
    assignee: 'Bob',
    dueDate: '2026-02-08',
    priority: 'urgent',
    columnId: 'in-progress',
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all REST API endpoints',
    assignee: 'Charlie',
    dueDate: '2026-02-05',
    priority: 'medium',
    columnId: 'done',
  },
  {
    id: '4',
    title: 'Fix mobile responsive issues',
    description: 'Address layout problems on mobile devices',
    assignee: 'Diana',
    dueDate: '2026-02-12',
    priority: 'high',
    columnId: 'todo',
  },
  {
    id: '5',
    title: 'Code review: Payment module',
    description: 'Review the payment integration code',
    assignee: 'Eve',
    dueDate: '2026-02-07',
    priority: 'medium',
    columnId: 'in-progress',
  },
];

// Utility functions for localStorage
const loadTasksFromStorage = (): Task[] => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return initialTasks;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return initialTasks;
    }

    const parsed = JSON.parse(stored);
    
    // Validate that parsed data is an array
    if (!Array.isArray(parsed)) {
      console.warn('Invalid data format in localStorage, using initial tasks');
      return initialTasks;
    }

    // Validate task structure
    const validTasks = parsed.filter((task: any) => {
      return (
        task &&
        typeof task.id === 'string' &&
        typeof task.title === 'string' &&
        typeof task.assignee === 'string' &&
        typeof task.dueDate === 'string' &&
        typeof task.priority === 'string' &&
        typeof task.columnId === 'string' &&
        ['low', 'medium', 'high', 'urgent'].includes(task.priority) &&
        ['todo', 'in-progress', 'done'].includes(task.columnId)
      );
    });

    return validTasks.length > 0 ? validTasks : initialTasks;
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return initialTasks;
  }
};

const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
    // Handle quota exceeded error gracefully
    if (error instanceof DOMException && error.code === 22) {
      console.warn('localStorage quota exceeded, unable to save tasks');
    }
  }
};

// Initial default users
const initialUsers: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com' },
  { id: '4', name: 'Diana', email: 'diana@example.com' },
  { id: '5', name: 'Eve', email: 'eve@example.com' },
];

const loadUsersFromStorage = (): User[] => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return initialUsers;
    }

    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (!stored) {
      return initialUsers;
    }

    const parsed = JSON.parse(stored);
    
    if (!Array.isArray(parsed)) {
      console.warn('Invalid users data format in localStorage, using initial users');
      return initialUsers;
    }

    const validUsers = parsed.filter((user: any) => {
      return (
        user &&
        typeof user.id === 'string' &&
        typeof user.name === 'string'
      );
    });

    return validUsers.length > 0 ? validUsers : initialUsers;
  } catch (error) {
    console.error('Error loading users from localStorage:', error);
    return initialUsers;
  }
};

const saveUsersToStorage = (users: User[]): void => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
    if (error instanceof DOMException && error.code === 22) {
      console.warn('localStorage quota exceeded, unable to save users');
    }
  }
};

export const KanbanBoard: React.FC = () => {
  // Load tasks from localStorage on mount, fallback to initialTasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      return loadTasksFromStorage();
    } catch (error) {
      console.error('Error initializing tasks:', error);
      return initialTasks;
    }
  });
  // Load users from localStorage on mount, fallback to initialUsers
  const [users, setUsers] = useState<User[]>(() => {
    try {
      return loadUsersFromStorage();
    } catch (error) {
      console.error('Error initializing users:', error);
      return initialUsers;
    }
  });
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // Save users to localStorage whenever they change
  useEffect(() => {
    saveUsersToStorage(users);
  }, [users]);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px of movement before drag starts
      },
    })
  );

  const columns: { id: ColumnId; title: string }[] = [
    { id: 'todo', title: 'Todo' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ];

  // Get assignees for filter dropdown (from users list)
  const assignees = useMemo(() => {
    return users.map((user) => user.name).sort();
  }, [users]);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchQuery.toLowerCase());

      // Priority filter
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;

      // Assignee filter
      const matchesAssignee = filterAssignee === 'all' || task.assignee === filterAssignee;

      return matchesSearch && matchesPriority && matchesAssignee;
    });
  }, [tasks, searchQuery, filterPriority, filterAssignee]);

  const getTasksByColumn = (columnId: ColumnId): Task[] => {
    return filteredTasks.filter((task) => task.columnId === columnId);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id as string;
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id as string;
    const targetColumnId = over.id as ColumnId;

    // Only update if dropped on a valid column
    if (targetColumnId && ['todo', 'in-progress', 'done'].includes(targetColumnId)) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, columnId: targetColumnId as ColumnId }
            : task
        )
      );
    }

    setActiveTask(null);
  };

  const handleAddTask = (taskData: {
    title: string;
    description: string;
    assignee: string;
    dueDate: string;
    priority: Priority;
  }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      assignee: taskData.assignee,
      dueDate: taskData.dueDate,
      priority: taskData.priority,
      columnId: 'todo',
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsModalOpen(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleUpdateTask = (taskData: {
    title: string;
    description: string;
    assignee: string;
    dueDate: string;
    priority: Priority;
  }) => {
    if (!editingTask) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: taskData.title,
              description: taskData.description,
              assignee: taskData.assignee,
              dueDate: taskData.dueDate,
              priority: taskData.priority,
            }
          : task
      )
    );

    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleAddUser = (name: string, email?: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleRemoveUser = (userId: string) => {
    // Check if user is assigned to any tasks
    const assignedTasks = tasks.filter((task) => {
      const user = users.find((u) => u.id === userId);
      return user && task.assignee === user.name;
    });

    if (assignedTasks.length > 0) {
      const user = users.find((u) => u.id === userId);
      if (
        !window.confirm(
          `Cannot remove ${user?.name}. They are assigned to ${assignedTasks.length} task(s). Please reassign those tasks first.`
        )
      ) {
        return;
      }
    }

    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Kanban Board
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Drag and drop tasks between columns
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsUserManagementOpen(true)}
                className="px-4 py-2 bg-gray-600 dark:bg-gray-500 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium shadow-sm"
                title="Manage team members"
              >
                👥 Team
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium shadow-sm"
              >
                + Add Task
              </button>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="flex flex-wrap gap-4 items-end bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Search Input */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Priority Filter */}
            <div className="min-w-[150px]">
              <label
                htmlFor="priority-filter"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Priority
              </label>
              <select
                id="priority-filter"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as Priority | 'all')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Assignee Filter */}
            <div className="min-w-[150px]">
              <label
                htmlFor="assignee-filter"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Assignee
              </label>
              <select
                id="assignee-filter"
                value={filterAssignee}
                onChange={(e) => setFilterAssignee(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="all">All Assignees</option>
                {assignees.map((assignee) => (
                  <option key={assignee} value={assignee}>
                    {assignee}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            {(searchQuery !== '' || filterPriority !== 'all' || filterAssignee !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterPriority('all');
                  setFilterAssignee('all');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Board Columns */}
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
              <BoardColumn
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={getTasksByColumn(column.id)}
                onTaskEdit={handleEditTask}
              />
            ))}
          </div>
          <DragOverlay>
            {activeTask ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 mb-3 opacity-90 rotate-2">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      activeTask.priority === 'low'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : activeTask.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : activeTask.priority === 'high'
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {activeTask.priority === 'low'
                      ? 'Low'
                      : activeTask.priority === 'medium'
                      ? 'Medium'
                      : activeTask.priority === 'high'
                      ? 'High'
                      : 'Urgent'}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {activeTask.title}
                </h3>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Task Modal (Add/Edit) */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          task={editingTask}
          users={users}
        />

        {/* User Management Modal */}
        <UserManagement
          isOpen={isUserManagementOpen}
          onClose={() => setIsUserManagementOpen(false)}
          users={users}
          onAddUser={handleAddUser}
          onRemoveUser={handleRemoveUser}
        />
      </div>
    </div>
  );
};
