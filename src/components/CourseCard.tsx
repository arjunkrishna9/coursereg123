import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Course, Faculty, Slot } from '@/data/courses';
import { useRegistration } from '@/contexts/RegistrationContext';
import { ChevronDown, ChevronUp, BookOpen, FlaskConical, FolderKanban, AlertTriangle, Check, User, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const { selectedCourses, addCourse, getConflicts } = useRegistration();

  const isRegistered = selectedCourses.some(sc => sc.course.id === course.id);

  const getTypeIcon = () => {
    switch (course.type) {
      case 'Theory': return <BookOpen className="h-4 w-4" />;
      case 'Lab': return <FlaskConical className="h-4 w-4" />;
      case 'Project': return <FolderKanban className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (course.type) {
      case 'Theory': return 'bg-primary/10 text-primary border-primary/20';
      case 'Lab': return 'bg-success/10 text-success border-success/20';
      case 'Project': return 'bg-accent/10 text-accent border-accent/20';
    }
  };

  const handleAddCourse = () => {
    if (!selectedFaculty || !selectedSlot) {
      toast.error('Please select a faculty and slot');
      return;
    }

    const result = addCourse(course, selectedFaculty, selectedSlot);
    if (result.success) {
      toast.success(result.message);
      setSelectedFaculty(null);
      setSelectedSlot(null);
      setIsExpanded(false);
    } else {
      toast.error(result.message);
    }
  };

  const checkSlotConflict = (slotCode: string) => {
    return getConflicts(slotCode).length > 0;
  };

  return (
    <Card className={cn(
      "border transition-all duration-300",
      isRegistered && "border-success bg-success/5",
      !isRegistered && isExpanded && "shadow-lg border-primary/30"
    )}>
      <CardHeader 
        className="cursor-pointer hover:bg-secondary/30 transition-colors"
        onClick={() => !isRegistered && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-sm text-muted-foreground">{course.code}</span>
              <Badge variant="outline" className={cn("text-xs", getTypeColor())}>
                {getTypeIcon()}
                <span className="ml-1">{course.type}</span>
              </Badge>
            </div>
            <CardTitle className="text-lg font-display leading-tight">{course.name}</CardTitle>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="font-medium">{course.credits} Credits</span>
              <span>•</span>
              <span>{course.category}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isRegistered ? (
              <Badge className="bg-success text-success-foreground gap-1">
                <Check className="h-3 w-3" />
                Registered
              </Badge>
            ) : (
              <ChevronDown className={cn(
                "h-5 w-5 text-muted-foreground transition-transform",
                isExpanded && "rotate-180"
              )} />
            )}
          </div>
        </div>
      </CardHeader>

      {isExpanded && !isRegistered && (
        <CardContent className="pt-0 animate-slide-up">
          <div className="border-t border-border pt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Select Faculty & Slot
              </h4>
              <div className="space-y-3">
                {course.faculty.map((faculty) => (
                  <div 
                    key={faculty.id}
                    className={cn(
                      "rounded-lg border p-4 transition-all cursor-pointer",
                      selectedFaculty?.id === faculty.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => {
                      setSelectedFaculty(faculty);
                      setSelectedSlot(null);
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">{faculty.name}</span>
                      {selectedFaculty?.id === faculty.id && (
                        <Badge variant="outline" className="text-xs">Selected</Badge>
                      )}
                    </div>
                    
                    {selectedFaculty?.id === faculty.id && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {faculty.slots.map((slot) => {
                          const hasConflict = checkSlotConflict(slot.code);
                          return (
                            <button
                              key={slot.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!hasConflict) {
                                  setSelectedSlot(slot);
                                }
                              }}
                              disabled={hasConflict}
                              className={cn(
                                "flex items-center gap-2 p-3 rounded-md border text-left transition-all text-sm",
                                hasConflict && "opacity-50 cursor-not-allowed bg-destructive/5 border-destructive/30",
                                !hasConflict && selectedSlot?.id === slot.id && "border-primary bg-primary/10",
                                !hasConflict && selectedSlot?.id !== slot.id && "border-border hover:border-primary/50"
                              )}
                            >
                              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <div className="flex-1">
                                <div className="font-mono font-medium">{slot.code}</div>
                                <div className="text-xs text-muted-foreground">{slot.day} {slot.time}</div>
                              </div>
                              {hasConflict && (
                                <AlertTriangle className="h-4 w-4 text-destructive" />
                              )}
                              {!hasConflict && selectedSlot?.id === slot.id && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleAddCourse}
              disabled={!selectedFaculty || !selectedSlot}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              Add Course ({course.credits} Credits)
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
