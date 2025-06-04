
import React from "react";
import Image from "next/image";
import LandingNavbar from "./landing-navbar";
import { Button } from "../ui/button";






export const Hero = () => {
  return (
    <section
      id="home"
      className="relative p-4 overflow-none mb-20 h-screen mx-auto w-[90%] md:w-[85%] "
    >
      <LandingNavbar />
      <div className="max-w-[720px]  w-full mx-auto items-center  justify-center flex flex-col  space-y-4">
        <h2 className="font-semibold text-white leading-12 md:leading-12 text-[48px] md:text-[62px] text-center">
          Be First. Be Fast. Be a{" "}
          <span className="text-[#ff4c02] font-bold">Social Sniper</span>{" "}
        </h2>
        <p className="font-['Space_Grotesk',Helvetica] font-normal text-[#ffffff70] text-[19px] text-center leading-normal">
          Detect viral meme tokens the moment they hit Twitter — and auto-buy
          them before the rest of the market catches on.
        </p>
        <Button className="w-56 h-[54px] bg-[#ff4c02] rounded border-none text-white">
          <div className="font-['Space_Grotesk',Helvetica] font-normal text-[16.3px] text-center tracking-[-0.65px] leading-normal">
            Snipe now
          </div>
        </Button>
      </div>
      <div className="absolute w-[400px] md:w-[671px] h-[671px] top-[100px] md:top-[250px] left-[83px] rounded-[335.5px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-[0.29]" />
      <div className="absolute w-[450px]  md:w-[671px] h-[400px] md:h-[671px] md:top-[150px] right-[83px] rounded-[335.5px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-[0.29]" />
      <div className="mx-auto w-full max-w-[1010px] h-[660px] relative pt-20">
        <Image
          src={"/heroo-img.png"}
          width={1010}
          height={660}
          alt="Hero Image"
        />
      </div>
      {/* <div className="absolute w-full h-[460px] bottom-0 left-0 [background:linear-gradient(180deg,rgba(0,9,15,0)_0%,rgba(0,9,15,1)_100%)]" /> */}
    </section>
  );
};
