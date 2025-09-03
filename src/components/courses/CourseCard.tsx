import Image from "next/image"
import Link from "next/link"
import { Star, Clock, BookOpen, BarChart3 } from "lucide-react"
import { Course } from "@/types/courses"

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex items-start p-5">
        {/* Smaller image/icon */}
        <div className="relative h-16 w-16 flex-shrink-0 mr-4 rounded-lg overflow-hidden border border-gray-200">
          <Image
            src={course.picture ? `https://dead.uz${course.picture}` : "/images/course-placeholder.jpg"}
            alt={course.title || "Course"}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 pr-2">
              {course.title}
            </h3>
            
            <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
              {course.level}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="text-sm font-medium text-gray-700">
                {course.rating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                ({course.ratingCount})
              </span>
            </div>

            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">{course.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">
                {course.totalLessons} lessons
              </span>
            </div>

            <div className="flex items-center">
              <BarChart3 className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600 capitalize">{course.level}</span>
            </div>
          </div>

          {/* Link qo'shildi - course detailga o'tish uchun */}
          <Link href={`/courses/${course._id}`} className="block w-full mt-4">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              View Course Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}