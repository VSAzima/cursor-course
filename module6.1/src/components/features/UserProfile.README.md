# UserProfile Component

A comprehensive, accessible, and responsive user profile component for social media applications.

## Features

- ✅ **Fully Responsive** - Adapts seamlessly to mobile, tablet, and desktop screens
- ✅ **Accessible** - WCAG 2.1 compliant with ARIA labels and keyboard navigation
- ✅ **TypeScript** - Fully typed with comprehensive interfaces
- ✅ **Dark Mode** - Complete dark mode support
- ✅ **Interactive** - Follow/unfollow, messaging, and profile editing
- ✅ **Customizable Avatar** - With automatic fallback to initials
- ✅ **Smart Number Formatting** - Automatically formats large numbers (1.5K, 2.3M)
- ✅ **Verified Badge** - Optional verification indicator
- ✅ **Social Links** - Location, website, and join date display

## Installation

The component is already included in your project structure:

```
src/components/
├── common/
│   ├── Avatar.tsx          # Reusable avatar component
│   ├── Button.tsx          # Reusable button component
│   └── StatItem.tsx        # Statistics display component
└── features/
    └── UserProfile.tsx     # Main profile component
```

## Usage

### Basic Example

```typescript
import { UserProfile } from './components'
import type { UserProfileData } from './components'

const userData: UserProfileData = {
  id: '1',
  name: 'Jane Doe',
  username: 'janedoe',
  bio: 'Software engineer passionate about React and TypeScript',
  stats: {
    posts: 150,
    followers: 1250,
    following: 340
  },
  isFollowing: false,
  isOwnProfile: false
}

function App() {
  return (
    <UserProfile 
      user={userData}
      onFollow={() => console.log('Followed!')}
      onMessage={() => console.log('Opening messages...')}
    />
  )
}
```

### With All Features

```typescript
const fullUserData: UserProfileData = {
  id: '2',
  name: 'Sarah Johnson',
  username: 'sarahjohnson',
  avatarUrl: 'https://example.com/avatar.jpg',
  bio: '🎨 Digital Artist & Designer | Creating beautiful experiences',
  stats: {
    posts: 342,
    followers: 12500,
    following: 890
  },
  isFollowing: true,
  isOwnProfile: false,
  verified: true,
  location: 'San Francisco, CA',
  website: 'https://example.com',
  joinDate: 'January 2022'
}

<UserProfile 
  user={fullUserData}
  onFollow={handleFollow}
  onMessage={handleMessage}
/>
```

### Own Profile (Edit Mode)

```typescript
const ownProfile: UserProfileData = {
  id: '3',
  name: 'John Smith',
  username: 'johnsmith',
  bio: 'My awesome profile',
  stats: {
    posts: 50,
    followers: 200,
    following: 150
  },
  isOwnProfile: true // Shows "Edit Profile" button
}

<UserProfile 
  user={ownProfile}
  onEdit={handleEdit}
/>
```

## TypeScript Interfaces

### UserProfileData

```typescript
interface UserProfileData {
  id: string                    // Unique user identifier
  name: string                  // Display name
  username: string              // Username (without @)
  avatarUrl?: string            // Optional profile picture URL
  bio?: string                  // User bio/description
  stats: UserStats              // User statistics
  isFollowing?: boolean         // Current follow state
  isOwnProfile?: boolean        // If true, shows edit button instead of follow/message
  verified?: boolean            // Shows verification badge
  location?: string             // User's location
  website?: string              // User's website URL
  joinDate?: string             // Account creation date (formatted string)
}
```

### UserStats

```typescript
interface UserStats {
  posts: number       // Number of posts
  followers: number   // Number of followers
  following: number   // Number of users following
}
```

### UserProfileProps

```typescript
interface UserProfileProps {
  user: UserProfileData         // User data to display
  onFollow?: () => void         // Callback when follow button is clicked
  onMessage?: () => void        // Callback when message button is clicked
  onEdit?: () => void           // Callback when edit profile is clicked
}
```

## Component Breakdown

### 1. Avatar Component

Reusable avatar with automatic fallback to initials:

```typescript
<Avatar 
  src={user.avatarUrl}
  alt={user.name}
  size="2xl"
  fallbackText={user.name}
/>
```

**Props:**
- `src` - Image URL (optional)
- `alt` - Alt text (required for accessibility)
- `size` - 'sm' | 'md' | 'lg' | 'xl' | '2xl'
- `fallbackText` - Used to generate initials if no image

### 2. StatItem Component

Reusable statistics display component:

```typescript
<StatItem 
  value={user.stats.followers}
  label="Followers"
  clickable
/>
```

