import ExamPreparation from "@/components/mock-ielts/ExamPreparation";
import CallToAction from "@/components/mock-ielts/CallToAction";
import MockIeltsHero from "@/components/mock-ielts/MockIeltsHero";
import ExamFeatures from "@/components/mock-ielts/ExamFeatures";
import PracticeTests from "@/components/mock-ielts/PracticeTests";

export default function MockIeltsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <MockIeltsHero />
      <ExamFeatures />
      <ExamPreparation />
      <PracticeTests />
      <CallToAction />
    </main>
  );
}