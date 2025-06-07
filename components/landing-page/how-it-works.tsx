import Image from "next/image";
import { Icons } from "../shared/icons";

const HowitWorks = () => {
  return (
    <section
      className="min-h-screen relative bg-[#00090F] flex flex-col py-4 md:py-8"
      id="how-it-works"
    >
      {/* Header */}
      <div className="flex justify-center items-center mb-8 md:mb-6">
        <h1 className="text-2xl md:text-3xl gradient-text font-medium text-center">
          How it Works
        </h1>
      </div>

      {/* Mobile Layout - Single Column */}
      <div className="block p-4 md:hidden w-[90%] mx-auto space-y-8">
        {/* Step 1 - Track the Right Signals */}
        <div className="flex flex-col items-start   md:items-center space-y-4">
          <h3 className="heading-text">Track the Right Signals</h3>
          <p className="description-text">
            We monitor thousands of Twitter accounts, trending memes, hashtags,
            and influencers 24/7 — so you don&apos;t have to.
          </p>
          <div className="w-full max-w-[350px]">
            <Image
              src={"/images/box-1.png"}
              width={700}
              height={400}
              alt="Track the Right Signals"
              className="w-full h-auto object-contain rounded-lg"
              priority
              quality={100}
              sizes="(max-width: 768px) 350px, 510px"
            />
          </div>
        </div>

        {/* Dotted Arrow Down */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center space-y-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-[#ff4c02] rounded-full opacity-60"
              />
            ))}
            <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#ff4c02] opacity-60" />
          </div>
        </div>

        {/* Step 2 - Catch Drops in Real Time */}
        <div className="flex flex-col  md:items-center space-y-4">
          <h3 className="heading-text">Catch Drops in Real Time</h3>
          <p className="description-text">
            Social Sniper detects token launches, contract drops, and viral
            tweet spikes instantly — with built-in risk flags.
          </p>
          <div className="w-full max-w-[350px]">
            <Image
              src={"/images/box-2.png"}
              width={700}
              height={400}
              alt="Catch Drops in Real Time"
              className="w-full h-auto object-contain rounded-lg"
              quality={100}
              sizes="(max-width: 768px) 350px, 510px"
            />
          </div>
        </div>

        {/* Dotted Arrow Down */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center space-y-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-[#ff4c02] rounded-full opacity-60"
              />
            ))}
            <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#ff4c02] opacity-60" />
          </div>
        </div>

        {/* Step 3 - Buy or Snipe Instantly */}
        <div className="flex  flex-col justify-start md:items-center space-y-4">
          <h3 className="heading-text">Buy or Snipe Instantly</h3>
          <p className="description-text">
            Set your buy amounts, risk tolerance, and let Social Sniper execute
            trades automatically when opportunities arise.
          </p>
          <div className="w-full max-w-[350px]">
            <Image
              src={"/images/box-3.png"}
              width={700}
              height={400}
              alt="Buy or Snipe Instantly"
              className="w-full h-auto object-contain rounded-lg"
              quality={100}
              sizes="(max-width: 768px) 350px, 480px"
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout - Original Grid */}
      <section className="hidden md:grid mx-auto relative gap-4 md:gap-6 grid-cols-2 w-[75%] flex-1 min-h-0">
        {/* Grid One - Content Boxes */}
        <div className="flex flex-col justify-between space-y-4 order-2 md:order-1 min-h-0">
          {/* Box 1 */}
          <div className="flex flex-col space-y-3 flex-1">
            <div className="flex  flex-col space-y-2">
              <h3 className="text-2xl lg:text-3xl font-medium gradient-text leading-tight">
                Track the Right Signals
              </h3>
              <p className="text-[#FFFFFF70] text-base grok leading-relaxed">
                We monitor thousands of Twitter accounts, trending memes,
                hashtags, and influencers 24/7 — so you don&apos;t have to.
              </p>
            </div>
            <div className="w-full flex-1 min-h-0">
              <Image
                src={"/images/box-1.png"}
                width={1020}
                height={660}
                alt="Track the Right Signals"
                className="w-full h-full object-contain rounded-lg max-h-[330px]"
                priority
                quality={100}
                sizes="510px"
              />
            </div>
          </div>

          {/* Box 2 */}
          <div className="flex flex-col space-y-3 flex-1">
            <div className="flex flex-col space-y-2">
              <h3 className="text-2xl lg:text-3xl font-medium gradient-text leading-tight">
                Catch Drops in Real Time
              </h3>
              <p className="text-[#FFFFFF70] text-base grok leading-relaxed">
                Social Sniper detects token launches, contract drops, and viral
                tweet spikes instantly — with built-in risk flags.
              </p>
            </div>
            <div className="w-full flex-1 min-h-0">
              <Image
                src={"/images/box-3.png"}
                width={1020}
                height={660}
                alt="Catch Drops in Real Time"
                className="w-full h-full object-contain rounded-lg max-h-[330px]"
                quality={100}
                sizes="510px"
              />
            </div>
          </div>
        </div>

        {/* Grid Two - Central Image with Arrows */}
        <div className="flex flex-col justify-center items-center relative order-1 md:order-2 mb-4 md:mb-0 min-h-0">
          {/* Top Arrow */}
          <div className="absolute rotate-180 scale-x-[-1] top-[15%] left-[30%] transform -translate-x-1/2 z-10">
            <Icons.arrows />
          </div>

          {/* Central Image */}
          <div className="w-full max-w-[480px] flex-1 flex items-center justify-center">
            <Image
              alt="Social Sniper Dashboard"
              src={"/images/box-2.png"}
              width={960}
              height={1060}
              className="w-full h-auto rounded-lg max-h-[400px] object-contain z-50"
              priority
              quality={100}
              sizes="480px"
            />
          </div>

          {/* Bottom Arrow */}
          <div className="absolute bottom-[10%] left-[30%] transform -translate-x-1/2 z-10">
            <Icons.arrows />
          </div>
        </div>
      </section>

      {/* Background Gradients */}
      <div
        className="absolute w-[300px] md:w-[671px] h-[371px] bottom-0 
  md:-left-[20%] -left-[40%] rounded-[335.5px] 
  [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] 
  opacity-[0.29] md:opacity-[0.29] "
      />
      <div
        className="absolute w-[450px] md:w-[671px] h-[400px] md:h-[671px] 
        top-auto bottom-0 md:top-0 md:right-[83px] right-[-40%] rounded-[335.5px] 
        [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] 
        opacity-[0.29] md:opacity-[0.29] "
      />
    </section>
  );
};

export default HowitWorks;
