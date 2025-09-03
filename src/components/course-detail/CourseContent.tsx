// components/courses/CourseContent.tsx
"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BookOpen, Clock, ChevronDown } from "lucide-react"
import { CourseUnit } from "@/types/courses"

interface CourseContentProps {
  units?: CourseUnit[]
}

export default function CourseContent({ units }: CourseContentProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

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
        value={openItems} 
        onValueChange={setOpenItems}
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
                  <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200" />
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent className="px-4 pb-3 pt-1">
              {unit.sections && unit.sections.length > 0 ? (
                <div className="mt-3 space-y-2">
                  {unit.sections.map((section, sectionIndex) => (
                    <div 
                      key={section._id} 
                      className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-gray-700">
                          {sectionIndex + 1}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-medium text-gray-800">
                          {section.title}
                        </h4>
                        {section.description && (
                          <p className="text-xs text-gray-600 mt-1">
                            {section.description}
                          </p>
                        )}
                      </div>
                      {section.duration && (
                        <div className="flex items-center text-xs text-gray-500 ml-4">
                          <Clock className="h-3 w-3 mr-1" />
                          {section.duration}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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