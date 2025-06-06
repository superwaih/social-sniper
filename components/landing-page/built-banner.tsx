"use client"

import { useEffect, useState } from "react"
import { Icons } from "../shared/icons"

const specs = [
  {
    id: 1,
    text: "Locked Liquidity",
  },
  {
    id: 2,
    text: "See Trusted Accounts",
  },
  {
    id: 3,
    text: "Buy/Sell Pressure",
  },
  {
    id: 4,
    text: "Contract Health and Activity",
  },
]

const BuiltBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-slide effect for mobile and mid screens
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % specs.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-[#00090F] py-16 px-4">
      <div>
        <div className="flex flex-col space-y-8 justify-center my-20 items-center">
          <h1 className="text-[23.58px] md:text-4xl gradient-text max-w-[528px] font-medium text-center">
            Built for Degens, Backed by Logic
          </h1>
          <p className="font-['Space_Grotesk',Helvetica] tr max-w-[720px] text-sm font-normal text-[#FFFFFF70] md:text-[19px] text-center leading-normal">
            Detect viral meme tokens the moment they hit Twitter — and auto-buy them before the rest of the market
            catches on.
          </p>
        </div>

        {/* Mobile and Mid Screen Sliding Animation */}
        <div className="mx-auto w-[90%] md:w-[70%] xl:hidden">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {specs.map((spec) => (
                <div key={spec.id} className="w-full flex-shrink-0 px-2">
                  <div className="bg-[#060F15] w-full px-6 py-4 flex gap-3 items-center rounded-[11px]">
                    <Icons.checkmark />
                    <p className="text-[#FFFFFF8F] grok">{spec.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {specs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? "bg-[#ff4c02]" : "bg-[#FFFFFF30]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Large Screen Layout (No Flex/Grid) */}
        <div className="hidden xl:block mx-auto w-[70%]">
          <div className="flex justify-between gap-4">
            {specs.map((spec, index) => (
              <div
                key={spec.id}
                className="bg-[#060F15] px-4 py-4 w-full min-h-[60px] flex gap-3 items-center rounded-[11px] transform transition-all duration-300 hover:scale-105 hover:bg-[#0a1520] flex-1"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <Icons.checkmark className="size-4 flex-shrink-0" />
                <p className="text-[#FFFFFF8F] md:text-sm text-[10px] grok whitespace-nowrap">{spec.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuiltBanner
