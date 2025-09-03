// app/courses/[id]/components/CourseDetailLoading.tsx
import { ChevronRight } from "lucide-react"

export default function CourseDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6 animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <ChevronRight className="h-4 w-4" />
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
        
        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>
              
              <div className="flex space-x-4 mb-6">
                <div className="h-6 bg-gray-300 rounded w-20"></div>
                <div className="h-6 bg-gray-300 rounded w-24"></div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
              </div>
              
              <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
              
              <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="animate-pulse">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-10 bg-gray-300 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}