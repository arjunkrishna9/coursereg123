import { useRegistration } from '@/contexts/RegistrationContext';
import { Button } from '@/components/ui/button';
import { LogOut, GraduationCap, User } from 'lucide-react';

interface HeaderProps {
  onLogout?: () => void;
}

export function Header({ onLogout }: HeaderProps) {
  const { user, getTotalCredits, clearRegistration } = useRegistration();

  const handleLogout = () => {
    clearRegistration();
    onLogout?.();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold text-foreground">VIT Bhopal University</span>
            <span className="text-xs text-muted-foreground">Course Registration Portal</span>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 rounded-lg bg-secondary px-4 py-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground">({user.regNo})</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2">
              <span className="text-sm font-medium text-accent">
                {getTotalCredits()} / 27 Credits
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
