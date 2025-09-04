// app/courses/[id]/page.tsx
"use client"

import { useParams } from "next/navigation"
import { ChevronRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useCourseDetailQuery } from "@/api/queries/courses"
import CourseDetailSkeleton from "@/components/course-detail/CourseDetailSkeleton"
import CourseErrorState from "@/components/course-detail/CourseErrorState"
import CourseHeader from "@/components/course-detail/CourseHero"
import InstructorSection from "@/components/course-detail/InstructorSection"
import CourseContent from "@/components/course-detail/CourseContent"
import LearningOutcomes from "@/components/course-detail/LearningOutcomes"
import CourseSidebar from "@/components/course-detail/CourseSidebar"

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  
  const { data: course, isLoading, error } = useCourseDetailQuery(courseId)

  if (isLoading) {
    return <CourseDetailSkeleton />
  }

  if (error || !course) {
    return <CourseErrorState />
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
            <CourseHeader course={course} />
            <InstructorSection instructor={course.instructor} />
            <CourseContent units={course.units} courseId={course._id} />
            <LearningOutcomes />
          </div>
          
          {/* Sidebar */}
          <CourseSidebar course={course} />
        </div>
      </div>
    </div>
  )
}