import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar, Header } from '../components/layout'
import { StatCard, TaskCard } from '../components/dashboard'
import type { SidebarItem } from '../components/layout'

export const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const navigate = useNavigate()

  const sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'tasks',
      label: 'My Tasks',
      href: '#',
      badge: 12,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 'projects',
      label: 'Projects',
      href: '#',
      badge: 5,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
    },
    {
      id: 'calendar',
      label: 'Calendar',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'team',
      label: 'Team',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      href: '/settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  const tasks = [
    {
      id: 1,
      title: 'Design new landing page',
      description: 'Create mockups for the new product landing page with modern design principles',
      priority: 'high' as const,
      status: 'in-progress' as const,
      assignee: { name: 'Sarah Wilson' },
      dueDate: 'Today',
      tags: ['Design', 'UI/UX'],
    },
    {
      id: 2,
      title: 'API integration for payments',
      description: 'Integrate Stripe payment gateway and handle webhooks for subscription management',
      priority: 'high' as const,
      status: 'in-progress' as const,
      assignee: { name: 'Mike Johnson' },
      dueDate: 'Tomorrow',
      tags: ['Backend', 'API'],
    },
    {
      id: 3,
      title: 'Update documentation',
      description: 'Update API documentation with new endpoints and add more code examples',
      priority: 'medium' as const,
      status: 'todo' as const,
      assignee: { name: 'Emma Davis' },
      dueDate: 'Dec 28',
      tags: ['Documentation'],
    },
    {
      id: 4,
      title: 'Performance optimization',
      description: 'Optimize database queries and implement caching layer for better performance',
      priority: 'medium' as const,
      status: 'review' as const,
      assignee: { name: 'Alex Chen' },
      dueDate: 'Dec 30',
      tags: ['Performance', 'Backend'],
    },
    {
      id: 5,
      title: 'User testing session',
      description: 'Conduct user testing for the new onboarding flow and collect feedback',
      priority: 'low' as const,
      status: 'completed' as const,
      assignee: { name: 'Lisa Brown' },
      dueDate: 'Dec 20',
      tags: ['Research', 'UX'],
    },
    {
      id: 6,
      title: 'Mobile app bug fixes',
      description: 'Fix reported bugs in the iOS app including crash on launch and login issues',
      priority: 'high' as const,
      status: 'todo' as const,
      assignee: { name: 'Tom Anderson' },
      dueDate: 'Dec 26',
      tags: ['Mobile', 'Bug'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        onItemClick={(id) => {
          const item = sidebarItems.find((item) => item.id === id)
          if (item?.href) {
            navigate(item.href)
          }
        }}
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Header */}
      <Header
        isSidebarCollapsed={isSidebarCollapsed}
        onMenuToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <main
        className={`
          pt-16 min-h-screen transition-all duration-300
          ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
        `}
      >
        <div className="p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's what's happening with your projects today
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Tasks"
              value="124"
              color="blue"
              change={{ value: 12, trend: 'up' }}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              }
            />
            <StatCard
              title="In Progress"
              value="32"
              color="orange"
              change={{ value: 8, trend: 'up' }}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
            <StatCard
              title="Completed"
              value="86"
              color="green"
              change={{ value: 15, trend: 'up' }}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <StatCard
              title="Team Members"
              value="18"
              color="purple"
              change={{ value: 2, trend: 'down' }}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
            />
          </div>

          {/* Tasks Section */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Tasks</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage your tasks and projects</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Filter */}
              <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Tasks</option>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              
              {/* Add Task Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">New Task</span>
              </button>
            </div>
          </div>

          {/* Task Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                status={task.status}
                assignee={task.assignee}
                dueDate={task.dueDate}
                tags={task.tags}
                onEdit={() => console.log('Edit task', task.id)}
                onDelete={() => console.log('Delete task', task.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
