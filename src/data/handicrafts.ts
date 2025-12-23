export interface Handicraft {
  id: string;
  name: string;
  artisan: string;
  village: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'dhokra' | 'terracotta' | 'bamboo' | 'textile' | 'iron-craft';
  rating: number;
  verified: boolean;
}

export const handicrafts: Handicraft[] = [
  {
    id: '1',
    name: 'Dhokra Elephant Figurine',
    artisan: 'Ramesh Gond',
    village: 'Kondagaon',
    price: 2500,
    originalPrice: 3000,
    image: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800',
    category: 'dhokra',
    rating: 4.9,
    verified: true
  },
  {
    id: '2',
    name: 'Terracotta Horse',
    artisan: 'Lakshmi Bai',
    village: 'Pandripani',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
    category: 'terracotta',
    rating: 4.7,
    verified: true
  },
  {
    id: '3',
    name: 'Bamboo Wall Hanging',
    artisan: 'Suresh Korwa',
    village: 'Sarguja',
    price: 950,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800',
    category: 'bamboo',
    rating: 4.5,
    verified: true
  },
  {
    id: '4',
    name: 'Kosa Silk Saree',
    artisan: 'Meena Devi',
    village: 'Champa',
    price: 8500,
    originalPrice: 10000,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800',
    category: 'textile',
    rating: 4.8,
    verified: true
  },
  {
    id: '5',
    name: 'Iron Craft Diya Set',
    artisan: 'Birju Lohar',
    village: 'Raigarh',
    price: 650,
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
    category: 'iron-craft',
    rating: 4.6,
    verified: true
  },
  {
    id: '6',
    name: 'Dhokra Dancing Bastar',
    artisan: 'Ganesh Gond',
    village: 'Kondagaon',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800',
    category: 'dhokra',
    rating: 4.9,
    verified: true
  }
];

export const categoryLabels: Record<Handicraft['category'], string> = {
  'dhokra': 'Dhokra Art',
  'terracotta': 'Terracotta',
  'bamboo': 'Bamboo Craft',
  'textile': 'Textiles',
  'iron-craft': 'Iron Craft'
};
