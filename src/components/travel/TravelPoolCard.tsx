import { useState } from 'react';
import { Calendar, Clock, Users, Star, Car, Navigation } from 'lucide-react';
import { TravelPool, vehicleLabels } from '@/data/travelPools';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookingDialog } from './BookingDialog';
import { openGoogleMapsDirections } from '@/lib/maps';

interface TravelPoolCardProps {
  pool: TravelPool;
  index: number;
}

export function TravelPoolCard({ pool, index }: TravelPoolCardProps) {
  const [bookingOpen, setBookingOpen] = useState(false);

  const formattedDate = new Date(pool.date).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const handleDirections = () => {
    openGoogleMapsDirections(pool.coordinates.from, pool.coordinates.to);
  };

  return (
    <>
      <article 
        className="bg-card rounded-2xl p-4 shadow-soft hover:shadow-elevated transition-all duration-500 animate-fade-in"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Route */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex flex-col items-center gap-1 mt-1">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <div className="w-0.5 h-8 bg-border" />
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{pool.from}</p>
            <p className="font-display text-lg font-semibold text-foreground mt-2">
              {pool.destination}
            </p>
          </div>
          <Badge variant="outline" className="flex-shrink-0">
            <Car className="h-3 w-3 mr-1" />
            {vehicleLabels[pool.vehicleType]}
          </Badge>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{pool.time}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Users className="h-4 w-4" />
            <span className="text-foreground font-medium">
              {pool.seatsAvailable}/{pool.totalSeats}
            </span>
          </div>
        </div>

        {/* Host & Price */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={pool.host.avatar} alt={pool.host.name} />
              <AvatarFallback>{pool.host.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">{pool.host.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 text-accent fill-accent" />
                  {pool.host.rating}
                </span>
                <span>•</span>
                <span>{pool.host.trips} trips</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">
              ₹{pool.pricePerSeat}
            </p>
            <p className="text-xs text-muted-foreground">per seat</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={handleDirections} className="gap-1.5">
            <Navigation className="h-4 w-4" />
            Route
          </Button>
          <Button variant="hero" className="flex-1" onClick={() => setBookingOpen(true)}>
            Book Seat
          </Button>
        </div>
      </article>

      <BookingDialog 
        pool={pool} 
        open={bookingOpen} 
        onOpenChange={setBookingOpen} 
      />
    </>
  );
}
