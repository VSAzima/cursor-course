import React, { useState } from 'react';
import UserAvatar from './UserAvatar';
import type { User } from './types';

interface CreatePostProps {
  currentUser: User;
  onSubmit: (content: string, images: string[]) => void;
  placeholder?: string;
}

const CreatePost: React.FC<CreatePostProps> = ({
  currentUser,
  onSubmit,
  placeholder = "What's on your mind?"
}) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || images.length > 0) {
      onSubmit(content, images);
      setContent('');
      setImages([]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files.map(f => f.name));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <form data-testid="create-post-form" onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <UserAvatar user={currentUser} size="md" />
          <div className="flex-1">
            <textarea
              data-testid="post-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholder}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <label className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Photo</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <button
                data-testid="post-submit-button"
                type="submit"
                disabled={!content.trim() && images.length === 0}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
