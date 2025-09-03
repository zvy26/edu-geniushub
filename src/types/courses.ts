// src/types/courses.ts

export interface Course {
  _id: string;
  title: string;
  description: string;
  rating: number;
  duration: string;
  totalLessons: number;
  level: string;
  picture: string;
  ratingCount: number;
  totalRating?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CourseFilters {
  search?: string;
  level?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CourseProgress {
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  lastAccessed?: string;
}

export interface Instructor {
  _id: string;
  name: string;
  bio?: string;
  avatar?: string;
}

export interface CourseLesson {
  _id: string;
  title: string;
  duration: string;
  order: number;
  isCompleted?: boolean;
  videoUrl?: string;
}

export interface CourseSection {
  _id: string;
  title: string;
  description?: string;
  duration?: string;
  order: number;
  videoUrl?: string;
  isCompleted?: boolean;
}

export interface CourseUnit {
  _id: string;
  title: string;
  description: string;
  order: number;
  sections: CourseSection[];
  courseId: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CourseDetail extends Course {
  longDescription?: string;
  syllabus?: string;
  prerequisites?: string[];
  instructor?: Instructor;
  units: CourseUnit[];
  progress?: CourseProgress;
}