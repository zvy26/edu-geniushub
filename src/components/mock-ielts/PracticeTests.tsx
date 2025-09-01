import { CheckCircle, Clock, Star, Users } from "lucide-react";

const testTypes = [
  {
    type: "Academic",
    description: "For higher education and professional registration",
    duration: "2h 45m",
    questions: "80+",
    difficulty: "Advanced"
  },
  {
    type: "General Training",
    description: "For migration and work experience",
    duration: "2h 45m",
    questions: "80+",
    difficulty: "Intermediate"
  }
];

export default function PracticeTests() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Practice Test Types
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose between Academic and General Training tests based on your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testTypes.map((test, index) => (
            <div
              key={index}
              className="group relative p-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (test.difficulty === "Advanced" ? 3 : 2)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {test.type}
              </h3>
              <p className="text-gray-600 mb-6">{test.description}</p>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  <span>Duration: {test.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  <span>Questions: {test.questions}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-purple-600" />
                  <span>Difficulty: {test.difficulty}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-600 py-3 px-6 rounded-lg font-medium cursor-not-allowed opacity-50"
                >
                  Available Soon
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}