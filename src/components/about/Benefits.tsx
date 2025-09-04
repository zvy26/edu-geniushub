// components/Benefits.js
import { BookOpen, Lightbulb, Bot, FileText, Clock, Users, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const Benefits = () => {
  const benefits = [
    {
      icon: BookOpen,
      title: "216 Practice Lessons",
      description: "Comprehensive coverage of all IELTS skills",
      details: "Listening, Reading, Writing, Speaking",
      color: "bg-blue-500"
    },
    {
      icon: Lightbulb,
      title: "Innovative Learning Method",
      description: "Modern approach to IELTS preparation",
      details: "Research-backed techniques",
      color: "bg-amber-500"
    },
    {
      icon: Bot,
      title: "AI Powered Tests",
      description: "Smart assessment and feedback system",
      details: "Personalized improvement suggestions",
      color: "bg-purple-500"
    },
    {
      icon: FileText,
      title: "Free Mock Tests",
      description: "Unlimited practice with real exam format",
      details: "Immediate detailed results",
      color: "bg-green-500"
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Learn at your own pace, anytime",
      details: "Mobile and desktop compatible",
      color: "bg-indigo-500"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Guidance from certified IELTS professionals",
      details: "Personal mentoring available",
      color: "bg-rose-500"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "95% of students achieve their target score",
      details: "Average improvement: 1.5 bands",
      color: "bg-emerald-500"
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "Customized study plans for your target",
      details: "Track progress in real-time",
      color: "bg-orange-500"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Why Choose <span className="text-gradient">IELTS PREP Course</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the most comprehensive and effective IELTS preparation platform with features designed for your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-card rounded-2xl p-6 h-full shadow-soft border border-border/50 hover:shadow-medium hover:-translate-y-2 transition-all duration-300 hover:border-primary/20">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                    {benefit.description}
                  </p>
                  <div className="text-xs text-primary font-medium">
                    {benefit.details}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlighted Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-8 animate-fade-up">
          <div className="bg-gradient-primary text-primary-foreground rounded-2xl p-8 shadow-strong hover:shadow-strong hover:scale-105 transition-all duration-300">
            <BookOpen className="w-12 h-12 mb-4 animate-pulse-slow" />
            <h3 className="text-xl font-bold mb-3">Complete IELTS Coverage</h3>
            <p className="text-primary-foreground/90 mb-4">
              Access to all four IELTS skills: Listening, Reading, Writing, and Speaking with 216+ comprehensive lessons.
            </p>
            <Button variant="secondary" size="sm" className="hover:bg-primary-foreground/20">
              Explore Lessons
            </Button>
          </div>

          <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-8 shadow-strong hover:shadow-strong hover:scale-105 transition-all duration-300">
            <Bot className="w-12 h-12 mb-4 animate-pulse-slow" />
            <h3 className="text-xl font-bold mb-3">AI-Powered Learning</h3>
            <p className="text-primary-foreground/90 mb-4">
              Revolutionary AI technology that provides personalized feedback and adapts to your learning style for optimal results.
            </p>
            <Button variant="secondary" size="sm" className="hover:bg-primary-foreground/20">
              Try AI Tests
            </Button>
          </div>

          <div className="bg-card border-2 border-primary rounded-2xl p-8 shadow-strong hover:shadow-strong hover:scale-105 transition-all duration-300">
            <FileText className="w-12 h-12 mb-4 text-primary animate-pulse-slow" />
            <h3 className="text-xl font-bold mb-3 text-foreground">Free Mock Tests</h3>
            <p className="text-muted-foreground mb-4">
              Unlimited access to realistic IELTS mock tests that simulate the actual exam environment and provide instant feedback.
            </p>
            <Button variant="hero" size="sm">
              Take Mock Test
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;