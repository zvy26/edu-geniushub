// app/courses/[id]/page.tsx
"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  Star, 
  Clock, 
  BookOpen, 
  BarChart3, 
  Users, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Award, 
  Calendar, 
  MessageCircle,
  ArrowLeft,
  User
} from "lucide-react"
import { useCourseDetailQuery } from "@/api/queries/courses"

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  
  const { data: course, isLoading, error } = useCourseDetailQuery(courseId)

  if (isLoading) {
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

  if (error || !course) {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/courses" className="hover:text-blue-600 transition-colors flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Courses
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-800 font-medium">{course.title}</span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Course Header */}
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
            
            {/* Instructor Section */}
            {course.instructor && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructor</h2>
                <div className="flex items-center">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                    {course.instructor.avatar ? (
                      <Image
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{course.instructor.name}</h3>
                    {course.instructor.bio && (
                      <p className="text-gray-600 text-sm mt-1">{course.instructor.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
              
              {course.units && course.units.length > 0 ? (
                <div className="space-y-4">
                  {course.units.map((unit, index) => (
                    <div key={unit._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-800">
                          {index + 1}. {unit.title}
                        </h3>
                        <span className="text-sm text-gray-500">{unit.lessons?.length || 0} lessons</span>
                      </div>
                      
                      {unit.lessons && unit.lessons.length > 0 && (
                        <div className="space-y-2">
                          {unit.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson._id} className="flex items-center p-2 bg-gray-50 rounded">
                              <Play className="h-4 w-4 text-gray-400 mr-3" />
                              <span className="text-sm text-gray-700">
                                {lessonIndex + 1}. {lesson.title}
                              </span>
                              <span className="ml-auto text-xs text-gray-500">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Course content is being prepared. Check back soon!</p>
                </div>
              )}
            </div>
            
            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What You will Learn</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Master IELTS speaking strategies and techniques</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Improve your pronunciation and fluency</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Build confidence in English communication</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Practice with real IELTS speaking test questions</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={course.picture ? `https://dead.uz/api${course.picture}` : "/images/course-placeholder.jpg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">Free</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  <span>123 students enrolled</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4 flex items-center justify-center">
                <Play className="h-5 w-5 mr-2" />
                Enroll Now
              </button>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Certificate of Completion</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Lifetime Access</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Q&A Support</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{course.duration} of content</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}