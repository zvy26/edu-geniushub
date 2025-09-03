// app/courses/page.tsx
"use client"

import { useState } from "react"
import CourseCard from "@/components/courses/CourseCard"
import CourseHero from "@/components/courses/CourseHero"
import CourseSearch from "@/components/courses/CourseSearch"
import CoursesLoading from "@/components/courses/CoursesLoading"
import CoursesError from "@/components/courses/CoursesError"
import { useCoursesQuery } from "@/api/queries/courses"
import { BookOpen } from "lucide-react"

export default function CoursesPage() {
  const { data: courses, isLoading, error, refetch } = useCoursesQuery()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")

  // Filter courses based on search term and level
  const filteredCourses = courses?.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel
    return matchesSearch && matchesLevel
  }) || []

  return (
    <div className="min-h-full bg-gray-50">
      {/* Hero Section - Static, hech qachon yo'qolmaydi */}
      <CourseHero />

      {/* Content Section - Loading va error holatlariga qarab o'zgaradi */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <CourseSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
        />
        {isLoading ? (
          <CoursesLoading />
        ) : error ? (
          <CoursesError refetch={refetch} />
        ) : (
          <>
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Available Courses <span className="text-blue-600">({filteredCourses.length})</span>
              </h2>

              <div className="flex items-center text-sm text-gray-600">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{courses?.length || 0} total courses</span>
              </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="bg-gray-100 p-4 rounded-full inline-flex mb-4">
                  <span className="text-gray-400 text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}