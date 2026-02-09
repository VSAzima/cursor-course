import React, { useState } from 'react';
import UserAvatar from './UserAvatar';
import type { Comment, User } from './types';

interface CommentSectionProps {
  comments: Comment[];
  currentUser: User;
  onAddComment: (postId: string, content: string) => void;
  onLikeComment: (commentId: string) => void;
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  currentUser,
  onAddComment,
  onLikeComment,
  postId
}) => {
  const [newComment, setNewComment] = useState('');

  const formatTimeAgo = (date: Date): string => {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(postId, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <UserAvatar user={currentUser} size="sm" />
        <input
          data-testid={`comment-input-${postId}`}
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
        />
        {newComment.trim() && (
          <button
            data-testid={`comment-submit-${postId}`}
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-colors"
          >
            Post
          </button>
        )}
      </form>

      {/* Comments List */}
      {comments.length > 0 && (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <UserAvatar user={comment.user} size="sm" />
              <div className="flex-1">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl px-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                      {comment.user.name}
                    </span>
                    {comment.user.verified && (
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimeAgo(comment.timestamp)}
                    </span>
                  </div>
                  <p data-testid={`comment-content-${comment.id}`} className="text-gray-900 dark:text-white text-sm mb-2">
                    {comment.content}
                  </p>
                </div>
                <button
                  data-testid={`comment-like-${comment.id}`}
                  onClick={() => onLikeComment(comment.id)}
                  className={`flex items-center gap-1 text-xs font-medium mt-1 ml-2 ${
                    comment.liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <svg 
                    className="w-4 h-4"
                    fill={comment.liked ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {comment.likes > 0 && comment.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
