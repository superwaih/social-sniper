import React from 'react'

const HowitWorks = () => {
  return (
    <section
      className="h-screen mx-auto flex flex-col space-y-4 w-[90%] md:w-[85%] "
      id="how-it-works"
    >
      <div className="flex  justify-center my-20  items-center ">
        <h1 className="text-4xl gradient-text font-medium text-center">
          How it Works
        </h1>
      </div>
      <div className="max-w-[590.3842163085938px] flex flex-col space-y-4
      ">
        <h3 className="text-4xl font-medium gradient-text">
          Track the Right Signals
        </h3>
        <p className="text-[#FFFFFF70] w-full text-lg grok">
          We monitor thousands of Twitter accounts, trending memes, hashtags,
          and influencers 24/7 — so you don’t have to.
        </p>
      </div>
    </section>
  );
}

export default HowitWorks