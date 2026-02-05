/**
 * UserProfile Component Examples
 * 
 * This file demonstrates various use cases and configurations
 * of the UserProfile component.
 */

import { UserProfile } from './UserProfile'
import type { UserProfileData } from './UserProfile'

// Example 1: Verified influencer with large following
export const InfluencerProfile: UserProfileData = {
  id: 'influencer-1',
  name: 'Alex Rivera',
  username: 'alexrivera',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  bio: '🎬 Content Creator | 📸 Photographer | ✈️ Travel Enthusiast\nSharing my adventures around the world 🌍',
  stats: {
    posts: 1247,
    followers: 2340000,
    following: 892
  },
  isFollowing: false,
  isOwnProfile: false,
  verified: true,
  location: 'Los Angeles, CA',
  website: 'https://alexrivera.com',
  joinDate: 'June 2019'
}

// Example 2: New user with minimal stats
export const NewUserProfile: UserProfileData = {
  id: 'newuser-1',
  name: 'Emily Chen',
  username: 'emilychen',
  bio: 'Just joined! Excited to connect with everyone 👋',
  stats: {
    posts: 3,
    followers: 42,
    following: 15
  },
  isFollowing: false,
  isOwnProfile: false,
  location: 'Seattle, WA',
  joinDate: 'February 2026'
}

// Example 3: Professional profile
export const ProfessionalProfile: UserProfileData = {
  id: 'pro-1',
  name: 'Dr. Michael Thompson',
  username: 'drmthompson',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  bio: '🔬 Research Scientist | 🧬 Biotechnology | 🎓 PhD in Molecular Biology\nSharing insights on science and innovation',
  stats: {
    posts: 567,
    followers: 45600,
    following: 234
  },
  isFollowing: true,
  isOwnProfile: false,
  verified: true,
  location: 'Boston, MA',
  website: 'https://research.university.edu/thompson',
  joinDate: 'March 2020'
}

// Example 4: Artist profile
export const ArtistProfile: UserProfileData = {
  id: 'artist-1',
  name: 'Luna Martinez',
  username: 'lunamartinez_art',
  avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  bio: '🎨 Digital Artist | 🖌️ Illustrator | Commission: OPEN\nCreating colorful worlds one pixel at a time ✨',
  stats: {
    posts: 892,
    followers: 156000,
    following: 445
  },
  isFollowing: false,
  isOwnProfile: false,
  verified: false,
  location: 'Austin, TX',
  website: 'https://lunamartinez.art',
  joinDate: 'September 2021'
}

// Example 5: Own profile
export const OwnProfileExample: UserProfileData = {
  id: 'me-1',
  name: 'Your Name',
  username: 'yourusername',
  bio: '💻 Software Developer | ☕ Coffee Enthusiast | 🎮 Gamer\nBuilding cool stuff with React and TypeScript',
  stats: {
    posts: 234,
    followers: 5670,
    following: 890
  },
  isOwnProfile: true,
  location: 'New York, NY',
  website: 'https://yourportfolio.com',
  joinDate: 'January 2023'
}

// Example 6: Minimal profile (no optional fields)
export const MinimalProfile: UserProfileData = {
  id: 'minimal-1',
  name: 'Sam Wilson',
  username: 'samwilson',
  bio: 'Keep it simple.',
  stats: {
    posts: 12,
    followers: 89,
    following: 67
  }
}

// Example 7: Profile without avatar
export const NoAvatarProfile: UserProfileData = {
  id: 'noavatar-1',
  name: 'Jordan Taylor',
  username: 'jordantaylor',
  bio: 'Profile without an avatar image - shows initials instead',
  stats: {
    posts: 156,
    followers: 1234,
    following: 567
  },
  isFollowing: false,
  isOwnProfile: false,
  location: 'Portland, OR',
  joinDate: 'May 2024'
}

// Example 8: Business/Brand profile
export const BrandProfile: UserProfileData = {
  id: 'brand-1',
  name: 'TechCorp Solutions',
  username: 'techcorpsolutions',
  avatarUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=400&fit=crop',
  bio: '🚀 Leading Tech Company | 💡 Innovation & Solutions\nTransforming businesses through technology since 2015',
  stats: {
    posts: 2340,
    followers: 567000,
    following: 123
  },
  isFollowing: true,
  isOwnProfile: false,
  verified: true,
  location: 'San Francisco, CA',
  website: 'https://techcorpsolutions.com',
  joinDate: 'April 2015'
}

// Component to showcase all examples
export function UserProfileShowcase() {
  const profiles = [
    { title: 'Verified Influencer', data: InfluencerProfile },
    { title: 'New User', data: NewUserProfile },
    { title: 'Professional', data: ProfessionalProfile },
    { title: 'Artist', data: ArtistProfile },
    { title: 'Your Profile', data: OwnProfileExample },
    { title: 'Minimal Profile', data: MinimalProfile },
    { title: 'No Avatar', data: NoAvatarProfile },
    { title: 'Brand Account', data: BrandProfile }
  ]

  return (
    <div className="space-y-12 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          UserProfile Component Showcase
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Different variations and use cases
        </p>
      </div>

      {profiles.map(({ title, data }) => (
        <section key={data.id}>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 px-4">
            {title}
          </h2>
          <UserProfile
            user={data}
            onFollow={() => console.log(`Follow: ${data.username}`)}
            onMessage={() => console.log(`Message: ${data.username}`)}
            onEdit={() => console.log('Edit profile')}
          />
        </section>
      ))}
    </div>
  )
}

// Usage in your app:
// import { UserProfileShowcase } from './components/features/UserProfile.example'
// <UserProfileShowcase />
