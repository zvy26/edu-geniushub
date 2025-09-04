// components/courses/CourseContent.tsx
"use client"

import { useState, useEffect } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BookOpen, Clock, PlayCircle, FileText, HelpCircle, File } from "lucide-react"
import Link from "next/link"
import { CourseUnit } from "@/types/courses"
import { useLessonsQuery } from "@/api/queries/courses"
import { AxiosError } from "axios"

interface CourseContentProps {
  units?: CourseUnit[]
  courseId: string
}

interface SectionLessonsProps {
  sectionId: string
  courseId: string
}

// Extract the lessons display into a separate component
function SectionLessons({ sectionId, courseId }: SectionLessonsProps) {
  const { data: lessons, isLoading, error } = useLessonsQuery(sectionId)
  const axiosError = error as AxiosError;

  const getLessonIcon = (type: string) => {
    const normalizedType = type.toLowerCase();
    switch (normalizedType) {
      case 'video':
        return <PlayCircle className="h-4 w-4 text-gray-700" />;
      case 'text':
        return <FileText className="h-4 w-4 text-gray-700" />;
      case 'quiz':
        return <HelpCircle className="h-4 w-4 text-gray-700" />;
      case 'file':
        return <File className="h-4 w-4 text-gray-700" />;
      default:
        return <File className="h-4 w-4 text-gray-700" />;
    }
  };

  if (isLoading) {
    return <p className="text-xs text-gray-500">Loading lessons...</p>
  }

  if (axiosError) {
    if (axiosError.response?.status === 403) {
      return (
        <p className="text-xs text-red-500">
          Payment required to access lessons.{" "}
          <Link href="/upgrade" className="text-blue-600 underline">
            Upgrade your plan
          </Link>
        </p>
      )
    }
    return <p className="text-xs text-red-500">Error loading lessons</p>
  }

  if (!lessons || lessons.length === 0) {
    return <p className="text-xs text-gray-500">No lessons available</p>
  }

  return (
    <div className="space-y-2">
      {lessons.map((lesson) => (
        <Link
          key={lesson._id}
          href={`/lessons/${lesson._id}?courseId=${courseId}`}
          className="block"
        >
          <div className="flex items-start space-x-3 p-2 bg-white rounded-md hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all cursor-pointer">
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5">
              {getLessonIcon(lesson.type)}
            </div>
            <div className="flex-grow">
              <h5 className="text-xs font-medium text-gray-800 hover:text-blue-700">
                {lesson.title}
              </h5>
              {lesson.description && (
                <p className="text-xs text-gray-600">
                  {lesson.description}
                </p>
              )}
              {lesson.type && (
                <p className="text-xs text-gray-500">
                  Type: {lesson.type}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function CourseContent({ units, courseId }: CourseContentProps) {
  const [openUnitItems, setOpenUnitItems] = useState<string[]>([])
  const [openSectionItems, setOpenSectionItems] = useState<string[]>([])

  useEffect(() => {
    console.log("CourseContent units:", units)
    
    if (units && units.length > 0) {
      units.forEach((unit, index) => {
        console.log(`Unit ${index + 1} sections:`, unit.sections)
      })
    }
  }, [units])

  console.log("CourseContent render, units:", units)

  if (!units || units.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
        <div className="text-center py-8 text-gray-500">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Course content is being prepared. Check back soon!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>

      <Accordion
        type="multiple"
        value={openUnitItems}
        onValueChange={setOpenUnitItems}
        className="space-y-4"
      >
        {units.map((unit, index) => (
          <AccordionItem
            key={unit._id}
            value={unit._id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-sm font-medium text-blue-700">
                      {index + 1}
                    </span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">
                      {unit.title}
                    </h3>
                    {unit.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {unit.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {unit.sections?.length || 0} sections
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent className="px-4 pb-3 pt-1">
              {unit.sections && unit.sections.length > 0 ? (
                <Accordion
                  type="multiple"
                  value={openSectionItems}
                  onValueChange={setOpenSectionItems}
                  className="space-y-2"
                >
                  {unit.sections.map((section, sectionIndex) => (
                    <AccordionItem
                      key={section._id}
                      value={section._id}
                      className="border border-gray-200 rounded-md overflow-hidden"
                    >
                      <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 text-sm">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mt-0.5">
                              <span className="text-xs font-medium text-gray-700">
                                {sectionIndex + 1}
                              </span>
                            </div>
                            <div className="text-left">
                              <h4 className="font-medium text-gray-800">
                                {section.title}
                              </h4>
                              {section.description && (
                                <p className="text-xs text-gray-600 mt-1">
                                  {section.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            {section.duration && (
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {section.duration}
                              </div>
                            )}
                          </div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="px-3 pb-2 pt-1 bg-gray-50">
                        <SectionLessons sectionId={section._id} courseId={courseId} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md mt-2">
                  <p className="text-sm">No sections available for this unit</p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}