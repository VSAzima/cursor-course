import React, { useState } from 'react';
import UserAvatar from './UserAvatar';
import CommentSection from './CommentSection';
import type { Post, User } from './types';

interface PostCardProps {
  post: Post;
  currentUser: User;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onShare: (postId: string) => void;
  onLikeComment: (commentId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onLike,
  onComment,
  onShare,
  onLikeComment
}) => {
  const [showComments, setShowComments] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar user={post.user} size="md" />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {post.user.name}
                </span>
                {post.user.verified && (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {post.user.username}
                </span>
                <span className="text-gray-400 dark:text-gray-600">·</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatTimeAgo(post.timestamp)}
                </span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      {post.content && (
        <div className="px-4 pb-3">
          <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      )}

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="relative">
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            <img
              src={post.images[imageIndex]}
              alt={`Post image ${imageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {post.images.length > 1 && (
              <>
                {imageIndex > 0 && (
                  <button
                    onClick={() => setImageIndex(imageIndex - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-opacity"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                {imageIndex < post.images.length - 1 && (
                  <button
                    onClick={() => setImageIndex(imageIndex + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-opacity"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {post.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setImageIndex(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === imageIndex
                          ? 'bg-white w-6'
                          : 'bg-white bg-opacity-50 w-1.5'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      {(post.likes > 0 || post.comments > 0 || post.shares > 0) && (
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          {post.likes > 0 && (
            <span>{formatNumber(post.likes)} likes</span>
          )}
          {post.comments > 0 && (
            <span>{formatNumber(post.comments)} comments</span>
          )}
          {post.shares > 0 && (
            <span>{formatNumber(post.shares)} shares</span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="px-2 py-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-around">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all flex-1 justify-center active:scale-95 ${
              post.liked
                ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <svg 
              className={`w-5 h-5 transition-transform ${post.liked ? 'scale-110' : ''}`}
              fill={post.liked ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-medium">Like</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all flex-1 justify-center active:scale-95 ${
              showComments
                ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="font-medium">Comment</span>
          </button>
          <button
            onClick={() => onShare(post.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all flex-1 justify-center active:scale-95 ${
              post.shared
                ? 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <svg 
              className={`w-5 h-5 transition-transform ${post.shared ? 'scale-110' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
          <CommentSection
            comments={post.commentsList || []}
            currentUser={currentUser}
            onAddComment={onComment}
            onLikeComment={onLikeComment}
            postId={post.id}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
