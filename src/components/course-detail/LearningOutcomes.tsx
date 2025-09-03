// components/courses/LearningOutcomes.tsx
import { CheckCircle } from "lucide-react"

export default function LearningOutcomes() {
  return (
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
  )
}