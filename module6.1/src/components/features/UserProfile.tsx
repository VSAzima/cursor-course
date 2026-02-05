import { useState } from 'react'
import { Avatar } from '../common/Avatar'
import { Button } from '../common/Button'
import { StatItem } from '../common/StatItem'

export interface UserStats {
  posts: number
  followers: number
  following: number
}

export interface UserProfileData {
  id: string
  name: string
  username: string
  avatarUrl?: string
  bio?: string
  stats: UserStats
  isFollowing?: boolean
  isOwnProfile?: boolean
  verified?: boolean
  location?: string
  website?: string
  joinDate?: string
}

interface UserProfileProps {
  user: UserProfileData
  onFollow?: () => void
  onMessage?: () => void
  onEdit?: () => void
}

export const UserProfile = ({ 
  user, 
  onFollow, 
  onMessage, 
  onEdit 
}: UserProfileProps) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    onFollow?.()
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Cover Image Placeholder */}
      <div className="h-32 md:h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500" />
      
      <div className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg">
        {/* Profile Header */}
        <div className="px-4 md:px-6 pb-6">
          {/* Avatar and Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 sm:-mt-16">
            <Avatar 
              src={user.avatarUrl}
              alt={user.name}
              size="2xl"
              fallbackText={user.name}
              className="border-4 border-white dark:border-gray-800"
            />
            
            {/* Action Buttons */}
            <div className="flex gap-2 sm:mb-4">
              {user.isOwnProfile ? (
                <Button
                  onClick={onEdit}
                  variant="secondary"
                  className="flex-1 sm:flex-none"
                  aria-label="Edit profile"
                >
                  <svg 
                    className="w-5 h-5 sm:mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                    />
                  </svg>
                  <span className="hidden sm:inline">Edit Profile</span>
                  <span className="sm:hidden">Edit</span>
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleFollow}
                    variant={isFollowing ? "secondary" : "primary"}
                    className="flex-1 sm:flex-none"
                    aria-label={isFollowing ? "Unfollow user" : "Follow user"}
                    aria-pressed={isFollowing}
                  >
                    <svg 
                      className="w-5 h-5 sm:mr-2" 
                      fill={isFollowing ? "currentColor" : "none"}
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                      />
                    </svg>
                    {isFollowing ? (
                      <>
                        <span className="hidden sm:inline">Following</span>
                        <span className="sm:hidden">Following</span>
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Follow</span>
                        <span className="sm:hidden">Follow</span>
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={onMessage}
                    variant="secondary"
                    className="flex-1 sm:flex-none"
                    aria-label="Send message"
                  >
                    <svg 
                      className="w-5 h-5 sm:mr-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                      />
                    </svg>
                    <span className="hidden sm:inline">Message</span>
                    <span className="sm:hidden">Message</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="mt-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h1>
              {user.verified && (
                <svg 
                  className="w-6 h-6 text-blue-500" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  aria-label="Verified account"
                  role="img"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              @{user.username}
            </p>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="mt-4 text-gray-800 dark:text-gray-200 text-sm md:text-base leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Additional Info */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            {user.location && (
              <div className="flex items-center gap-1">
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <a 
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-500 transition-colors"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" 
                  />
                </svg>
                <span className="hover:underline">{user.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {user.joinDate && (
              <div className="flex items-center gap-1">
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <span>Joined {user.joinDate}</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div 
            className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
            role="region"
            aria-label="User statistics"
          >
            <div className="flex gap-6 md:gap-8">
              <StatItem 
                value={user.stats.posts} 
                label="Posts" 
              />
              <StatItem 
                value={user.stats.followers} 
                label="Followers"
                clickable
              />
              <StatItem 
                value={user.stats.following} 
                label="Following"
                clickable
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
