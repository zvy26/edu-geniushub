import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How long does it take to prepare for IELTS with this course?",
      answer: "Most students see significant improvement within 4-8 weeks of consistent study. Our AI-powered platform adapts to your learning pace and helps you achieve your target band score efficiently. Students typically spend 1-2 hours daily on the platform."
    },
    {
      question: "What band score can I expect to achieve?",
      answer: "Our students achieve an average improvement of 2.1 band scores. With dedicated practice and our expert methodology, many students reach band scores of 7.0-8.5. Your final score depends on your starting level and commitment to the program."
    },
    {
      question: "Do I get access to real IELTS practice tests?",
      answer: "Yes! Our platform includes full-length mock IELTS tests that simulate the actual exam conditions. You'll get detailed feedback on all four skills: Reading, Writing, Listening, and Speaking, plus AI-powered analysis of your performance."
    },
    {
      question: "Is there live instructor support available?",
      answer: "Absolutely! Our course includes access to certified IELTS instructors for personalized guidance. You can schedule one-on-one sessions, participate in group workshops, and get detailed feedback on your speaking and writing tasks."
    },
    {
      question: "What makes this different from other IELTS courses?",
      answer: "Our AI-powered platform provides personalized learning paths, instant feedback, and adaptive practice questions. Combined with expert instruction and 216+ comprehensive lessons, we offer a unique blend of technology and human expertise."
    },
    {
      question: "Can I access the course on mobile devices?",
      answer: "Yes! Our platform is fully responsive and works seamlessly on all devices - desktop, tablet, and mobile. You can study anywhere, anytime, and your progress syncs across all devices automatically."
    },
    {
      question: "What if I don't achieve my target score?",
      answer: "We're confident in our methodology. If you complete all course materials and practice regularly but don't achieve at least a 1.5 band score improvement, we offer additional support and extended access to ensure your success."
    },
    {
      question: "How much does the complete course cost?",
      answer: "Our complete IELTS preparation package is $167 as a one-time payment. This includes lifetime access to all 216+ lessons, mock tests, AI feedback, instructor support, and all future updates to the course content."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get answers to the most common questions about our IELTS preparation course
            </p>
          </div>

          <div className="animate-fade-up">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border/50 px-6 py-2 shadow-soft"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12 animate-fade-up">
            <p className="text-muted-foreground mb-4">
              Still have questions? We&rdquo;re here to help!
            </p>
            <a 
              href="#join" 
              className="text-primary hover:text-primary-light font-medium hover:underline"
            >
              Contact our support team →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;