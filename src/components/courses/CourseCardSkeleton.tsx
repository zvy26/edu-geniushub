// components/courses/CourseCardSkeleton.tsx
export default function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
      <div className="flex items-start p-5">
        {/* Image skeleton - matches the 64px size */}
        <div className="h-16 w-16 flex-shrink-0 mr-4 rounded-lg bg-gray-200 border border-gray-200"></div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            
            {/* Level badge skeleton */}
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>

          {/* Description skeleton */}
          <div className="mb-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>

          <div className="flex items-center justify-between mb-3">
            {/* Rating skeleton */}
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded mr-1"></div>
              <div className="h-4 bg-gray-200 rounded w-8 mr-1"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>

            {/* Duration skeleton */}
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded mr-1"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Lessons skeleton */}
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded mr-1"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>

            {/* Level skeleton */}
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded mr-1"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>

          {/* Button skeleton */}
          <div className="w-full h-10 bg-gray-200 rounded-lg mt-4"></div>
        </div>
      </div>
    </div>
  );
}