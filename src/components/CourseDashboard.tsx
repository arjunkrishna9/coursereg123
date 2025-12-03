import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { CourseCard } from '@/components/CourseCard';
import { CourseFilters } from '@/components/CourseFilters';
import { SelectedCoursesPanel } from '@/components/SelectedCoursesPanel';
import { courses } from '@/data/courses';
import { useRegistration } from '@/contexts/RegistrationContext';
import { BookOpen, Package } from 'lucide-react';

interface CourseDashboardProps {
  onLogout: () => void;
  onProceedToConfirmation: () => void;
}

export function CourseDashboard({ onLogout, onProceedToConfirmation }: CourseDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { selectedCourses } = useRegistration();

  const categories = useMemo(() => {
    return [...new Set(courses.map(c => c.category))];
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType || course.type === selectedType;
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchQuery, selectedType, selectedCategory]);

  const registeredCount = selectedCourses.length;
  const availableCount = filteredCourses.length;

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={onLogout} />
      
      <main className="container px-4 md:px-6 py-6">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Course Registration
          </h1>
          <p className="text-muted-foreground">
            Browse and select your courses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CourseFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>Showing {availableCount} course{availableCount !== 1 ? 's' : ''}</span>
              </div>
              {registeredCount > 0 && (
                <div className="flex items-center gap-2 text-sm text-success">
                  <BookOpen className="h-4 w-4" />
                  <span>{registeredCount} registered</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <SelectedCoursesPanel onProceedToConfirmation={onProceedToConfirmation} />
          </div>
        </div>
      </main>
    </div>
  );
}
