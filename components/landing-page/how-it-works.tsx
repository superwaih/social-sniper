import Image from "next/image"
import { Icons } from "../shared/icons"

const HowitWorks = () => {
  return (
    <section className="h-screen mx-auto bg-[#00090F] flex flex-col w-[90%] md:w-[85%] py-4 md:py-8" id="how-it-works">
      {/* Header - Compact */}
      <div className="flex justify-center items-center mb-4 md:mb-6">
        <h1 className="text-xl md:text-3xl gradient-text font-medium text-center">How it Works</h1>
      </div>

      {/* Main Grid Container - Takes remaining space */}
      <section className="mx-auto relative gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2 w-[95%] md:w-[75%] flex-1 min-h-0">
        {/* Grid One - Content Boxes */}
        <div className="flex flex-col justify-between space-y-3 md:space-y-4 order-2 md:order-1 min-h-0">
          {/* Box 1 */}
          <div className="flex flex-col space-y-2 md:space-y-3 flex-1">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-medium gradient-text leading-tight">
                Track the Right Signals
              </h3>
              <p className="text-[#FFFFFF70] text-sm md:text-base grok leading-relaxed">
                We monitor thousands of Twitter accounts, trending memes, hashtags, and influencers 24/7 — so you don&apos;t
                have to.
              </p>
            </div>
            <div className="w-full flex-1 min-h-0">
              <Image
                src={"/images/box-1.png"}
                width={510}
                height={330}
                alt="Track the Right Signals"
                className="w-full h-full object-cover rounded-lg max-h-[120px] md:max-h-[330px]"
                priority
              />
            </div>
          </div>

          {/* Box 2 */}
          <div className="flex flex-col space-y-2 md:space-y-3 flex-1">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-medium gradient-text leading-tight">
                Catch Drops in Real Time
              </h3>
              <p className="text-[#FFFFFF70] text-sm md:text-base grok leading-relaxed">
                Social Sniper detects token launches, contract drops, and viral tweet spikes instantly — with built-in
                risk flags.
              </p>
            </div>
            <div className="w-full flex-1 min-h-0">
              <Image
                src={"/images/box-2.png"}
                width={510}
                height={330}
                alt="Catch Drops in Real Time"
                className="w-full h-full object-cover rounded-lg max-h-[120px] md:max-h-[330px]"
              />
            </div>
          </div>
        </div>

        {/* Grid Two - Central Image with Arrows */}
        <div className="flex flex-col justify-center items-center relative order-1 md:order-2 mb-4 md:mb-0 min-h-0">
          {/* Top Arrow - Hidden on mobile */}
          <div className="hidden md:block absolute rotate-180 scale-x-[-1] top-[10%] left-[35%] transform -translate-x-1/2 z-10">
            <Icons.arrows />
          </div>

          {/* Central Image */}
          <div className="w-full max-w-[400px] md:max-w-[500px] flex-1 flex items-center justify-center">
            <Image
              alt="Social Sniper Dashboard"
              src={"/images/box-3.png"}
              width={550}
              height={530}
              className="w-full h-auto rounded-lg max-h-[250px] md:max-h-[400px] object-contain z-50"
              priority
            />
          </div>

          {/* Bottom Arrow - Hidden on mobile */}
          <div className="hidden md:block absolute bottom-[10%] left-[35%] transform -translate-x-1/2 z-10">
            <Icons.arrows />
          </div>
        </div>
      </section>
    </section>
  )
}

export default HowitWorks
