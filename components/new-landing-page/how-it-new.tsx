import Image from 'next/image'
import React from 'react'



const cards = [
    {id: 1,

        imgSrc: '/images/detect-1.webp'
    },
    {id: 2,

        imgSrc: '/images/detect-2.webp'
    },
    {id: 3,

        imgSrc: '/images/detect-3.webp'
    },
]
const HowitWorksNew = () => {
  return (
    <section className='bg-black p-12 flex flex-col space-y-8'>
        
        <div className='flex flex-col  max-w-[920px] mx-auto'>
            <h1 className='font-grok mt-12 -tracking-[2px] md:tracking-normal gradient-text font-bold leading-[33.51px] md:leading-[50.1px] text-[30.72px] md:text-[47.48px] text-center'>
Your Meme Detection Engine. Built on Social + On-Chain Signals.
</h1>
<p className="mt-6 text-[#ffffff70] font-inter text-[12px] md:text-[18.88px] text-center leading-[100%]">
We unify influencer tweets, meme hashtags, smart contract launches, and AI-powered analysis into one seamless sniper flow.
</p>
        </div>

        <div className='container-new mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
{
    cards.map((card) => (
        <div className='' key={card.id}>
<Image
src={card.imgSrc}
width={414}
height={500}
alt={card.imgSrc}
/>
        </div>
    ))
}
        </div>

    </section>
  )
}

export default HowitWorksNew