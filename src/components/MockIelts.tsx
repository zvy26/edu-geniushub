import { Button } from "@/components/ui/button";
import { ExternalLink, TestTube, Clock, Award, Users } from "lucide-react";
import Link from "next/link";

const MockIelts = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full text-white text-sm font-medium mb-8">
            <TestTube className="w-4 h-4" />
            Official Mock Test Platform
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Take Your <span className="text-white">Free Mock IELTS Test</span>
          </h2>
          
          <p className="text-lg text-white/90 mb-12 max-w-3xl mx-auto">
            Experience the real IELTS test environment with our official mock test platform. Get instant results and detailed feedback to improve your performance.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real Test Timing</h3>
              <p className="text-white/80">Experience actual IELTS test duration and time pressure</p>
            </div>
            
            <div className="text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-white/80">Get your band scores immediately after completion</p>
            </div>
            
            <div className="text-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Analysis</h3>
              <p className="text-white/80">Detailed feedback from IELTS professionals</p>
            </div>
          </div>

          <div className="animate-fade-up">
            <Link
              href="https://mock-ielts.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button 
                variant="secondary" 
                // size="" 
                className="group hover:bg-white hover:text-primary shadow-lg hover:shadow-xl"
              >
                Start Free Mock Test
                <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <p className="text-sm text-white/70 mt-4">
              No registration required • Completely free • Instant results
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockIelts;