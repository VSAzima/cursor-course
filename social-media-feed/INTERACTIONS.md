# Social Media Feed - Interactions Documentation

This document describes all the interactive features implemented in the social media feed component.

## ✅ Implemented Interactions

### 1. Like/Unlike Posts
**Location:** `PostCard.tsx` → Like button

**Features:**
- Click to like/unlike a post
- Visual feedback with color change (red when liked)
- Icon animation (scale effect when liked)
- Button press animation (scale down on click)
- Like count updates in real-time
- State persists across component re-renders

**Implementation:**
- `handleLike` function in `Feed.tsx` toggles the `liked` state
- Updates the `likes` count accordingly
- Visual state changes: gray → red, empty heart → filled heart

**Code Example:**
```tsx
<button onClick={() => onLike(post.id)}>
  {/* Like button with visual feedback */}
</button>
```

---

### 2. Comment on Posts
**Location:** `PostCard.tsx` → Comment button & `CommentSection.tsx`

**Features:**
- Click "Comment" button to expand/collapse comment section
- Write and submit new comments
- Real-time comment count updates
- Comment input with avatar
- Comments display with user info, timestamp, and like functionality
- "Show more comments" for posts with many comments
- Reply functionality (UI ready, creates new top-level comment)

**Implementation:**
- `handleComment` function in `Feed.tsx` adds new comments
- Comment section expands when button is clicked
- Comments are stored in `post.commentsList`
- Comment count increments automatically

**Code Example:**
```tsx
<button onClick={() => setShowComments(!showComments)}>
  {/* Comment button */}
</button>
{showComments && <CommentSection ... />}
```

---

### 3. Share Functionality (Placeholder)
**Location:** `PostCard.tsx` → Share button

**Features:**
- Click to share a post
- Uses Web Share API when available (native share dialog)
- Fallback to toggle share state when Web Share API unavailable
- Visual feedback (blue color when shared)
- Share count updates
- Icon animation on share

**Implementation:**
- `handleShare` function in `Feed.tsx` attempts native share first
- Falls back to simple state toggle if share API unavailable
- Share count increments/decrements based on state
- Optional: `ShareModal.tsx` component available for custom share options

**Code Example:**
```tsx
<button onClick={() => onShare(post.id)}>
  {/* Share button with Web Share API integration */}
</button>
```

**Share Options Available:**
- Native share dialog (mobile/desktop)
- Copy link
- Share to Twitter
- Share to Facebook
- Share via Email
*(See ShareModal.tsx for full implementation)*

---

### 4. Create New Posts
**Location:** `CreatePost.tsx` → Post creation form

**Features:**
- Expandable textarea (expands on focus)
- Image upload with preview
- Multiple image support
- Remove images before posting
- Form validation (requires content or images)
- Submit button disabled when form is empty
- Cancel button to reset form
- Post appears at top of feed immediately
- Form resets after successful submission

**Implementation:**
- `handleCreatePost` function in `Feed.tsx` creates new post
- New post added to beginning of posts array
- Image preview using `URL.createObjectURL`
- Form state management with React hooks

**Code Example:**
```tsx
<CreatePost
  currentUser={currentUser}
  onSubmit={handleCreatePost}
  placeholder="What's on your mind?"
/>
```

**Form Features:**
- Text input with auto-expand
- Image upload button
- Image preview grid
- Remove image on hover
- Submit/Cancel buttons

---

### 5. Infinite Scroll (Placeholder)
**Location:** `Feed.tsx` → Intersection Observer

**Features:**
- Automatically loads more posts when scrolling near bottom
- Loading spinner during fetch
- "You're all caught up!" message when no more posts
- Uses Intersection Observer API for performance
- Prevents duplicate loading requests
- Configurable via `onLoadMore` prop

**Implementation:**
- `useEffect` hook sets up Intersection Observer
- Observer watches a sentinel element at bottom of feed
- When visible, triggers `loadMorePosts` function
- Loading state prevents multiple simultaneous requests
- `hasMore` flag stops loading when no more posts available

**Code Example:**
```tsx
<Feed
  currentUser={currentUser}
  initialPosts={samplePosts}
  onLoadMore={loadMorePosts} // Optional async function
/>
```

**Loading States:**
- Loading spinner with text
- End of feed message with checkmark icon
- Smooth transitions between states

---

## Additional Interactive Features

### Like Comments
- Click heart icon on any comment to like/unlike
- Visual feedback with color change
- Like count updates in real-time
- Icon animation on like

### Reply to Comments
- Click "Reply" button on any comment
- Reply input appears below comment
- Submit creates a new comment (nested replies structure ready)

### Image Carousel
- Navigate between multiple images in a post
- Previous/Next buttons
- Dot indicators for current image
- Click dots to jump to specific image

### Show More Comments
- Posts with more than 3 comments show "View X more comments"
- Click to expand/collapse all comments
- Smooth transition

---

## Visual Feedback & Animations

All interactions include visual feedback:

1. **Button Press:** `active:scale-95` - buttons scale down on click
2. **Hover States:** Color changes and background highlights
3. **Like Animation:** Heart icon scales up when liked
4. **Share Animation:** Share icon scales up when shared
5. **Loading States:** Spinner animations for async operations
6. **Transitions:** Smooth color and size transitions

---

## State Management

All interactions use React state management:

- **Posts:** Managed in `Feed.tsx` with `useState`
- **Comments:** Stored in `post.commentsList` array
- **Likes:** Boolean flags (`liked`, `shared`) with counts
- **UI State:** Local state for modals, expanded sections, etc.

---

## API Integration Points

The code includes comments indicating where API calls would be made:

```tsx
// In a real app, you would make an API call here
// await api.likePost(postId);
// await api.addComment(postId, content);
// await api.createPost({ content, images });
```

All handlers are async-ready for easy API integration.

---

## Browser Compatibility

- **Web Share API:** Modern browsers (Chrome, Safari, Edge)
- **Intersection Observer:** All modern browsers
- **Clipboard API:** Modern browsers (for copy link)
- **Fallbacks:** Graceful degradation for older browsers

---

## Testing Interactions

To test all interactions:

1. **Like:** Click heart icon on any post
2. **Comment:** Click comment button, type and submit
3. **Share:** Click share button (will use native share if available)
4. **Create Post:** Type in textarea, optionally add images, click Post
5. **Infinite Scroll:** Scroll to bottom of feed (if `onLoadMore` provided)

All interactions are fully functional and ready for API integration!
