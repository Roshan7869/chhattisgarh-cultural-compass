import { useState } from 'react';
import { TravelPool, vehicleLabels } from '@/data/travelPools';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Minus, Plus, CreditCard, Wallet, Navigation, Calendar, Clock, Car, CheckCircle } from 'lucide-react';
import { openGoogleMapsDirections } from '@/lib/maps';

interface BookingDialogProps {
  pool: TravelPool;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingDialog({ pool, open, onOpenChange }: BookingDialogProps) {
  const [step, setStep] = useState<'seats' | 'details' | 'payment' | 'success'>('seats');
  const [seats, setSeats] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'pay_later'>('pay_later');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = seats * pool.pricePerSeat;

  const handleSeatChange = (delta: number) => {
    const newSeats = seats + delta;
    if (newSeats >= 1 && newSeats <= pool.seatsAvailable) {
      setSeats(newSeats);
    }
  };

  const handleSubmitBooking = async () => {
    if (!name.trim() || !phone.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      // If online payment selected, redirect to Stripe checkout (to be implemented)
      if (paymentMethod === 'online') {
        // TODO: Integrate Stripe checkout here
        // For now, create booking with pending payment status
        const { error } = await supabase
          .from('travel_pool_bookings')
          .insert({
            pool_id: pool.id,
            user_name: name.trim(),
            user_phone: phone.trim(),
            user_email: email.trim() || null,
            seats_booked: seats,
            total_amount: totalAmount,
            payment_method: 'online',
            payment_status: 'pending',
          });

        if (error) throw error;

        toast.info('Online payments coming soon! Booking saved as pending.');
        setStep('success');
        return;
      }

      const { error } = await supabase
        .from('travel_pool_bookings')
        .insert({
          pool_id: pool.id,
          user_name: name.trim(),
          user_phone: phone.trim(),
          user_email: email.trim() || null,
          seats_booked: seats,
          total_amount: totalAmount,
          payment_method: paymentMethod,
          payment_status: 'pending',
        });

      if (error) throw error;

      setStep('success');
      toast.success('Booking confirmed!');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('seats');
    setSeats(1);
    setName('');
    setPhone('');
    setEmail('');
    setPaymentMethod('pay_later');
    onOpenChange(false);
  };

  const handleGetDirections = () => {
    openGoogleMapsDirections(pool.coordinates.from, pool.coordinates.to);
  };

  const formattedDate = new Date(pool.date).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {step === 'success' ? 'Booking Confirmed!' : 'Book Your Ride'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {pool.from} → {pool.destination}
          </DialogDescription>
        </DialogHeader>

        {step === 'seats' && (
          <div className="space-y-6">
            {/* Trip Info */}
            <div className="bg-muted/50 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span>{pool.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Car className="h-4 w-4 text-primary" />
                <span>{vehicleLabels[pool.vehicleType]}</span>
              </div>
            </div>

            {/* Seat Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Select Seats</Label>
              <div className="flex items-center justify-center gap-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleSeatChange(-1)}
                  disabled={seats <= 1}
                  className="h-12 w-12 rounded-full"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary">{seats}</span>
                  <p className="text-sm text-muted-foreground">
                    of {pool.seatsAvailable} available
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleSeatChange(1)}
                  disabled={seats >= pool.seatsAvailable}
                  className="h-12 w-12 rounded-full"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-primary/5 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">₹{pool.pricePerSeat} × {seats} seat(s)</span>
                <span className="text-2xl font-bold text-foreground">₹{totalAmount}</span>
              </div>
            </div>

            <Button onClick={() => setStep('details')} className="w-full" size="lg">
              Continue
            </Button>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep('seats')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setStep('payment')} 
                className="flex-1"
                disabled={!name.trim() || !phone.trim()}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Payment Method</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as 'online' | 'pay_later')}
                className="space-y-3"
              >
                <label 
                  htmlFor="pay_later"
                  className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'pay_later' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <RadioGroupItem value="pay_later" id="pay_later" />
                  <Wallet className="h-5 w-5 text-secondary" />
                  <div className="flex-1">
                    <p className="font-medium">Pay Later (Cash)</p>
                    <p className="text-sm text-muted-foreground">Pay to host when you meet</p>
                  </div>
                </label>

                <label 
                  htmlFor="online"
                  className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <RadioGroupItem value="online" id="online" />
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">Pay Online</p>
                    <p className="text-sm text-muted-foreground">Secure payment via Stripe</p>
                  </div>
                </label>
              </RadioGroup>
            </div>

            {/* Summary */}
            <div className="bg-muted/50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Seats</span>
                <span>{seats}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment</span>
                <span>{paymentMethod === 'pay_later' ? 'Pay Later' : 'Online'}</span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-bold text-primary">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep('details')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleSubmitBooking} 
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-secondary" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold">Thank you, {name}!</h3>
              <p className="text-muted-foreground text-sm">
                Your booking for {seats} seat(s) to {pool.destination} is confirmed.
              </p>
              <p className="text-sm">
                {paymentMethod === 'pay_later' && (
                  <span className="text-primary font-medium">Pay ₹{totalAmount} to the host</span>
                )}
              </p>
            </div>

            <div className="space-y-3">
              <Button onClick={handleGetDirections} variant="outline" className="w-full gap-2">
                <Navigation className="h-4 w-4" />
                Get Directions
              </Button>
              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
