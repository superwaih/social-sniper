import Image from 'next/image';
import React from 'react'
import { Icons } from '../shared/icons';

const HowitWorks = () => {
  return (
    <section
      className="min-h-screen mx-auto bg-[#00090F] flex flex-col space-y-4 w-[90%] md:w-[85%] "
      id="how-it-works"
    >
      <div className="flex  justify-center my-20  items-center ">
        <h1 className="text-4xl gradient-text font-medium text-center">
          How it Works
        </h1>
      </div>

      {/* Main Grid Container */}
      <section className="mx-auto relative gap-6 grid grid-cols-2 w-[95%] md:w-[70%] ">
        {/* Grid One */}
        <div className="flex flex-col space-y-4">
          {/* Box 1 */}
          <div className="flex flex-col space-y-4">
            <div
              className="max-w-[590.3842163085938px] flex flex-col space-y-4
      "
            >
              <h3 className="text-4xl font-medium gradient-text">
                Track the Right Signals
              </h3>
              <p className="text-[#FFFFFF70] w-full text-lg grok">
                We monitor thousands of Twitter accounts, trending memes,
                hashtags, and influencers 24/7 — so you don’t have to.
              </p>
            </div>
            <div>
              <Image
                src={"/images/box-1.png"}
                width={590}
                height={330}
                alt="box-1"
              />
            </div>
          </div>
          {/* Box 2 */}
          <div className="flex flex-col space-y-4">
            <div
              className="max-w-[590.3842163085938px] flex flex-col space-y-4
      "
            >
              <h3 className="text-4xl font-medium gradient-text">
                Catch Drops in Real Time
              </h3>
              <p className="text-[#FFFFFF70] w-full text-lg grok">
                Social Sniper detects token launches, contract drops, and viral
                tweet spikes instantly — with built-in risk flags.
              </p>
            </div>
            <div>
              <Image
                src={"/images/box-2.png"}
                width={590}
                height={330}
                alt="box-1"
              />
            </div>
          </div>
        </div>

        {/* Grid Two */}
        <div className="flex flex-col justify-center items-center ">
          <div
            // style={{ transform: "rotate(280deg)" }}
            className="absolute rotate-180 scale-x-[-1]  top-[15%] left-[50%]"
          >
            <Icons.arrows />
          </div>
          <Image
            alt="box 3"
            src={"/images/box-3.png"}
            width={590}
            height={530}
          />
          <div className="absolute bottom-[15%] left-[50%]">
            <Icons.arrows />
          </div>
        </div>
      </section>
    </section>
  );
}

export default HowitWorks