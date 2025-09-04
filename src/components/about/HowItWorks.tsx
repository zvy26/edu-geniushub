// components/HowItWorks.js
import { UserPlus, BookOpen, FileText, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Register for the course",
      description: "Sign up for free and create your personalized learning profile to get started with IELTS preparation.",
      number: "01"
    },
    {
      icon: BookOpen,
      title: "Solve daily practice questions",
      description: "Access our comprehensive question bank with AI-powered personalized practice sessions every day.",
      number: "02"
    },
    {
      icon: FileText,
      title: "Take Mock Exam",
      description: "Test your skills with realistic IELTS mock exams that simulate the actual test environment.",
      number: "03"
    },
    {
      icon: TrendingUp,
      title: "Improve your score with AI suggestions",
      description: "Get detailed feedback and improvement suggestions powered by our advanced AI analysis system.",
      number: "04"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process makes IELTS preparation simple, effective, and personalized to your learning style.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group animate-fade-up h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center p-6 bg-card rounded-2xl shadow-soft border border-border/50 hover:shadow-medium hover:scale-105 transition-all duration-300 h-full flex flex-col justify-between min-h-[280px]">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-medium">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-6 pt-4">
                    <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-primary to-primary-light"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Start your journey to IELTS success today
          </div>
        </div>
      </div>
    </section>
  );
};

;