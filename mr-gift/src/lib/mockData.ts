import { User, Story, StoryGroup, Gift } from '@/types/stories';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    username: 'sarahj',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    isVerified: true,
    giftStars: 4.8,
    followers: 1250,
    following: 890,
  },
  {
    id: '2',
    firstName: 'Mike',
    lastName: 'Chen',
    username: 'mikechen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isVerified: false,
    giftStars: 4.5,
    followers: 680,
    following: 420,
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Davis',
    username: 'emmad',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isVerified: true,
    giftStars: 4.9,
    followers: 2100,
    following: 1200,
  },
  {
    id: '4',
    firstName: 'Alex',
    lastName: 'Rodriguez',
    username: 'alexr',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isVerified: false,
    giftStars: 4.3,
    followers: 450,
    following: 380,
  },
];

// Mock gifts
export const mockGifts: Gift[] = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 299.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    brand: 'Sony',
    category: 'Electronics',
    url: 'https://example.com/headphones',
    description: 'Premium wireless headphones with industry-leading noise cancellation',
  },
  {
    id: '2',
    name: 'Artisan Coffee Subscription',
    price: 24.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop',
    brand: 'Blue Bottle',
    category: 'Food & Beverage',
    description: 'Monthly delivery of freshly roasted specialty coffee beans',
  },
  {
    id: '3',
    name: 'Silk Scarf Collection',
    price: 89.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop',
    brand: 'Hermès',
    category: 'Fashion',
    description: 'Luxurious silk scarves with exclusive patterns',
  },
];

// Mock stories
export const mockStories: Story[] = [
  {
    id: '1',
    user: mockUsers[0],
    media: [
      {
        id: '1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop',
        width: 400,
        height: 600,
      },
    ],
    gift: mockGifts[0],
    caption: 'Found the perfect gift for my music-loving brother! 🎧✨',
    location: 'Best Buy, NYC',
    tags: ['electronics', 'music', 'brother', 'birthday'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000), // 22 hours from now
    views: 156,
    likes: 23,
    isLiked: false,
    isViewed: false,
    backgroundColor: '#FF6B6B',
    textColor: '#FFFFFF',
  },
  {
    id: '2',
    user: mockUsers[1],
    media: [
      {
        id: '2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop',
        width: 400,
        height: 600,
      },
    ],
    gift: mockGifts[1],
    caption: 'Coffee lovers, this subscription is amazing! ☕️',
    tags: ['coffee', 'subscription', 'morning', 'gift'],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000), // 20 hours from now
    views: 89,
    likes: 15,
    isLiked: true,
    isViewed: true,
    backgroundColor: '#4ECDC4',
    textColor: '#FFFFFF',
  },
  {
    id: '3',
    user: mockUsers[2],
    media: [
      {
        id: '3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
        width: 400,
        height: 600,
      },
    ],
    gift: mockGifts[2],
    caption: 'Treating myself to some luxury! Perfect for special occasions 💫',
    location: 'Hermès Store',
    tags: ['fashion', 'luxury', 'scarf', 'selfcare'],
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
    views: 234,
    likes: 45,
    isLiked: false,
    isViewed: false,
    backgroundColor: '#9B59B6',
    textColor: '#FFFFFF',
  },
];

// Group stories by user
export const mockStoryGroups: StoryGroup[] = [
  {
    user: mockUsers[0],
    stories: [mockStories[0]],
    hasUnviewed: true,
    lastStoryAt: mockStories[0].createdAt,
  },
  {
    user: mockUsers[1],
    stories: [mockStories[1]],
    hasUnviewed: false,
    lastStoryAt: mockStories[1].createdAt,
  },
  {
    user: mockUsers[2],
    stories: [mockStories[2]],
    hasUnviewed: true,
    lastStoryAt: mockStories[2].createdAt,
  },
];

// Helper functions
export const getStoriesByUser = (userId: string): Story[] => {
  return mockStories.filter(story => story.user.id === userId);
};

export const getStoryById = (storyId: string): Story | undefined => {
  return mockStories.find(story => story.id === storyId);
};

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};
