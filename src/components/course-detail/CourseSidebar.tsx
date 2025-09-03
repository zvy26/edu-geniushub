// components/courses/CourseSidebar.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Users, Award, Calendar, MessageCircle, Clock, CheckCircle, BookOpen, BarChart3 } from "lucide-react"
import { useProfileQuery } from "@/api/queries/profile"
import PaymentModal from "@/components/payment/PaymentModal"
import { Course } from "@/types/courses"
import Link from "next/link"

interface CourseSidebarProps {
  course: Course
}

export default function CourseSidebar({ course }: CourseSidebarProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const { data: profile, isLoading } = useProfileQuery()

  const isPaid = profile?.isPaid
  const coursePrice = 299

  const handleEnrollClick = () => {
    if (isPaid) {
      // Kursni boshlash - unit 1, lesson 1 ga yo'naltiramiz
      console.log("Start learning:", course._id)
    } else {
      setIsPaymentModalOpen(true)
    }
  }

  const handlePaymentSuccess = () => {
    window.location.reload()
  }

  // Agar to'lov qilingan bo'lsa, boshqa UI ko'rsatamiz
  if (isPaid) {
    return (
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
          <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
            <Image
              src={course.picture ? `https://dead.uz${course.picture}` : "/images/course-placeholder.jpg"}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Enrolled Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
            <span className="text-sm text-green-700 font-medium">You are enrolled in this course</span>
          </div>
          
          {/* Progress Stats */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium text-gray-900">0%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Lessons completed</span>
              <span className="text-sm font-medium text-gray-900">0/0</span>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="space-y-3">
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              View Progress
            </button>
          </div>
          
          {/* Course Info */}
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <span>{course.duration} of content</span>
            </div>
            <div className="flex items-center">
              <Award className="h-4 w-4 text-gray-500 mr-2" />
              <span>Certificate available</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              <span>Lifetime access</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // To'lov qilinmagan bo'lsa, oddiy enroll UI
  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
          <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
            <Image
              src={course.picture ? `https://dead.uz${course.picture}` : "/images/course-placeholder.jpg"}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold text-gray-900">${coursePrice}</span>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>1.2K students</span>
            </div>
          </div>
          
          <button 
            onClick={handleEnrollClick}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            <Play className="h-5 w-5 mr-2" />
            Enroll Now - ${coursePrice}
          </button>
          
          {/* Course Features */}
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

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        courseId={course._id}
        courseTitle={course.title}
        amount={coursePrice}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  )
}