export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified?: boolean;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  liked: boolean;
  replies?: Comment[];
}

export interface Post {
  id: string;
  user: User;
  content: string;
  images?: string[];
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  shared: boolean;
  commentsList?: Comment[];
}
