import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SelectedCourse, User, SlotConflict } from '@/types/registration';
import { Course, Faculty, Slot, MAX_CREDITS } from '@/data/courses';

interface RegistrationContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  selectedCourses: SelectedCourse[];
  addCourse: (course: Course, faculty: Faculty, slot: Slot) => { success: boolean; message: string };
  removeCourse: (courseId: string) => void;
  getTotalCredits: () => number;
  getConflicts: (slotCode: string, excludeCourseId?: string) => SlotConflict[];
  clearRegistration: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);

  const parseSlotCodes = (slotCode: string): string[] => {
    return slotCode.split('+').map(s => s.trim());
  };

  const getTotalCredits = () => {
    return selectedCourses.reduce((total, sc) => total + sc.course.credits, 0);
  };

  const getConflicts = (slotCode: string, excludeCourseId?: string): SlotConflict[] => {
    const conflicts: SlotConflict[] = [];
    const newSlots = parseSlotCodes(slotCode);

    selectedCourses.forEach(sc => {
      if (excludeCourseId && sc.course.id === excludeCourseId) return;
      
      const existingSlots = parseSlotCodes(sc.slot.code);
      
      newSlots.forEach(newSlot => {
        if (existingSlots.includes(newSlot)) {
          conflicts.push({
            courseId: excludeCourseId || '',
            conflictingCourseId: sc.course.id,
            slotCode: newSlot
          });
        }
      });
    });

    return conflicts;
  };

  const addCourse = (course: Course, faculty: Faculty, slot: Slot): { success: boolean; message: string } => {
    // Check if course already selected
    const existingCourse = selectedCourses.find(sc => sc.course.id === course.id);
    if (existingCourse) {
      return { success: false, message: 'Course already registered' };
    }

    // Check credits
    const newTotal = getTotalCredits() + course.credits;
    if (newTotal > MAX_CREDITS) {
      return { success: false, message: `Cannot exceed ${MAX_CREDITS} credits. Current: ${getTotalCredits()}, Course: ${course.credits}` };
    }

    // Check conflicts
    const conflicts = getConflicts(slot.code);
    if (conflicts.length > 0) {
      const conflictingCourse = selectedCourses.find(sc => sc.course.id === conflicts[0].conflictingCourseId);
      return { 
        success: false, 
        message: `Slot conflict with ${conflictingCourse?.course.name} (${conflicts[0].slotCode})` 
      };
    }

    setSelectedCourses(prev => [...prev, { course, faculty, slot }]);
    return { success: true, message: 'Course added successfully' };
  };

  const removeCourse = (courseId: string) => {
    setSelectedCourses(prev => prev.filter(sc => sc.course.id !== courseId));
  };

  const clearRegistration = () => {
    setSelectedCourses([]);
    setUser(null);
  };

  return (
    <RegistrationContext.Provider value={{
      user,
      setUser,
      selectedCourses,
      addCourse,
      removeCourse,
      getTotalCredits,
      getConflicts,
      clearRegistration
    }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
}