**Props:**
- `value` - Number to display (automatically formatted)
- `label` - Label text (e.g., "Posts", "Followers")
- `clickable` - Boolean, adds hover effects and makes it interactive
- `onStatClick` - Callback function when clicked (if clickable)

### 3. Header Section

- Cover image gradient
- Profile avatar with white border
- Action buttons (responsive layout)

### 4. User Information

- Name with optional verified badge
- Username with @ prefix
- Bio (supports emoji and multi-line text)
- Location, website, and join date with icons

### 5. Statistics

- Posts count (using StatItem component)
- Followers (using StatItem component, clickable)
- Following (using StatItem component, clickable)
- Smart number formatting (handled by StatItem)

## Responsive Behavior

### Mobile (< 640px)
- Stacked layout for avatar and buttons
- Condensed button text
- Smaller cover image height
- Single column stats

### Tablet (640px - 1024px)
- Side-by-side avatar and buttons
- Full button text with icons
- Medium cover image height

### Desktop (> 1024px)
- Spacious layout
- Large cover image
- Maximum width constraint (4xl)

## Accessibility Features

### ARIA Labels
- All interactive elements have descriptive labels
- Image alts for avatars and icons
- Region labels for statistics section

### Keyboard Navigation
- All buttons are keyboard accessible
- Focus indicators on interactive elements
- Proper tab order

### Screen Reader Support
- Semantic HTML structure
- Icon descriptions with aria-label
- State changes announced (follow/unfollow)

### Color Contrast
- WCAG AA compliant color combinations
- Dark mode with sufficient contrast
- Focus indicators visible in all themes

## Styling

The component uses Tailwind CSS utility classes:

### Key Classes Used
- **Layout**: `flex`, `grid`, `container`, `max-w-4xl`
- **Spacing**: `gap-4`, `px-6`, `mt-4`, responsive variants
- **Colors**: Dark mode with `dark:` variants
- **Typography**: `font-bold`, `text-2xl`, responsive sizes
- **Effects**: `shadow-lg`, `rounded-lg`, `transition-colors`

### Customization

You can customize the component by:

1. **Modifying Colors**: Change gradient colors in the cover image
2. **Adjusting Sizes**: Update avatar size and spacing
3. **Custom Icons**: Replace SVG icons with your icon library
4. **Extended Stats**: Add more statistics to the stats section

## Number Formatting

The component includes smart number formatting:

```typescript
1,234 → "1.2K"
12,345 → "12.3K"
1,234,567 → "1.2M"
```

## Button States

### Follow Button
- Not following: Blue primary button with "Follow"
- Following: Gray secondary button with "Following"
- Includes user icon
- Aria-pressed state for screen readers

### Message Button
- Always available for non-own profiles
- Chat bubble icon
- Opens messaging interface (via callback)

### Edit Profile Button
- Only shown when `isOwnProfile: true`
- Edit icon
- Opens profile editor (via callback)

## Event Handlers

### onFollow
Called when the follow/unfollow button is clicked. The component manages the visual state internally, but you should handle the API call:

```typescript
const handleFollow = async () => {
  try {
    await api.toggleFollow(userId)
    // Component updates UI automatically
  } catch (error) {
    console.error('Failed to follow user:', error)
  }
}
```

### onMessage
Called when the message button is clicked:

```typescript
const handleMessage = () => {
  navigate(`/messages/${user.id}`)
}
```

### onEdit
Called when the edit profile button is clicked:

```typescript
const handleEdit = () => {
  navigate('/settings/profile')
}
```

## Best Practices

1. **Load Avatar Images**: Use optimized images (400x400px recommended)
2. **Error Handling**: Handle missing data gracefully with optional fields
3. **Loading States**: Show skeleton/loading state while fetching user data
4. **Optimistic Updates**: Update UI immediately, rollback on error
5. **Link Validation**: Validate website URLs before displaying
6. **Date Formatting**: Use consistent date format for joinDate

## Examples in Action

Check `src/App.tsx` for complete working examples including:
- Viewing another user's profile
- Viewing your own profile
- Handling follow/unfollow interactions
- Different stat configurations

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- React 19+
- TypeScript 5+
- Tailwind CSS v4+

## Future Enhancements

Potential additions:
- [ ] Profile tabs (posts, media, likes)
- [ ] Mutual followers indicator
- [ ] Activity status (online/offline)
- [ ] Cover photo upload
- [ ] Share profile button
- [ ] Block/report options
- [ ] Badge collections
- [ ] Profile highlights

## Support

For issues or questions about this component, refer to:
- `STRUCTURE.md` for project organization
- `README.md` for general setup
- Component source code with inline comments
