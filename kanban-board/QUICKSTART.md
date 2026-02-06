# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd /Users/nkatanaeva/titled_folder/kanban-board
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Open the URL shown in the terminal (usually `http://localhost:5173`)

## ✨ What You'll See

- **Kanban Board** with 3 columns: Todo, In Progress, Done
- **Sample tasks** already loaded
- **Team members** (Alice, Bob, Charlie, Diana, Eve) ready to assign

## 🎯 Try These Features

1. **Add a Task**: Click "+ Add Task" button
2. **Edit a Task**: Click on any task card
3. **Drag & Drop**: Drag tasks between columns
4. **Filter**: Use search and filter dropdowns
5. **Manage Team**: Click "👥 Team" button to add/remove members

## 💡 Tips

- All changes are automatically saved to localStorage
- Refresh the page - your data persists!
- Try dark mode (if your system supports it)

## 🐛 Troubleshooting

**Port already in use?**
- Vite will automatically try the next available port
- Check the terminal for the actual URL

**Dependencies not installing?**
- Make sure you have Node.js v18+ installed
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

**Build errors?**
- Run `npm run lint` to check for issues
- Make sure all TypeScript types are correct
