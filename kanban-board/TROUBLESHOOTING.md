# Troubleshooting Empty Page Issue

## Quick Checks

1. **Open Browser Console** (F12 or Right-click > Inspect > Console)
   - Look for red error messages
   - Common errors: "Cannot find module", "Unexpected token", etc.

2. **Check Network Tab**
   - Make sure `main.tsx` and `index.css` are loading (status 200)
   - If files show 404, restart the dev server

3. **Verify Root Element**
   - In console, run: `document.getElementById('root')`
   - Should return the div element, not null

## Common Issues & Solutions

### Issue: "Cannot find module" errors
**Solution:** Make sure all dependencies are installed:
```bash
cd /Users/nkatanaeva/titled_folder/kanban-board
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: Tailwind CSS not working
**Solution:** Check if `postcss.config.js` and `tailwind.config.js` exist and are correct.
The page might render but be invisible due to missing styles.

### Issue: Port conflict
**Solution:** If port 5173 is busy, Vite will use the next available port (like 5180).
Check the terminal for the actual URL.

### Issue: TypeScript errors
**Solution:** Run type check:
```bash
npm run build
```
This will show any TypeScript errors.

## Verify Setup

Run these commands to verify everything is set up:

```bash
# Check if node_modules exists
ls node_modules | head -5

# Check if vite is installed
npm list vite

# Check if React is installed
npm list react react-dom

# Check if @dnd-kit is installed
npm list @dnd-kit/core
```

## Manual Test

Create a simple test file to verify React is working:

1. Temporarily replace `src/App.tsx` content with:
```tsx
export default function App() {
  return <h1>Hello World - React is working!</h1>
}
```

2. If you see "Hello World", React is working - the issue is with KanbanBoard component
3. If you still see blank page, the issue is with React/Vite setup

## Still Not Working?

1. Check browser console for specific errors
2. Share the error messages
3. Verify Node.js version: `node --version` (should be v18+)
