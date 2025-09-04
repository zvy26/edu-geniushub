// types/lesson.ts
export interface Lesson {
  _id: string;
  title: string;
  description?: string;
  sectionId: string;
  type: 'video' | 'text' | 'quiz' | 'file';
  order: number;
  videoUrl?: string;
  textContent?: string;
  fileUrl?: string;
  fileName?: string;
  questions?: Question[]; // Yangi qo'shildi
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Question {
  _id: string;
  question: string;
  options: string[];
  order: number;
}