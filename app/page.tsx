"use client"

import BuiltBanner from "@/components/landing-page/built-banner";
import Features from "@/components/landing-page/features";
import { Hero } from "@/components/landing-page/hero";
import HowitWorks from "@/components/landing-page/how-it-works";



const Runner = () => {
  return (
  <main className="flex flex-col  ">
    
 <Hero />
 <HowitWorks />
 <Features />
 <BuiltBanner />
  </main>
  );
};

export default Runner;
