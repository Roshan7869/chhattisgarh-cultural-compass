import { Landmark, ShoppingBag, Car, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/BottomNav';
import heroBg from '@/assets/hero-bg.jpg';

const features = [
  {
    icon: Landmark,
    title: 'Heritage Guide',
    description: 'Discover temples, landmarks, food spots & art villages',
    path: '/heritage',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: ShoppingBag,
    title: 'Marketplace',
    description: 'Buy authentic handicrafts from verified artisans',
    path: '/marketplace',
    color: 'bg-accent/10 text-accent-foreground',
  },
  {
    icon: Car,
    title: 'Travel Pool',
    description: 'Share rides to heritage destinations',
    path: '/travel',
    color: 'bg-secondary/10 text-secondary',
  },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={heroBg}
          alt="Chhattisgarh cultural heritage"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/50 to-background" />
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground mb-4 animate-fade-in">
            SANSKRITI
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 font-light max-w-md animate-fade-in" style={{ animationDelay: '100ms' }}>
            The Pulse of Chhattisgarh
          </p>
          <p className="text-base text-primary-foreground/80 mt-4 max-w-sm animate-fade-in" style={{ animationDelay: '200ms' }}>
            Discover, preserve, and celebrate the rich cultural heritage of Chhattisgarh
          </p>
          
          <div className="flex items-center gap-2 mt-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-primary-foreground/80 text-sm">Raipur, Chhattisgarh</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 -mt-12 relative z-10">
        <div className="max-w-lg mx-auto space-y-4">
          {features.map((feature, index) => (
            <Link
              key={feature.path}
              to={feature.path}
              className="block animate-slide-up"
              style={{ animationDelay: `${index * 100 + 400}ms` }}
            >
              <article className="bg-card rounded-2xl p-5 shadow-elevated hover:shadow-glow transition-all duration-500 group">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${feature.color} transition-transform duration-300 group-hover:scale-110`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-lg font-semibold text-foreground mb-1">
                      {feature.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 mt-2" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="px-6 py-12 text-center animate-fade-in" style={{ animationDelay: '700ms' }}>
        <blockquote className="max-w-md mx-auto">
          <p className="font-display text-lg text-foreground italic">
            "Where ancient temples whisper stories and tribal art dances with tradition"
          </p>
          <footer className="mt-3 text-sm text-muted-foreground">
            — Celebrating Chhattisgarhi Heritage
          </footer>
        </blockquote>
      </section>

      {/* CTA Section */}
      <section className="px-6 animate-fade-in" style={{ animationDelay: '800ms' }}>
        <div className="max-w-lg mx-auto gradient-forest rounded-2xl p-6 text-center shadow-elevated">
          <h3 className="font-display text-xl font-semibold text-secondary-foreground mb-2">
            Start Your Journey
          </h3>
          <p className="text-secondary-foreground/80 text-sm mb-4">
            Explore the hidden gems of Chhattisgarh's rich cultural landscape
          </p>
          <Button variant="accent" size="lg" asChild>
            <Link to="/heritage">
              Explore Heritage Sites
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <BottomNav />
    </main>
  );
};

export default Index;
