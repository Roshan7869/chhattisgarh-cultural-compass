export interface TravelPool {
  id: string;
  destination: string;
  from: string;
  date: string;
  time: string;
  seatsAvailable: number;
  totalSeats: number;
  pricePerSeat: number;
  host: {
    name: string;
    avatar: string;
    rating: number;
    trips: number;
  };
  vehicleType: 'car' | 'suv' | 'tempo';
  coordinates: {
    from: { lat: number; lng: number };
    to: { lat: number; lng: number };
  };
}

export const travelPools: TravelPool[] = [
  {
    id: '1',
    destination: 'Chitrakote Falls',
    from: 'Raipur',
    date: '2024-01-15',
    time: '06:00 AM',
    seatsAvailable: 3,
    totalSeats: 4,
    pricePerSeat: 800,
    host: {
      name: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      rating: 4.8,
      trips: 24
    },
    vehicleType: 'suv',
    coordinates: {
      from: { lat: 21.2514, lng: 81.6296 },
      to: { lat: 19.2033, lng: 81.7040 }
    }
  },
  {
    id: '2',
    destination: 'Bhoramdeo Temple',
    from: 'Raipur',
    date: '2024-01-16',
    time: '07:30 AM',
    seatsAvailable: 2,
    totalSeats: 3,
    pricePerSeat: 450,
    host: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      rating: 4.9,
      trips: 38
    },
    vehicleType: 'car',
    coordinates: {
      from: { lat: 21.2514, lng: 81.6296 },
      to: { lat: 22.1208, lng: 81.0494 }
    }
  },
  {
    id: '3',
    destination: 'Kondagaon Art Village',
    from: 'Jagdalpur',
    date: '2024-01-17',
    time: '08:00 AM',
    seatsAvailable: 5,
    totalSeats: 8,
    pricePerSeat: 350,
    host: {
      name: 'Rajesh Patel',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      rating: 4.7,
      trips: 15
    },
    vehicleType: 'tempo',
    coordinates: {
      from: { lat: 19.0748, lng: 82.0194 },
      to: { lat: 19.5976, lng: 81.6588 }
    }
  },
  {
    id: '4',
    destination: 'Tirathgarh Waterfall',
    from: 'Raipur',
    date: '2024-01-18',
    time: '05:30 AM',
    seatsAvailable: 4,
    totalSeats: 6,
    pricePerSeat: 650,
    host: {
      name: 'Amit Kumar',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      rating: 4.6,
      trips: 42
    },
    vehicleType: 'suv',
    coordinates: {
      from: { lat: 21.2514, lng: 81.6296 },
      to: { lat: 18.9874, lng: 81.9486 }
    }
  }
];

export const vehicleLabels: Record<TravelPool['vehicleType'], string> = {
  'car': 'Sedan',
  'suv': 'SUV',
  'tempo': 'Tempo Traveller'
};
