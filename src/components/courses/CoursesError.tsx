// components/courses/CoursesError.tsx
"use client"

interface CoursesErrorProps {
  refetch: () => void
}

export default function CoursesError({ refetch }: CoursesErrorProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white border border-gray-200 shadow-sm rounded-2xl p-8 text-center">
        <div className="bg-red-100 p-4 rounded-full inline-flex mb-4">
          <span className="text-red-600 text-xl">⚠️</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Courses</h2>
        <p className="text-gray-600 mb-6">Failed to load courses. Please try again.</p>
        <button
          onClick={() => refetch()}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}