import { useState } from 'react';
import { Search, Filter, Landmark, Mountain, UtensilsCrossed, Palette } from 'lucide-react';
import { heritageSites, categoryLabels, type HeritageSite } from '@/data/heritage';
import { HeritageCard } from '@/components/heritage/HeritageCard';
import { BottomNav } from '@/components/layout/BottomNav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categoryIcons: Record<HeritageSite['category'], typeof Landmark> = {
  'temple': Landmark,
  'landmark': Mountain,
  'food': UtensilsCrossed,
  'art-village': Palette,
};

const categories: Array<{ key: HeritageSite['category'] | 'all'; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'temple', label: 'Temples' },
  { key: 'landmark', label: 'Landmarks' },
  { key: 'food', label: 'Food' },
  { key: 'art-village', label: 'Art Villages' },
];

const Heritage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HeritageSite['category'] | 'all'>('all');

  const filteredSites = heritageSites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          site.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || site.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-hero px-4 pt-12 pb-8">
        <h1 className="font-display text-3xl font-bold text-primary-foreground mb-2">
          Heritage Guide
        </h1>
        <p className="text-primary-foreground/80 text-sm">
          Discover the cultural treasures of Chhattisgarh
        </p>

        {/* Search */}
        <div className="relative mt-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search temples, landmarks, food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/95 backdrop-blur-sm border-0 h-12 rounded-xl"
          />
        </div>
      </header>

      {/* Categories */}
      <section className="px-4 py-4 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            const Icon = cat.key !== 'all' ? categoryIcons[cat.key] : Filter;
            return (
              <Button
                key={cat.key}
                variant={isSelected ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(cat.key)}
                className={cn(
                  "rounded-full px-4",
                  !isSelected && "bg-card hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4 mr-1.5" />
                {cat.label}
              </Button>
            );
          })}
        </div>
      </section>

      {/* Results */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-foreground">
            {selectedCategory === 'all' ? 'All Sites' : categoryLabels[selectedCategory]}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredSites.length} found
          </span>
        </div>

        {filteredSites.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredSites.map((site, index) => (
              <HeritageCard key={site.id} site={site} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Landmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No heritage sites found</p>
          </div>
        )}
      </section>

      <BottomNav />
    </main>
  );
};

export default Heritage;
