import { Target, Clock, BarChart3, BookMarked } from "lucide-react";

const preparationSteps = [
  {
    step: "01",
    icon: <Target className="h-6 w-6" />,
    title: "Set Your Goal",
    description: "Determine your target band score and create a study plan"
  },
  {
    step: "02",
    icon: <BookMarked className="h-6 w-6" />,
    title: "Study Materials",
    description: "Access comprehensive study materials and practice resources"
  },
  {
    step: "03",
    icon: <Clock className="h-6 w-6" />,
    title: "Timed Practice",
    description: "Take timed mock tests under exam conditions"
  },
  {
    step: "04",
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Track Progress",
    description: "Monitor your improvement with detailed analytics"
  }
];

export default function ExamPreparation() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How to Prepare Effectively
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow these steps to maximize your IELTS preparation and achieve your desired band score
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {preparationSteps.map((step, index) => (
            <div
              key={index}
              className="relative group text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">
                {step.step}
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}