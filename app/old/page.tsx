"use client"

import { BottomBanner } from "@/components/landing-page/bottom-banner";
import BuiltBanner from "@/components/landing-page/built-banner";
import Features from "@/components/landing-page/features";
import Footer from "@/components/landing-page/footer";
import { Hero } from "@/components/landing-page/hero";
import HowitWorks from "@/components/landing-page/how-it-works";



const Runner = () => {
  return (
  <main className="flex flex-col overflow-hidden ">
 <Hero />
 <HowitWorks />
 <Features />
 <BuiltBanner />
 <BottomBanner />
 <Footer />
  </main>
  );
};

export default Runner;
