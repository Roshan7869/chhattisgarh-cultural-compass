import { useState } from 'react';
import { Search, Plus, Calendar, Car, MapPin } from 'lucide-react';
import { travelPools } from '@/data/travelPools';
import { TravelPoolCard } from '@/components/travel/TravelPoolCard';
import { BottomNav } from '@/components/layout/BottomNav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const TravelPool = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPools = travelPools.filter(pool => {
    const matchesSearch = pool.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pool.from.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-forest px-4 pt-12 pb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-display text-3xl font-bold text-secondary-foreground">
            Travel Pool
          </h1>
          <Button variant="accent" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Create
          </Button>
        </div>
        <p className="text-secondary-foreground/80 text-sm">
          Share rides to heritage destinations
        </p>

        {/* Search */}
        <div className="relative mt-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/95 backdrop-blur-sm border-0 h-12 rounded-xl"
          />
        </div>
      </header>

      {/* Quick Stats */}
      <section className="px-4 -mt-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-xl p-4 text-center shadow-soft">
            <Car className="h-5 w-5 mx-auto text-primary mb-1" />
            <p className="text-lg font-bold text-foreground">{travelPools.length}</p>
            <p className="text-xs text-muted-foreground">Active Pools</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-soft">
            <Calendar className="h-5 w-5 mx-auto text-secondary mb-1" />
            <p className="text-lg font-bold text-foreground">7</p>
            <p className="text-xs text-muted-foreground">This Week</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-soft">
            <MapPin className="h-5 w-5 mx-auto text-accent mb-1" />
            <p className="text-lg font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Destinations</p>
          </div>
        </div>
      </section>

      {/* Available Pools */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Available Rides
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredPools.length} rides
          </span>
        </div>

        {filteredPools.length > 0 ? (
          <div className="space-y-4">
            {filteredPools.map((pool, index) => (
              <TravelPoolCard key={pool.id} pool={pool} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No rides found</p>
          </div>
        )}
      </section>

      {/* Create Pool CTA */}
      <section className="px-4 pb-8">
        <div className="gradient-hero rounded-2xl p-6 text-center shadow-elevated">
          <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">
            Heading somewhere?
          </h3>
          <p className="text-primary-foreground/80 text-sm mb-4">
            Create a travel pool and save costs while making new friends
          </p>
          <Button variant="accent" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Create Your Pool
          </Button>
        </div>
      </section>

      <BottomNav />
    </main>
  );
};

export default TravelPool;
