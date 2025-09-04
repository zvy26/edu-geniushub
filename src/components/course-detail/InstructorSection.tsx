// components/courses/InstructorSection.tsx
import Image from "next/image"
import { User } from "lucide-react"

interface Instructor {
  _id: string
  name: string
  avatar?: string
  bio?: string
}

interface InstructorSectionProps {
  instructor?: Instructor
}

export default function InstructorSection({ instructor }: InstructorSectionProps) {
  if (!instructor) return null
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructor</h2>
      <div className="flex items-center">
        <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
          {instructor.avatar ? (
            <Image
              src={instructor.avatar}
              alt={instructor.name}
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
          <h3 className="font-semibold text-gray-800">{instructor.name}</h3>
          {instructor.bio && (
            <p className="text-gray-600 text-sm mt-1">{instructor.bio}</p>
          )}
        </div>
      </div>
    </div>
  )
}