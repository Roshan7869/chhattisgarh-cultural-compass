export interface HeritageSite {
  id: string;
  name: string;
  category: 'temple' | 'landmark' | 'food' | 'art-village';
  location: string;
  description: string;
  image: string;
  rating: number;
  distance: string;
}

export const heritageSites: HeritageSite[] = [
  {
    id: '1',
    name: 'Bhoramdeo Temple',
    category: 'temple',
    location: 'Kawardha, Kabirdham',
    description: 'Known as the "Khajuraho of Chhattisgarh", this 11th-century temple features stunning erotic sculptures and intricate carvings.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    rating: 4.8,
    distance: '120 km'
  },
  {
    id: '2',
    name: 'Chitrakote Falls',
    category: 'landmark',
    location: 'Bastar, Jagdalpur',
    description: 'The widest waterfall in India, often called the "Niagara of India". A breathtaking horseshoe-shaped cascade.',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800',
    rating: 4.9,
    distance: '280 km'
  },
  {
    id: '3',
    name: 'Kondagaon Art Village',
    category: 'art-village',
    location: 'Kondagaon, Bastar',
    description: 'Hub of traditional Dhokra metal casting and terracotta pottery. Watch artisans create using 4000-year-old techniques.',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800',
    rating: 4.7,
    distance: '250 km'
  },
  {
    id: '4',
    name: 'Mana Ghar Restaurant',
    category: 'food',
    location: 'Raipur',
    description: 'Authentic Chhattisgarhi cuisine featuring Chila, Farra, Bore Baasi, and traditional rice beer.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    rating: 4.6,
    distance: '5 km'
  },
  {
    id: '5',
    name: 'Rajim Temple Complex',
    category: 'temple',
    location: 'Rajim, Gariaband',
    description: 'Ancient temple complex at the confluence of three rivers. Home to the famous Rajim Kumbh Mela.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    rating: 4.5,
    distance: '45 km'
  },
  {
    id: '6',
    name: 'Tirathgarh Waterfall',
    category: 'landmark',
    location: 'Kanger Valley, Bastar',
    description: 'A stunning multi-tiered waterfall surrounded by lush forests. Perfect for nature lovers and photographers.',
    image: 'https://images.unsplash.com/photo-1475070929565-c985b496cb9f?w=800',
    rating: 4.7,
    distance: '270 km'
  }
];

export const categoryLabels: Record<HeritageSite['category'], string> = {
  'temple': 'Temples',
  'landmark': 'Landmarks',
  'food': 'Food Spots',
  'art-village': 'Art Villages'
};

export const categoryIcons: Record<HeritageSite['category'], string> = {
  'temple': 'Landmark',
  'landmark': 'Mountain',
  'food': 'UtensilsCrossed',
  'art-village': 'Palette'
};
