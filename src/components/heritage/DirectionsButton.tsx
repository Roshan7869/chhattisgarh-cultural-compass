import { Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openGoogleMapsLocation } from '@/lib/maps';

interface DirectionsButtonProps {
  coordinates: { lat: number; lng: number };
  label?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function DirectionsButton({ 
  coordinates, 
  label, 
  variant = 'outline',
  size = 'sm',
  className 
}: DirectionsButtonProps) {
  const handleClick = () => {
    openGoogleMapsLocation(coordinates, label);
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleClick}
      className={className}
    >
      <Navigation className="h-4 w-4 mr-1" />
      Directions
    </Button>
  );
}
