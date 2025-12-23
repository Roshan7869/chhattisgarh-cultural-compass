import { Home, Landmark, ShoppingBag, Car } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/heritage', icon: Landmark, label: 'Heritage' },
  { path: '/marketplace', icon: ShoppingBag, label: 'Shop' },
  { path: '/travel', icon: Car, label: 'Travel' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-inset-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "relative p-2 rounded-xl transition-all duration-300",
                isActive && "bg-primary/10"
              )}>
                <Icon className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  isActive && "scale-110"
                )} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </div>
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                isActive ? "opacity-100" : "opacity-70"
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
