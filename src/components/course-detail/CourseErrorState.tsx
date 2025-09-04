// components/courses/CourseErrorState.tsx
import Link from "next/link"

export default function CourseErrorState() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white border border-gray-200 shadow-sm rounded-2xl p-8 text-center">
        <div className="bg-red-100 p-4 rounded-full inline-flex mb-4">
          <span className="text-red-600 text-xl">⚠️</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Course Not Found</h2>
        <p className="text-gray-600 mb-6">The course you are looking for does not exist or may have been removed.</p>
        <Link
          href="/courses"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors inline-block"
        >
          Back to Courses
        </Link>
      </div>
    </div>
  )
}