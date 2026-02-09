import React from 'react';
import type { User } from './types';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <img
      src={user.avatar}
      alt={user.name}
      className={`${sizeClasses[size]} rounded-full object-cover`}
    />
  );
};

export default UserAvatar;
