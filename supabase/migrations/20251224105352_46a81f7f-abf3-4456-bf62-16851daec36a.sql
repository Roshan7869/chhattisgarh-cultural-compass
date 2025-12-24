-- Create travel pool bookings table
CREATE TABLE public.travel_pool_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pool_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  user_email TEXT,
  seats_booked INTEGER NOT NULL DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('online', 'pay_later')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'cancelled')),
  booking_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (booking_status IN ('confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.travel_pool_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no auth required for MVP)
CREATE POLICY "Anyone can create bookings" 
ON public.travel_pool_bookings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view their bookings by phone" 
ON public.travel_pool_bookings 
FOR SELECT 
USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_travel_pool_bookings_updated_at
BEFORE UPDATE ON public.travel_pool_bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();