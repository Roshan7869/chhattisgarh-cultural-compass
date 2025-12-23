import { MapPin, Star, Navigation } from 'lucide-react';
import { HeritageSite, categoryLabels } from '@/data/heritage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeritageCardProps {
  site: HeritageSite;
  index: number;
}

const categoryColors: Record<HeritageSite['category'], string> = {
  'temple': 'bg-primary/10 text-primary border-primary/20',
  'landmark': 'bg-secondary/10 text-secondary border-secondary/20',
  'food': 'bg-accent/10 text-accent-foreground border-accent/20',
  'art-village': 'bg-primary/10 text-primary border-primary/20',
};

export function HeritageCard({ site, index }: HeritageCardProps) {
  return (
    <article 
      className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={site.image}
          alt={site.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <Badge 
          variant="outline" 
          className={cn(
            "absolute top-3 left-3 backdrop-blur-sm border",
            categoryColors[site.category]
          )}
        >
          {categoryLabels[site.category]}
        </Badge>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="h-3.5 w-3.5 text-accent fill-accent" />
          <span className="text-sm font-medium">{site.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-1">
          {site.name}
        </h3>
        
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
          <MapPin className="h-3.5 w-3.5" />
          <span className="line-clamp-1">{site.location}</span>
          <span className="text-primary font-medium ml-auto">{site.distance}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {site.description}
        </p>
        
        <Button variant="outline" size="sm" className="w-full group/btn">
          <Navigation className="h-4 w-4 mr-2 transition-transform group-hover/btn:rotate-45" />
          Navigate
        </Button>
      </div>
    </article>
  );
}
