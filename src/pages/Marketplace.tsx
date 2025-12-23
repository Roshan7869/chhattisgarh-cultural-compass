import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, ShoppingBag } from 'lucide-react';
import { handicrafts, categoryLabels, type Handicraft } from '@/data/handicrafts';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { BottomNav } from '@/components/layout/BottomNav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories: Array<{ key: Handicraft['category'] | 'all'; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'dhokra', label: 'Dhokra' },
  { key: 'terracotta', label: 'Terracotta' },
  { key: 'bamboo', label: 'Bamboo' },
  { key: 'textile', label: 'Textiles' },
  { key: 'iron-craft', label: 'Iron Craft' },
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Handicraft['category'] | 'all'>('all');

  const filteredProducts = handicrafts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.artisan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-gold px-4 pt-12 pb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-display text-3xl font-bold text-accent-foreground">
            Marketplace
          </h1>
          <Button variant="ghost" size="icon" className="text-accent-foreground">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-accent-foreground/80 text-sm">
          Authentic handicrafts from local artisans
        </p>

        {/* Search */}
        <div className="relative mt-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search crafts, artisans..."
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
            return (
              <Button
                key={cat.key}
                variant={isSelected ? 'accent' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(cat.key)}
                className={cn(
                  "rounded-full px-4",
                  !isSelected && "bg-card hover:bg-muted"
                )}
              >
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
            {selectedCategory === 'all' ? 'Featured Crafts' : categoryLabels[selectedCategory]}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredProducts.length} products
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </section>

      {/* Artisan CTA */}
      <section className="px-4 py-8">
        <div className="bg-card rounded-2xl p-6 text-center shadow-soft">
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            Are you an artisan?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Join our platform to showcase and sell your traditional crafts
          </p>
          <Button variant="forest">
            Register as Artisan
          </Button>
        </div>
      </section>

      <BottomNav />
    </main>
  );
};

export default Marketplace;
