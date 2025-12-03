import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DEMO_CREDENTIALS } from '@/data/courses';
import { useRegistration } from '@/contexts/RegistrationContext';
import { GraduationCap, ArrowLeft, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface LoginFormProps {
  batch: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function LoginForm({ batch, onBack, onSuccess }: LoginFormProps) {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useRegistration();

  const demoCredential = DEMO_CREDENTIALS[batch];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (regNo.toUpperCase() === demoCredential.regNo && password === demoCredential.password) {
      setUser({
        regNo: demoCredential.regNo,
        name: demoCredential.name,
        batch
      });
      toast.success(`Welcome, ${demoCredential.name}!`);
      onSuccess();
    } else {
      setError('Invalid registration number or password');
      toast.error('Login failed. Please check your credentials.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to batch selection</span>
        </button>

        <Card className="border-0 shadow-card">
          <CardHeader className="text-center pb-2">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary mx-auto mb-4 shadow-lg">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">Student Login</CardTitle>
            <CardDescription>
              Batch 20{batch} - Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="regNo">Registration Number</Label>
                <Input
                  id="regNo"
                  type="text"
                  placeholder={demoCredential.regNo}
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  className="h-12"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg p-3">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 text-base gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
                disabled={isLoading || !regNo || !password}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Demo Credentials</p>
                <div className="bg-secondary/50 rounded-lg p-3 text-sm">
                  <p className="font-mono">
                    <span className="text-muted-foreground">Reg No:</span>{' '}
                    <span className="font-medium">{demoCredential.regNo}</span>
                  </p>
                  <p className="font-mono">
                    <span className="text-muted-foreground">Password:</span>{' '}
                    <span className="font-medium">{demoCredential.password}</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
