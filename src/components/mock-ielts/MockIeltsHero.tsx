import { Calendar, Clock, Users, Award } from "lucide-react";

export default function MockIeltsHero() {
  return (
    <section className="relative py-20 bg-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            IELTS Mock Tests
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Prepare for your IELTS exam with realistic practice tests and detailed feedback
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">2 Hours 45 Minutes</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">4 Sections</p>
            </div>
            <div className="text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Flexible Timing</p>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Band Score</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="mb-6">
              We&rdquo;re working hard to bring you the best IELTS mock test experience. 
              Our AI-powered evaluation system will provide detailed feedback on your performance.
            </p>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-green-400 h-3 rounded-full transition-all duration-1000" 
                style={{ width: '75%' }}
              ></div>
            </div>
            <p className="text-sm mt-2">Development in progress - 75% complete</p>
          </div>
        </div>
      </div>
    </section>
  );
}