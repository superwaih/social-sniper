import Image from 'next/image'
import React from 'react'

const AutoBuy = () => {
  return (
    <section className='bg-black'>

    <div className='container-new border p-8 flex justify-between border-[#FFFFFF45] rounded-[16px]'>
<div className='max-w-[400px] justify-center flex flex-col space-y-3 '>
    <h1 className='font-grok  -tracking-[2px] md:tracking-normal gradient-text font-bold leading-[33.51px] md:leading-[39.48px] text-[20.72px] md:text-[32.62px] text-start'>
Auto Buy Execution
</h1>
<p className=" text-[#ffffff70]  text-[12px] md:text-[16px] text-start leading-[100%]">
  Configurable sniper with stop-loss, take-profit, and gas settings.
</p>
</div>
<div>
    <Image
    src={'/images/auto-buy.png'}
    width={500}
    alt='auto buy'
    height={300}
    />
</div>
    </div>
    </section>
  )
}

export default AutoBuy