"use client";

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Mission from '@/components/sections/Mission';
import Marquee from '@/components/sections/Marquee';
import Services from '@/components/sections/Services';
import FloatingNav from '@/components/FloatingNav';
import Schedule from '@/components/Schedule';
import { useScheduleModal } from '@/hooks/useScheduleModal';

// Lazy load below-the-fold components
const Team = dynamic(() => import('@/components/sections/Team'), {
  loading: () => <div className="h-screen bg-void-black" />,
});
const ScrollingText = dynamic(() => import('@/components/ScrollingText').then(mod => ({ default: mod.ScrollingText })), {
  loading: () => <div className="h-24 bg-[#0283C0]" />,
});
const TestimonialCarousel = dynamic(() => import('@/components/TestimonialCarousel'), {
  loading: () => <div className="h-screen bg-void-black" />,
  ssr: false,
});
const Locations = dynamic(() => import('@/components/sections/Locations'), {
  loading: () => <div className="h-screen bg-void-black" />,
});
const CTA = dynamic(() => import('@/components/sections/CTA'), {
  loading: () => <div className="h-screen bg-void-black" />,
});
const HeroFooter = dynamic(() => import('@/components/sections/HeroFooter'), {
  loading: () => <div className="h-96 bg-void-black" />,
});

export default function Home() {
  const { showModal, setShowModal, openModal } = useScheduleModal();

  useEffect(() => {
    // Lazy load Elfsight script after page load
    const loadElfsight = () => {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    // Load after initial render
    const timer = setTimeout(loadElfsight, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-void-black overflow-x-hidden">
      <FloatingNav />
      
      <Hero />
      
      <About />
      
      <Mission />
      
      <Marquee />
      
      <Services />
      
      <Team />
      
      <section className="py-12 bg-white">
        <div
          className="elfsight-app-88d2e0fd-0af7-448d-ad90-643f857f8de3"
          data-elfsight-app-lazy
        ></div>
      </section>
      
      <ScrollingText />
      
      <section className="relative pt-16 md:pt-12 pb-20 overflow-hidden flex items-center bg-void-black">
        <TestimonialCarousel />
      </section>
      
      <ScrollingText />
      
      <Locations />
      
      <CTA onScheduleClick={openModal} />
      
      <HeroFooter />
      
      <Schedule showModal={showModal} setShowModal={setShowModal} />
    </main>
  );
}
