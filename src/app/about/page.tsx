import Head from 'next/head';
import FAQ from '@/components/about/FAQ';
import HowItWorks from '@/components/about/HowItWorks';
import Benefits from '@/components/about/Benefits';
import Testimonials from '@/components/about/Testimonials';

export default function About() {
  return (
    <>
      <Head>
        <title>About Our IELTS Preparation Course</title>
        <meta name="description" content="Learn how our IELTS preparation course works, its benefits, and read testimonials from successful students." />
      </Head>
      
      <div className="min-h-screen">
        <main>
          <HowItWorks />
          <Benefits />
          <Testimonials />
          <FAQ />
        </main>
      </div>
    </>
  );
};
