import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DEMO_CREDENTIALS } from '@/data/courses';
import { GraduationCap, Users, Key, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BatchSelectionProps {
  onSelectBatch: (batch: string) => void;
}

const batches = ['22', '23', '24', '25'];

export function BatchSelection({ onSelectBatch }: BatchSelectionProps) {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  const handleBatchClick = (batch: string) => {
    setSelectedBatch(batch);
  };

  const handleContinue = () => {
    if (selectedBatch) {
      onSelectBatch(selectedBatch);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary mb-6 shadow-lg">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            VIT Bhopal University
          </h1>
          <p className="text-lg text-muted-foreground">
            Course Registration System
          </p>
        </div>

        <Card className="border-0 shadow-card">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-display text-2xl">Select Your Batch</CardTitle>
            <CardDescription>Choose your admission year to proceed with registration</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {batches.map((batch) => (
                <button
                  key={batch}
                  onClick={() => handleBatchClick(batch)}
                  className={cn(
                    "relative p-6 rounded-xl border-2 transition-all duration-300 group",
                    selectedBatch === batch
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50 hover:bg-secondary/50"
                  )}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Users className={cn(
                      "h-8 w-8 transition-colors",
                      selectedBatch === batch ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    )} />
                    <span className={cn(
                      "font-display text-2xl font-bold",
                      selectedBatch === batch ? "text-primary" : "text-foreground"
                    )}>
                      20{batch}
                    </span>
                    <span className="text-xs text-muted-foreground">Batch</span>
                  </div>
                  {selectedBatch === batch && (
                    <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-primary animate-pulse-subtle" />
                  )}
                </button>
              ))}
            </div>

            {selectedBatch && (
              <div className="animate-slide-up">
                <div className="rounded-xl bg-secondary/50 border border-border p-5 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Key className="h-5 w-5 text-accent" />
                    <span className="font-semibold text-foreground">Demo Credentials for Batch 20{selectedBatch}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Registration No.</span>
                      <span className="font-mono font-medium text-foreground bg-background rounded px-2 py-1">
                        {DEMO_CREDENTIALS[selectedBatch].regNo}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Password</span>
                      <span className="font-mono font-medium text-foreground bg-background rounded px-2 py-1">
                        {DEMO_CREDENTIALS[selectedBatch].password}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Student Name</span>
                      <span className="font-medium text-foreground bg-background rounded px-2 py-1">
                        {DEMO_CREDENTIALS[selectedBatch].name}
                      </span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleContinue} 
                  className="w-full h-12 text-base gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  Continue to Login
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          This is a demo application for educational purposes only.
        </p>
      </div>
    </div>
  );
}
