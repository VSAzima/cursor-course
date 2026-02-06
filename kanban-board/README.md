# Kanban Board

A fully functional Kanban board application built with React, TypeScript, Tailwind CSS, and Vite.

## 🚀 Features

1. ✅ **Multiple board columns** (Todo, In Progress, Done)
2. ✅ **Task cards with metadata** (assignees, due dates, priority labels)
3. ✅ **Add/Edit task functionality** with modal forms
4. ✅ **Drag-and-drop functionality** using @dnd-kit library
5. ✅ **Filter and search capabilities** (by priority, assignee, and text search)
6. ✅ **Task assignment system** with team member management
7. ✅ **localStorage persistence** - tasks and users persist across sessions
8. ✅ **Dark mode support** - fully styled for light and dark themes

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd kanban-board
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   The app will be available at `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
kanban-board/
├── src/
│   ├── components/
│   │   ├── KanbanBoard.tsx      # Main board component
│   │   ├── BoardColumn.tsx      # Column component
│   │   ├── TaskCard.tsx         # Task card component
│   │   ├── AddTaskModal.tsx     # Task add/edit modal
│   │   └── UserManagement.tsx   # Team member management
│   ├── App.tsx                  # Root app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🎯 Usage Guide

### Adding Tasks
- Click the **"+ Add Task"** button
- Fill in the task details (title, description, assignee, due date, priority)
- Click **"Add Task"** to create

### Editing Tasks
- Click on any task card to open the edit modal
- Modify the fields and click **"Save Changes"**

### Managing Team Members
- Click the **"👥 Team"** button in the header
- Add new team members with name and optional email
- Remove team members (with validation if they have assigned tasks)

### Drag and Drop
- Click and drag any task card
- Drop it on a different column to move it
- The task's status will update automatically

### Filtering and Search
- Use the **Search** box to find tasks by title, description, or assignee
- Use **Priority** dropdown to filter by priority level
- Use **Assignee** dropdown to filter by team member
- Click **"Clear Filters"** to reset all filters

## 💾 Data Persistence

All tasks and team members are automatically saved to localStorage and will persist across page refreshes.

## 🎨 Dark Mode

The application supports dark mode. Toggle it using your system preferences or browser settings.

## 📦 Dependencies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server
- **@dnd-kit/core** - Drag and drop functionality
- **@dnd-kit/utilities** - Drag and drop utilities

## 🧪 Development

Run the linter:
```bash
npm run lint
```

## 📝 License

This project is open source and available for use.
