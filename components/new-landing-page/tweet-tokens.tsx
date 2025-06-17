/* eslint-disable @next/next/no-img-element */
import React from 'react'

const TweetTokens = () => {
  return (
    <section className='bg-black'>
       <div className='container-new flex justify-between   py-12 '>
        {
            steps.map((step) => (
                <div className='flex flex-col space-y-4' key={step.step}>
                    <div className='w-fit p-3 flex gap-2 items-center border-[#FF8F61] bg-[#FF8F61]/0 border-2 rounded-[12px]'>
                        <p className='text-[#FF8F61]'>STEP</p>
                    <span className='text-[#FF8F61]'>{step.step}</span>

                    </div>
                    <h5 className='gradient-text text-2xl font-bold'>{step.name}</h5>
                    <p className="mt-6 max-w-[400px] text-[#ffffff70]  font-inter text-[12px] md:text-[18.88px] leading-[100%]">{step.desc}</p>
                    </div>
            ))
        }
        </div> 
   <div className='container-new mt-12 2w-full'>
            <img 
    src={'/images/flow-chart.webp'}
    className=''
    // width={1000}
    // height={800}
    alt='heo'
            />

        </div>
    </section>
  )
}

export default TweetTokens

const steps = [
    {
        step: 1,
        name: "Detect Memes & Influencer Signals",
        desc: "Social Sniper monitors Twitter 24/7 to detect trending memes, tweets, and potential contract drops."
    },
    {
        step: 2,
        name: "Spot Token Drops Instantly",
        desc: "We calculate engagement scores, mention spikes, liquidity lock status, and red flags — instantly."
    },
    {
        step: 3,
        name: "Auto-Buy or Snipe Instantly",
        desc: "When tokens are being pumped, our sniper bots instantly buy or snipe, saving you time and emotion."
    }
]