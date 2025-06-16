/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'

const Shipped = () => {
  return (
    <div className='bg-black'>
           <div className='flex flex-col  max-w-[920px] mx-auto'>
            <h1 className='font-grok mt-12 -tracking-[2px] md:tracking-normal gradient-text font-bold leading-[33.51px] md:leading-[50.1px] text-[30.72px] md:text-[47.48px] text-center'>
What We’ve Sniped So Far.
</h1>
<p className="mt-6 text-[#ffffff70]  font-inter text-[12px] md:text-[18.88px] text-center leading-[100%]">
“Powered by real-time Twitter & on‑chain data for lightning-fast meme-token insight.”
</p>
        </div>
        <div className='container-new mt-12 2w-full'>
            <img 
    src={'/images/runner-img.webp'}
    className=''
    // width={1000}
    // height={800}
    alt='heo'
            />

        </div>

    </div>
  )
}

export default Shipped