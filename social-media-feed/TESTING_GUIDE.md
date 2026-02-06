# Testing Guide - Social Media Feed Interactions

This guide will help you test all interactions in the social media feed app.

## Prerequisites

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the URL shown in terminal)

## Testing Checklist

### ✅ 1. Like/Unlike Posts

**Test Steps:**
1. Find a post with a heart icon button
2. Click the heart icon
3. **Expected:** 
   - Heart icon turns red
   - Heart icon scales up slightly
   - Like count increases by 1
   - Button has red color
4. Click the heart icon again
5. **Expected:**
   - Heart icon turns gray
   - Like count decreases by 1
   - Button returns to normal color

**Visual Feedback:**
- ✅ Icon color changes (gray ↔ red)
- ✅ Icon scales on click
- ✅ Button press animation (scale down)
- ✅ Count updates immediately

---

### ✅ 2. Comment on Posts

**Test Steps:**
1. Find a post and click the "Comment" button
2. **Expected:**
   - Comment section expands below the post
   - Comment input field appears with your avatar
   - Button highlights (blue background)
3. Type a comment in the input field
4. Click "Post" button or press Enter
5. **Expected:**
   - Comment appears immediately below
   - Comment shows your avatar and name
   - Comment count increases
   - Input field clears
6. Click "Comment" button again
7. **Expected:**
   - Comment section collapses

**Additional Tests:**
- Test with posts that have existing comments
- Click "View X more comments" if available
- Verify comment timestamps display correctly

**Visual Feedback:**
- ✅ Comment button highlights when active
- ✅ Smooth expand/collapse animation
- ✅ Comments appear instantly
- ✅ Input clears after submission

---

### ✅ 3. Share Functionality

**Test Steps:**
1. Find a post and click the "Share" button
2. **Expected Behavior (varies by browser):**

   **On Mobile/Modern Desktop (with Web Share API):**
   - Native share dialog opens
   - Can share to various apps
   - Share count may or may not update (depends on implementation)

   **On Browsers without Web Share API:**
   - Share count increases by 1
   - Share icon turns blue
   - Icon scales up slightly
   - Button highlights

3. Click "Share" again (if no native dialog)
4. **Expected:**
   - Share count decreases
   - Share icon returns to normal

**Visual Feedback:**
- ✅ Share icon scales on click
- ✅ Button color changes (blue when shared)
- ✅ Share count updates

**Note:** The `ShareModal.tsx` component is available for custom share options but not currently integrated. You can integrate it for Twitter, Facebook, Email, and Copy Link options.

---

### ✅ 4. Create New Posts

**Test Steps:**
1. Find the "What's on your mind?" textarea at the top
2. Click inside the textarea
3. **Expected:**
   - Textarea expands to 4 rows
   - Action buttons appear (Photo, Cancel, Post)
4. Type some text
5. **Expected:**
   - "Post" button becomes enabled (blue)
   - Cancel button appears
6. Click "Post" button
7. **Expected:**
   - New post appears at the top of the feed
   - Post shows your avatar and name
   - Post shows current timestamp
   - Form resets and collapses
   - Like/Comment/Share buttons work on new post

**Test with Images:**
1. Click "Photo" button
2. Select one or more images
3. **Expected:**
   - Image previews appear in a grid
   - Remove button (X) appears on hover
4. Click "Post" button
5. **Expected:**
   - New post appears with images
   - Images display correctly in post

**Test Cancel:**
1. Type text and/or add images
2. Click "Cancel" button
3. **Expected:**
   - Form collapses
   - Text clears
   - Images removed
   - No post created

**Visual Feedback:**
- ✅ Form expands smoothly on focus
- ✅ Post button enables/disables based on content
- ✅ Image previews show immediately
- ✅ Form resets after submission

---

### ✅ 5. Infinite Scroll

**Test Steps:**
1. Scroll down to the bottom of the feed
2. **Expected:**
   - Loading spinner appears
   - "Loading more posts..." text shows
   - Spinner animates
3. Wait ~1.5 seconds
4. **Expected:**
   - "You're all caught up! 🎉" message appears
   - Message has checkmark icon
   - Styled badge appearance

**Note:** In the current implementation, `loadMorePosts` returns an empty array, so no new posts load. In production, this would fetch from an API.

**To Test with Real Loading:**
- Modify `loadMorePosts` in `App.tsx` to return sample posts
- Scroll to trigger loading
- Verify new posts appear

**Visual Feedback:**
- ✅ Loading spinner animation
- ✅ Smooth transition to end message
- ✅ Styled completion message

---

## Additional Interaction Tests

### Like Comments

**Test Steps:**
1. Expand comment section on any post
2. Find a comment with a heart icon
3. Click the heart icon
4. **Expected:**
   - Heart fills and turns red
   - Like count increases
   - Icon scales slightly

### Reply to Comments

**Test Steps:**
1. Expand comment section
2. Click "Reply" button on any comment
3. **Expected:**
   - Reply input appears below comment
   - Input has your avatar
4. Type reply and submit
5. **Expected:**
   - Reply appears (currently as new top-level comment)
   - Input clears

### Image Carousel

**Test Steps:**
1. Find a post with multiple images
2. **Expected:**
   - Dot indicators at bottom
   - Previous/Next buttons (if not first/last image)
3. Click right arrow or next dot
4. **Expected:**
   - Image changes smoothly
   - Active dot highlights
5. Click previous arrow
6. **Expected:**
   - Previous image shows

---

## Browser Compatibility Tests

### Desktop Browsers
- ✅ Chrome/Edge: Full Web Share API support
- ✅ Firefox: Fallback share behavior
- ✅ Safari: Full Web Share API support

### Mobile Browsers
- ✅ iOS Safari: Native share sheet
- ✅ Chrome Mobile: Native share sheet
- ✅ Firefox Mobile: Fallback behavior

---

## Common Issues & Solutions

### Issue: Images not loading
**Solution:** Check browser console for CORS errors. Unsplash images should work, but if blocked, use local images or configure CORS.

### Issue: Share button doesn't work
**Solution:** 
- On mobile: Should open native share
- On desktop without Web Share API: Toggles share count
- Check browser console for errors

### Issue: Comments not appearing
**Solution:**
- Check browser console for errors
- Verify comment was submitted (input should clear)
- Check that comment section is expanded

### Issue: Infinite scroll not working
**Solution:**
- Verify `onLoadMore` prop is provided to Feed component
- Check browser console for errors
- Ensure Intersection Observer is supported (all modern browsers)

---

## Performance Tests

1. **Scroll Performance:**
   - Scroll through feed smoothly
   - No lag or jank
   - Images load progressively

2. **Interaction Responsiveness:**
   - All buttons respond immediately
   - No delay on clicks
   - Animations are smooth

3. **Memory:**
   - Check browser DevTools for memory leaks
   - Scroll through many posts
   - Verify no excessive memory usage

---

## Accessibility Tests

1. **Keyboard Navigation:**
   - Tab through all interactive elements
   - Press Enter/Space on buttons
   - Verify focus indicators visible

2. **Screen Reader:**
   - Test with screen reader (VoiceOver/NVDA)
   - Verify all content is announced
   - Check button labels are descriptive

3. **Color Contrast:**
   - Verify text is readable
   - Check button colors meet WCAG standards

---

## Summary

All interactions should work smoothly with:
- ✅ Immediate visual feedback
- ✅ Smooth animations
- ✅ State persistence
- ✅ Error-free console
- ✅ Responsive design

If any interaction doesn't work as expected, check the browser console for errors and refer to the "Common Issues & Solutions" section above.
