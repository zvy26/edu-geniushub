// components/courses/CoursesLoading.tsx
import CourseCardSkeleton from "./CourseCardSkeleton";

export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-6 flex gap-12 justify-between">
          <div className="h-6 bg-gray-200 rounded w-72 mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-28 animate-pulse"></div>
        </div>

        {/* Course cards skeleton grid - matches your layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(6)].map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}