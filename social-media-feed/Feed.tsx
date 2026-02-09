import React, { useState, useEffect, useRef, useCallback } from 'react';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import { Post, User, Comment } from './types';

interface FeedProps {
  currentUser: User;
  initialPosts?: Post[];
  onLoadMore?: () => Promise<Post[]>;
}

const Feed: React.FC<FeedProps> = ({
  currentUser,
  initialPosts = [],
  onLoadMore
}) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Infinite scroll observer
  useEffect(() => {
    if (!onLoadMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isLoading, hasMore, onLoadMore]);

  const loadMorePosts = useCallback(async () => {
    if (!onLoadMore || isLoading) return;

    setIsLoading(true);
    try {
      const newPosts = await onLoadMore();
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onLoadMore, isLoading]);

  const handleCreatePost = async (content: string, images: string[]) => {
    // In a real app, you would upload images and create post via API
    // const uploadedImages = await api.uploadImages(images);
    // const newPost = await api.createPost({ content, images: uploadedImages });
    
    const newPost: Post = {
      id: `post-${Date.now()}`,
      user: currentUser,
      content,
      images: images.length > 0 ? images : undefined,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      shared: false,
      commentsList: []
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
    // In a real app, you would make an API call here
    // await api.likePost(postId);
  };

  const handleComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      user: currentUser,
      content,
      timestamp: new Date(),
      likes: 0,
      liked: false
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              commentsList: [...(post.commentsList || []), newComment]
            }
          : post
      )
    );
    // In a real app, you would make an API call here
    // await api.addComment(postId, content);
  };

  const handleShare = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      // Share functionality placeholder - in a real app, this would open a share dialog
      if (navigator.share) {
        navigator.share({
          title: `${post.user.name}'s post`,
          text: post.content,
          url: window.location.href
        }).catch(() => {
          // Fallback if share is cancelled or fails
          setPosts((prev) =>
            prev.map((p) =>
              p.id === postId
                ? {
                    ...p,
                    shared: !p.shared,
                    shares: p.shared ? p.shares - 1 : p.shares + 1
                  }
                : p
            )
          );
        });
      } else {
        // Fallback for browsers without Web Share API
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  shared: !p.shared,
                  shares: p.shared ? p.shares - 1 : p.shares + 1
                }
              : p
          )
        );
      }
    }
  };

  const handleLikeComment = (commentId: string) => {
    setPosts((prev) =>
      prev.map((post) => ({
        ...post,
        commentsList: post.commentsList?.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                liked: !comment.liked,
                likes: comment.liked ? comment.likes - 1 : comment.likes + 1
              }
            : comment
        )
      }))
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Create Post */}
      <CreatePost
        currentUser={currentUser}
        onSubmit={handleCreatePost}
        placeholder="What's on your mind?"
      />

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No posts yet. Be the first to share something!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              onLikeComment={handleLikeComment}
            />
          ))
        )}

        {/* Infinite Scroll Placeholder */}
        {onLoadMore && (
          <div ref={observerTarget} className="py-8">
            {isLoading && (
              <div className="flex flex-col justify-center items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Loading more posts...
                </span>
              </div>
            )}
            {!hasMore && posts.length > 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-medium">You're all caught up! 🎉</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
