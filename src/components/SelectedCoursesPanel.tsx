import { useRegistration } from '@/contexts/RegistrationContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, BookOpen, FlaskConical, FolderKanban, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MAX_CREDITS } from '@/data/courses';
import { toast } from 'sonner';

interface SelectedCoursesPanelProps {
  onProceedToConfirmation: () => void;
}

export function SelectedCoursesPanel({ onProceedToConfirmation }: SelectedCoursesPanelProps) {
  const { selectedCourses, removeCourse, getTotalCredits } = useRegistration();
  const totalCredits = getTotalCredits();
  const creditPercentage = (totalCredits / MAX_CREDITS) * 100;

  const handleRemove = (courseId: string, courseName: string) => {
    removeCourse(courseId);
    toast.info(`Removed ${courseName}`);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Theory': return <BookOpen className="h-3 w-3" />;
      case 'Lab': return <FlaskConical className="h-3 w-3" />;
      case 'Project': return <FolderKanban className="h-3 w-3" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Theory': return 'bg-primary/10 text-primary';
      case 'Lab': return 'bg-success/10 text-success';
      case 'Project': return 'bg-accent/10 text-accent';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft h-fit sticky top-20">
      <div className="p-4 border-b border-border">
        <h3 className="font-display text-lg font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-success" />
          Selected Courses
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {selectedCourses.length} course{selectedCourses.length !== 1 ? 's' : ''} selected
        </p>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Credit Progress</span>
          <span className="text-sm font-bold text-primary">{totalCredits} / {MAX_CREDITS}</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-500 rounded-full",
              creditPercentage > 90 ? "bg-warning" : "bg-gradient-accent"
            )}
            style={{ width: `${Math.min(creditPercentage, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {MAX_CREDITS - totalCredits} credits remaining
        </p>
      </div>

      <ScrollArea className="max-h-[400px]">
        <div className="p-2 space-y-2">
          {selectedCourses.length === 0 ? (
            <div className="text-center py-8 px-4">
              <div className="h-12 w-12 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No courses selected yet</p>
              <p className="text-xs text-muted-foreground mt-1">Browse and add courses from the list</p>
            </div>
          ) : (
            selectedCourses.map((sc) => (
              <div 
                key={sc.course.id}
                className="group p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={cn("text-xs px-1.5 py-0", getTypeColor(sc.course.type))}>
                        {getTypeIcon(sc.course.type)}
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">{sc.course.code}</span>
                    </div>
                    <p className="text-sm font-medium truncate">{sc.course.name}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                      <span>{sc.faculty.name}</span>
                      <span>•</span>
                      <span className="font-mono">{sc.slot.code}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {sc.course.credits}cr
                    </Badge>
                    <button
                      onClick={() => handleRemove(sc.course.id, sc.course.name)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-all"
                    >
                      <X className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {selectedCourses.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button 
            className="w-full bg-gradient-primary hover:opacity-90"
            onClick={onProceedToConfirmation}
          >
            Proceed to Confirmation
          </Button>
        </div>
      )}
    </div>
  );
}
