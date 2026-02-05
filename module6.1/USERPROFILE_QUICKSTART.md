# UserProfile Component - Quick Start Guide

## 🚀 Quick Usage

```typescript
import { UserProfile } from './components'
import type { UserProfileData } from './components'

const user: UserProfileData = {
  id: '1',
  name: 'Jane Doe',
  username: 'janedoe',
  bio: 'Software Engineer | React Enthusiast',
  stats: {
    posts: 150,
    followers: 1250,
    following: 340
  }
}

<UserProfile user={user} />
```

## 📋 Required Props

| Prop | Type | Description |
|------|------|-------------|
| `user` | `UserProfileData` | User data object |

## 🎯 Required User Fields

| Field | Type | Example |
|-------|------|---------|
| `id` | string | `"user123"` |
| `name` | string | `"Jane Doe"` |
| `username` | string | `"janedoe"` |
| `bio` | string | `"Software Engineer"` |
| `stats` | object | `{ posts: 150, followers: 1250, following: 340 }` |

## ✨ Optional User Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `avatarUrl` | string | undefined | Profile picture URL |
| `isFollowing` | boolean | false | Current follow state |
| `isOwnProfile` | boolean | false | Shows edit button if true |
| `verified` | boolean | false | Shows verified badge |
| `location` | string | undefined | User location |
| `website` | string | undefined | User website |
| `joinDate` | string | undefined | Formatted join date |

## 🎨 Examples

### Basic Profile
```typescript
const basicUser = {
  id: '1',
  name: 'John Smith',
  username: 'johnsmith',
  bio: 'Hello world!',
  stats: { posts: 10, followers: 50, following: 30 }
}
```

### Full-Featured Profile
```typescript
const fullUser = {
  id: '2',
  name: 'Sarah Johnson',
  username: 'sarahjohnson',
  avatarUrl: 'https://example.com/avatar.jpg',
  bio: '🎨 Designer | 📍 SF',
  stats: { posts: 500, followers: 15000, following: 800 },
  verified: true,
  location: 'San Francisco, CA',
  website: 'https://sarahjohnson.com',
  joinDate: 'January 2022'
}
```

### Own Profile
```typescript
const myProfile = {
  id: '3',
  name: 'You',
  username: 'yourusername',
  bio: 'This is me!',
  stats: { posts: 100, followers: 500, following: 200 },
  isOwnProfile: true  // Shows "Edit Profile" button
}
```

## 🎯 Event Handlers

```typescript
<UserProfile 
  user={userData}
  onFollow={() => {
    // Handle follow/unfollow
    console.log('Follow toggled')
  }}
  onMessage={() => {
    // Handle message button
    console.log('Open messages')
  }}
  onEdit={() => {
    // Handle edit profile (only if isOwnProfile: true)
    console.log('Edit profile')
  }}
/>
```

## 📱 Responsive Design

- **Mobile**: Stacked layout, compact buttons
- **Tablet**: Side-by-side layout
- **Desktop**: Full layout with maximum width

## ♿ Accessibility Features

- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Semantic HTML
- ✅ Color contrast compliant

## 🎨 Styling

Uses Tailwind CSS with full dark mode support:
- Light mode: White backgrounds, dark text
- Dark mode: Gray-800 backgrounds, light text

## 💡 Tips

1. **Avatar Images**: Use 400x400px for best quality
2. **Number Formatting**: Automatic (1234 → 1.2K, 1234567 → 1.2M)
3. **Missing Avatar**: Shows user initials as fallback
4. **Bio**: Supports emoji and multi-line text
5. **Links**: Website and location automatically formatted with icons

## 📚 More Information

- Full documentation: `UserProfile.README.md`
- Examples file: `UserProfile.example.tsx`
- Source code: `UserProfile.tsx`

## 🐛 Common Issues

**Issue**: Avatar not showing
- **Solution**: Check `avatarUrl` is valid or omit for initials

**Issue**: Buttons not appearing
- **Solution**: Check `isOwnProfile` flag and provide callbacks

**Issue**: Stats not formatting
- **Solution**: Ensure `stats` object has `posts`, `followers`, `following` numbers

## 🎯 Try It Now

```bash
npm run dev
```

Open `http://localhost:5173` to see live examples!
