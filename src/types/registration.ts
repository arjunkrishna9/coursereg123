import { Course, Faculty, Slot } from '@/data/courses';

export interface SelectedCourse {
  course: Course;
  faculty: Faculty;
  slot: Slot;
}

export interface User {
  regNo: string;
  name: string;
  batch: string;
}

export interface SlotConflict {
  courseId: string;
  conflictingCourseId: string;
  slotCode: string;
}
