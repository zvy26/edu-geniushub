// components/courses/CourseHero.tsx
import { Target, Award, Users } from "lucide-react"

export default function CourseHero() {
  return (
    <div className="bg-secondary p-8 md:p-12 text-white mb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Master Your IELTS Skills</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-6 max-w-3xl">
            Interactive lessons designed by IELTS experts to help you achieve your target band score
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Targeted Preparation</h3>
                <p className="text-sm opacity-80">Focus on your weak areas</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Expert Guidance</h3>
                <p className="text-sm opacity-80">From certified IELTS trainers</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Community Support</h3>
                <p className="text-sm opacity-80">Learn with peers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}