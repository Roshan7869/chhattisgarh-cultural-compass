import { Star, BadgeCheck, ShoppingCart } from 'lucide-react';
import { Handicraft, categoryLabels } from '@/data/handicrafts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Handicraft;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <article 
      className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {product.originalPrice && (
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </Badge>
        )}
        
        <Button 
          size="icon" 
          variant="secondary"
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <Badge variant="outline" className="mb-2 text-xs">
          {categoryLabels[product.category]}
        </Badge>
        
        <h3 className="font-display text-base font-semibold text-foreground mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span className="line-clamp-1">{product.artisan}</span>
          {product.verified && (
            <BadgeCheck className="h-4 w-4 text-secondary flex-shrink-0" />
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-accent fill-accent" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
