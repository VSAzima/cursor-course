# Social Media Feed App

A modern, fully interactive social media feed component built with React, TypeScript, Vite, and Tailwind CSS.

## Features

✅ **Like/Unlike Posts** - Click heart icon to like/unlike with visual feedback  
✅ **Comment on Posts** - Expand comment section, write and submit comments  
✅ **Share Functionality** - Native Web Share API with fallback  
✅ **Create New Posts** - Post creation form with image upload  
✅ **Infinite Scroll** - Automatic loading of more posts as you scroll  
✅ **Dark Mode Support** - Beautiful dark theme  
✅ **Responsive Design** - Works on all screen sizes  

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

Build for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build:

```bash
npm run preview
```

## Testing Interactions

### 1. Like/Unlike Posts
- Click the heart icon on any post
- Watch the icon turn red and scale up
- Like count updates immediately
- Click again to unlike

### 2. Comment on Posts
- Click the "Comment" button on any post
- Comment section expands
- Type your comment in the input field
- Click "Post" or press Enter to submit
- Comment appears immediately with your avatar

### 3. Share Posts
- Click the "Share" button on any post
- On mobile/desktop with Web Share API: native share dialog opens
- On browsers without Web Share API: share count toggles
- Share count updates immediately

### 4. Create New Posts
- Type in the "What's on your mind?" textarea
- Form expands automatically when you focus
- Click "Photo" to upload images (optional)
- Images show preview with remove option
- Click "Post" to submit
- New post appears at the top of the feed

### 5. Infinite Scroll
- Scroll down to the bottom of the feed
- Loading spinner appears
- After 1.5 seconds, "You're all caught up!" message shows
- (In production, this would load more posts from API)

### Additional Interactions

- **Like Comments**: Click heart icon on any comment
- **Reply to Comments**: Click "Reply" button, type and submit
- **Image Carousel**: Navigate between multiple images in posts
- **Show More Comments**: Click "View X more comments" to expand

## Project Structure

```
social-media-feed/
├── src/
│   ├── components/
│   │   ├── Feed.tsx           # Main feed component
│   │   ├── PostCard.tsx        # Individual post card
│   │   ├── CommentSection.tsx  # Comment threads
│   │   ├── CreatePost.tsx      # Post creation form
│   │   ├── UserAvatar.tsx      # User avatar component
│   │   ├── ShareModal.tsx      # Share options modal
│   │   ├── Example.tsx         # Example usage
│   │   └── types.ts            # TypeScript types
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind CSS config
└── README.md                  # This file
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers with Web Share API support

## License

MIT
