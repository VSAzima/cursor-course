# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Open the URL shown in terminal (usually `http://localhost:5173`)

## ✅ Verify Everything Works

Once the app is running, test these interactions:

1. **Like a Post** - Click the ❤️ heart icon on any post
   - Should turn red and count increases

2. **Comment** - Click "Comment" button, type and submit
   - Comment section expands
   - Your comment appears immediately

3. **Share** - Click the share button
   - On mobile: Opens native share dialog
   - On desktop: Toggles share count

4. **Create Post** - Type in "What's on your mind?" box
   - Form expands
   - Click "Post" to submit
   - New post appears at top

5. **Scroll** - Scroll to bottom
   - Loading spinner appears
   - "You're all caught up!" message shows

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port.

### Build Errors
Run `npm run build` to check for TypeScript errors.

### Images Not Loading
Check browser console for CORS errors. Unsplash images should work, but if blocked, you may need to use local images.

## 📚 More Information

- See `TESTING_GUIDE.md` for detailed interaction testing
- See `README.md` for full documentation
- See `INTERACTIONS.md` for interaction details

## 🎉 You're Ready!

The app is now running and ready to test all interactions!
