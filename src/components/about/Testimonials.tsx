// components/Testimonials.js
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
  {
    name: "Sarah Chen",
    rating: 5,
    comment: "This IELTS course completely transformed my preparation. The mock exams were incredibly realistic and helped me achieve Band 8.5!",
    course: "Academic IELTS",
    flag: "🇺🇸"
  },
  {
    name: "Ahmed Hassan",
    rating: 5,
    comment: "The structured approach and expert feedback made all the difference. I improved from Band 6 to Band 8 in just 2 months!",
    course: "General Training",
    flag: "🇪🇬"
  },
  {
    name: "Maria Rodriguez",
    rating: 4,
    comment: "Excellent course content and teaching methodology. The practice materials are comprehensive and very helpful.",
    course: "Academic IELTS",
    flag: "🇪🇸"
  },
  {
    name: "David Thompson",
    rating: 5,
    comment: "Best IELTS preparation platform I&apos;ve used. The personalized feedback and progress tracking kept me motivated throughout.",
    course: "Academic IELTS",
    flag: "🇬🇧"
  },
  {
    name: "Priya Sharma",
    rating: 5,
    comment: "The mock tests were exactly like the real exam. Thanks to this course, I got the Band 7.5 I needed for my university application!",
    course: "Academic IELTS",
    flag: "🇮🇳"
  },
  {
    name: "Carlos Silva",
    rating: 4,
    comment: "Great course with excellent teachers. The speaking practice sessions were particularly helpful for building confidence.",
    course: "General Training",
    flag: "🇧🇷"
  }
];

  return (
    <section id="testimonials" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Students About Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from our successful students who achieved their target IELTS scores
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 hover:shadow-medium transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="flex items-center justify-between mb-4">
                <Quote className="h-8 w-8 text-primary/30" />
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "text-warning fill-warning"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Comment */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {testimonial.comment}
              </p>

              {/* Student Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground flex items-center space-x-2">
                    <span>{testimonial.name}</span>
                    <span className="text-lg">{testimonial.flag}</span>
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.course}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {testimonial.rating}.0
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Rating
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Join thousands of successful IELTS students
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.8/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2,500+</div>
              <div className="text-sm text-muted-foreground">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;