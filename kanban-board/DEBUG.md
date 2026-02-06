# Debugging Empty Page Issue

If you see an empty page, check the browser console (F12 or right-click > Inspect > Console) for errors.

Common issues:
1. **JavaScript errors** - Check browser console
2. **CSS not loading** - Check if Tailwind styles are applied
3. **React not mounting** - Check if root div exists

## Quick Test

Open browser console and run:
```javascript
document.getElementById('root')
```

Should return the root element. If null, check HTML.

## Check React

In console, check if React is loaded:
```javascript
window.React
```

## Verify Build

Make sure dependencies are installed:
```bash
npm install
```

Then restart dev server:
```bash
npm run dev
```
