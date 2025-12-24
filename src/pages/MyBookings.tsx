import { useState } from 'react';
import { Search, Ticket, Calendar, Clock, Users, MapPin, X, Navigation, Phone } from 'lucide-react';
import { BottomNav } from '@/components/layout/BottomNav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { travelPools } from '@/data/travelPools';
import { toast } from 'sonner';
import { openGoogleMapsDirections } from '@/lib/maps';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Booking {
  id: string;
  pool_id: string;
  user_name: string;
  user_phone: string;
  seats_booked: number;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  booking_status: string;
  created_at: string;
}

const MyBookings = () => {
  const [phone, setPhone] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleSearch = async () => {
    if (phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const { data, error } = await supabase
        .from('travel_pool_bookings')
        .select('*')
        .eq('user_phone', phone.trim())
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    try {
      const { error } = await supabase
        .from('travel_pool_bookings')
        .update({ booking_status: 'cancelled' })
        .eq('id', selectedBooking.id);

      if (error) throw error;

      setBookings(prev =>
        prev.map(b =>
          b.id === selectedBooking.id ? { ...b, booking_status: 'cancelled' } : b
        )
      );
      toast.success('Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    } finally {
      setCancelDialogOpen(false);
      setSelectedBooking(null);
    }
  };

  const getPoolDetails = (poolId: string) => {
    return travelPools.find(p => p.id === poolId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'completed':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-secondary/10 text-secondary';
      case 'pending':
        return 'bg-accent/10 text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-hero px-4 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <Ticket className="h-7 w-7 text-primary-foreground" />
          <h1 className="font-display text-3xl font-bold text-primary-foreground">
            My Bookings
          </h1>
        </div>
        <p className="text-primary-foreground/80 text-sm">
          View and manage your travel reservations
        </p>

        {/* Phone Search */}
        <div className="mt-6 flex gap-2">
          <div className="relative flex-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 bg-card/95 backdrop-blur-sm border-0 h-12 rounded-xl"
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={isLoading}
            className="h-12 px-6"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Bookings List */}
      <section className="px-4 py-6">
        {!hasSearched ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Ticket className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              Find Your Bookings
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Enter the phone number you used while booking to view your reservations
            </p>
          </div>
        ) : isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Ticket className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              No Bookings Found
            </h3>
            <p className="text-muted-foreground text-sm">
              No reservations found for this phone number
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found
            </p>
            {bookings.map((booking, index) => {
              const pool = getPoolDetails(booking.pool_id);
              const bookingDate = new Date(booking.created_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });

              return (
                <article
                  key={booking.id}
                  className="bg-card rounded-2xl p-4 shadow-soft animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {pool?.destination || 'Unknown Destination'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        from {pool?.from || 'Unknown'}
                      </p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(booking.booking_status)}>
                      {booking.booking_status}
                    </Badge>
                  </div>

                  {/* Details */}
                  {pool && (
                    <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(pool.date).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{pool.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        <span>{booking.seats_booked} seat(s)</span>
                      </div>
                    </div>
                  )}

                  {/* Payment & Amount */}
                  <div className="flex items-center justify-between py-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Badge className={getPaymentStatusColor(booking.payment_status)}>
                        {booking.payment_status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {booking.payment_method === 'pay_later' ? 'Pay Later' : 'Online'}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">₹{booking.total_amount}</p>
                      <p className="text-xs text-muted-foreground">Booked {bookingDate}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  {booking.booking_status === 'confirmed' && pool && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1.5"
                        onClick={() => openGoogleMapsDirections(pool.coordinates.from, pool.coordinates.to)}
                      >
                        <Navigation className="h-4 w-4" />
                        Directions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setCancelDialogOpen(true);
                        }}
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Cancel Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelBooking}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNav />
    </main>
  );
};

export default MyBookings;
