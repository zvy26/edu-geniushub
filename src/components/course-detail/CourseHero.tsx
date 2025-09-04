// components/courses/CourseHeader.tsx
import { Star, Clock, BookOpen, BarChart3 } from "lucide-react"

interface CourseHeroProps {
  course: {
    title: string
    description: string
    rating: number
    ratingCount: number
    duration: string
    totalLessons: number
    level: string
  }
}

export default function CourseHero({ course }: CourseHeroProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
      <p className="text-gray-600 text-lg mb-6">{course.description}</p>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
          <span className="font-medium text-gray-700">
            {course.rating.toFixed(1)}
          </span>
          <span className="text-gray-500 ml-1">
            ({course.ratingCount} reviews)
          </span>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-500 mr-1" />
          <span className="text-gray-600">{course.duration}</span>
        </div>
        
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 text-gray-500 mr-1" />
          <span className="text-gray-600">
            {course.totalLessons} lessons
          </span>
        </div>
        
        <div className="flex items-center">
          <BarChart3 className="h-5 w-5 text-gray-500 mr-1" />
          <span className="text-gray-600 capitalize">{course.level}</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
          {course.level} Level
        </div>
      </div>
    </div>
  )
}