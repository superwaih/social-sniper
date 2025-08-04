"use client"

import { BottomBanner } from "@/components/landing-page/bottom-banner";
import BuiltBanner from "@/components/landing-page/built-banner";
import Footer from "@/components/landing-page/footer";
import AutoBuy from "@/components/new-landing-page/auto-buy";
import HowitWorksNew from "@/components/new-landing-page/how-it-new";
import NewHero from "@/components/new-landing-page/new-hero";
import Shipped from "@/components/new-landing-page/shipped";
import TweetTokens from "@/components/new-landing-page/tweet-tokens";
import PricingSection from "./components/shared/pricing-section";
// import DottedLineIcon from "@/components/shared/dotted-line-icon";



const Runner = () => {
  return (
  <main className="flex flex-col overflow-hidden ">
    {/* <Frame /> */}
    <NewHero />
    <HowitWorksNew />
    <AutoBuy />
    <TweetTokens />
    <Shipped />
    <PricingSection />
 <BuiltBanner />
 <BottomBanner />
 {/* <DottedLineIcon /> */}
<Footer />
  </main>
  );
};

export default Runner;
