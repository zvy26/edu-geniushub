"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Headphones, 
  FileText, 
  Mic, 
  Award, 
  Star, 
  Sparkles, 
  Users, 
  TrendingUp
} from "lucide-react";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Start your journey with us and master all four IELTS skills through our comprehensive learning platform.";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative pt-16 pb-16 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-60 -left-40 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Motivational Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Learning Platform
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
            Ready to achieve your{" "}
            <span className="text-gradient relative">
              IELTS goals
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </span>?
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto min-h-[5rem] flex items-center justify-center">
            <span>
              {typedText}
              <span className="animate-pulse text-primary">|</span>
            </span>
          </p>
        </div>

        {/* Full IELTS Package - Featured */}
        <div className="mb-16 animate-fade-up">
          <div className="relative bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl p-10 shadow-xl border-2 border-primary/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="text-center relative z-10">
              <div className="w-28 h-28 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-md">
                <Award className="w-14 h-14 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Complete IELTS Preparation
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Master all four IELTS skills with our comprehensive course package. Everything you need to achieve your target score with AI-powered personalized learning.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
                <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/10">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Star className="w-6 h-6 text-amber-500" />
                    <span className="text-2xl font-bold text-foreground">216+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Practice Lessons</p>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/10">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Users className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold text-foreground">10,000+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/10">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                    <span className="text-2xl font-bold text-foreground">95%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>

              <Button size="lg" className="bg-gradient-to-br from-primary to-secondary hover:opacity-90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                <Link href="/courses" className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  View Full Course Details
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Individual Course Cards */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Or choose individual skills
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Focus on specific areas where you need the most improvement
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              id: "listening",
              title: "IELTS Listening",
              description: "Master listening skills with interactive exercises and real exam simulations",
              icon: Headphones,
              gradient: "from-blue-500 to-blue-600",
              bgGradient: "from-blue-500/10 to-blue-600/5",
              students: "5,000+",
              lessons: "54"
            },
            {
              id: "reading", 
              title: "IELTS Reading",
              description: "Develop reading comprehension with advanced techniques and practice",
              icon: BookOpen,
              gradient: "from-green-500 to-green-600",
              bgGradient: "from-green-500/10 to-green-600/5",
              students: "4,800+",
              lessons: "62"
            },
            {
              id: "writing",
              title: "IELTS Writing",
              description: "Perfect your writing for Task 1 & 2 with expert feedback",
              icon: FileText,
              gradient: "from-purple-500 to-purple-600", 
              bgGradient: "from-purple-500/10 to-purple-600/5",
              students: "6,200+",
              lessons: "48"
            },
            {
              id: "speaking",
              title: "IELTS Speaking",
              description: "Build confidence and fluency with AI conversation practice",
              icon: Mic,
              gradient: "from-orange-500 to-orange-600",
              bgGradient: "from-orange-500/10 to-orange-600/5",
              students: "5,500+",
              lessons: "52"
            }
          ].map((course, index) => {
            const Icon = course.icon;
            return (
              <Link
                key={course.id}
                href={'/courses'}
                className="group block animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`relative bg-gradient-to-br ${course.bgGradient} to-card rounded-3xl p-8 shadow-md border border-border/50 hover:shadow-lg hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full`}>
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${course.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {course.title}
                    </h4>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{course.lessons} lessons</span>
                      </div>
                    </div>
                    
                    {/* Hover arrow */}
                    <div className="absolute bottom-4 right-4 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
