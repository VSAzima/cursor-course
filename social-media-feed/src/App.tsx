import React from 'react';
import Feed from './components/Feed';
import type { Post, User } from './components/types';

const App: React.FC = () => {
  // Current user
  const currentUser: User = {
    id: 'current-user-1',
    name: 'You',
    username: 'you',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    verified: false
  };

  // Sample posts data
  const samplePosts: Post[] = [
    {
      id: 'post-1',
      user: {
        id: 'user-1',
        name: 'Sarah Johnson',
        username: 'sarahj',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        verified: true
      },
      content: 'Just finished an amazing hike! The views were absolutely breathtaking. Nature never fails to amaze me. 🌲⛰️',
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
      ],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 124,
      comments: 8,
      shares: 12,
      liked: false,
      shared: false,
      commentsList: [
        {
          id: 'comment-1',
          user: {
            id: 'user-2',
            name: 'Mike Chen',
            username: 'mikec',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
          },
          content: 'Looks amazing! Where is this?',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: 5,
          liked: false
        },
        {
          id: 'comment-2',
          user: {
            id: 'user-3',
            name: 'Emma Wilson',
            username: 'emmaw',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
            verified: true
          },
          content: 'Beautiful! I need to visit this place soon.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          likes: 3,
          liked: true
        }
      ]
    },
    {
      id: 'post-2',
      user: {
        id: 'user-4',
        name: 'Alex Rodriguez',
        username: 'alexr',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        verified: false
      },
      content: 'Working on a new project! Excited to share more details soon. Stay tuned! 💻✨',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      likes: 89,
      comments: 15,
      shares: 7,
      liked: true,
      shared: false,
      commentsList: []
    },
    {
      id: 'post-3',
      user: {
        id: 'user-5',
        name: 'Lisa Anderson',
        username: 'lisaa',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
        verified: true
      },
      content: 'Coffee and code ☕ Perfect way to start the day!',
      images: [
        'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop'
      ],
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      likes: 256,
      comments: 23,
      shares: 18,
      liked: false,
      shared: true,
      commentsList: [
        {
          id: 'comment-3',
          user: {
            id: 'user-6',
            name: 'David Kim',
            username: 'davidk',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop'
          },
          content: 'Same energy! 🔥',
          timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
          likes: 12,
          liked: false
        }
      ]
    }
  ];

  // Simulate loading more posts (for infinite scroll demo)
  const loadMorePosts = async (): Promise<Post[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Return empty array to simulate no more posts after initial load
    // In a real app, you would fetch from an API:
    // const response = await fetch(`/api/posts?page=${page}&limit=10`);
    // return response.json();
    return [];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Social Media Feed
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A modern, responsive social media feed component built with React and Tailwind CSS
          </p>
        </header>

        <Feed
          currentUser={currentUser}
          initialPosts={samplePosts}
          onLoadMore={loadMorePosts}
        />
      </div>
    </div>
  );
};

export default App;
