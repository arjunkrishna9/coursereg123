import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRegistration } from '@/contexts/RegistrationContext';
import { SLOT_TIMINGS } from '@/data/courses';
import { CheckCircle, ArrowLeft, Download, Calendar, User, BookOpen, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface ConfirmationPageProps {
  onBack: () => void;
  onLogout: () => void;
}

export function ConfirmationPage({ onBack, onLogout }: ConfirmationPageProps) {
  const { user, selectedCourses, getTotalCredits } = useRegistration();
  const totalCredits = getTotalCredits();

  const handleDownload = () => {
    toast.success('Registration details downloaded successfully!');
  };

  const handleFinalSubmit = () => {
    toast.success('Registration confirmed! Thank you for registering.');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-foreground">Registration Confirmation</h1>
              <p className="text-xs text-muted-foreground">VIT Bhopal University</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="container px-4 md:px-6 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to course selection</span>
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-success/10 mb-4">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Review Your Registration
            </h1>
            <p className="text-muted-foreground">
              Please review your course selections before final submission
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card className="border-0 shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-primary" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registration No.</span>
                  <span className="font-mono font-medium">{user?.regNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Batch</span>
                  <span className="font-medium">20{user?.batch}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Registration Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Courses</span>
                  <span className="font-medium">{selectedCourses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Credits</span>
                  <span className="font-medium">{totalCredits} / 27</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Selected Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCourses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No courses selected</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedCourses.map((sc, index) => (
                    <div
                      key={sc.course.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
                    >
                      <div className="flex-1 mb-3 md:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground">
                            {index + 1}.
                          </span>
                          <span className="font-mono text-sm text-primary">
                            {sc.course.code}
                          </span>
                        </div>
                        <h4 className="font-medium text-foreground">{sc.course.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Faculty: {sc.faculty.name}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{sc.slot.code}</span>
                          <span className="text-muted-foreground">
                            ({SLOT_TIMINGS[sc.slot.code] || sc.slot.code})
                          </span>
                        </div>
                        <div className="px-2 py-1 rounded bg-primary/10 text-primary font-medium">
                          {sc.course.credits} Credits
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={handleDownload}
            >
              <Download className="h-5 w-5" />
              Download Details
            </Button>
            <Button
              size="lg"
              className="gap-2 bg-gradient-primary hover:opacity-90"
              onClick={handleFinalSubmit}
              disabled={selectedCourses.length === 0}
            >
              <CheckCircle className="h-5 w-5" />
              Confirm Registration
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
