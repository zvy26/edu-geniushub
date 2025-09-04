import { Mic, PenTool, Headphones, BookOpen } from "lucide-react";

const features = [
  {
    icon: <Mic className="h-8 w-8" />,
    title: "Speaking Test",
    description: "Simulated speaking test with AI evaluation and pronunciation feedback"
  },
  {
    icon: <PenTool className="h-8 w-8" />,
    title: "Writing Task",
    description: "Academic and General training writing tasks with detailed band score analysis"
  },
  {
    icon: <Headphones className="h-8 w-8" />,
    title: "Listening Section",
    description: "Authentic audio recordings with various accents and difficulty levels"
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Reading Comprehension",
    description: "Diverse reading passages with time-bound questions and explanations"
  }
];

export default function ExamFeatures() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Comprehensive Test Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our mock tests replicate the actual IELTS exam environment to give you the most authentic preparation experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}