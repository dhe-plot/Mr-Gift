export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  username: string;
  avatar: string;
  isVerified?: boolean;
  giftStars: number;
  followers: number;
  following: number;
}

export interface Gift {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  brand: string;
  category: string;
  url?: string;
  description?: string;
}

export interface StoryMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  duration?: number; // for videos in seconds
  width: number;
  height: number;
}

export interface Story {
  id: string;
  user: User;
  media: StoryMedia[];
  gift?: Gift;
  caption?: string;
  location?: string;
  tags: string[];
  createdAt: Date;
  expiresAt: Date;
  views: number;
  likes: number;
  isLiked: boolean;
  isViewed: boolean;
  backgroundColor?: string;
  textColor?: string;
}

export interface StoryGroup {
  user: User;
  stories: Story[];
  hasUnviewed: boolean;
  lastStoryAt: Date;
}

export interface StoryInteraction {
  id: string;
  storyId: string;
  userId: string;
  type: 'view' | 'like' | 'share' | 'gift_inquiry';
  createdAt: Date;
}

export interface CreateStoryData {
  media: File[];
  caption?: string;
  location?: string;
  tags: string[];
  gift?: {
    name: string;
    price: number;
    currency: string;
    image: string;
    brand: string;
    category: string;
    url?: string;
  };
  backgroundColor?: string;
  textColor?: string;
}
