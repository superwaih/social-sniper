import React from 'react'
// import { Icons } from '../shared/icons';
import NewNav from './new-nav';
import Link from 'next/link';
const stats = [
  {
    id: 1,
    stat: 100000,
    title: 'Realized Profits'
  },
    {
    id: 2,
    stat: 108000,
    title: 'Pending Profits'
  },
    {
    id: 23,
    stat: 104000,
    title: 'Total Profits'
  },

]
const NewHero = () => {
  return (
    <section className="bg-publichero bg-cover bg-center w-full h-screen">
<div className='p-8 mx-auto flex justify-between flex-col space-y-8 w-[95%] md:w-[85%]'>
          <NewNav />
          <div className='flex flex-col space-y-8 mx-auto w-full justify-center items-center max-w-[770px]'>
<h1 className='font-grok mt-12 -tracking-[2px] md:tracking-normal gradient-text font-bold leading-[33.51px] md:leading-[79.48px] text-[40.72px] md:text-[79.48px] text-center'>
  Snipe Meme Tokens Before They Moon.
</h1>
<p className="mt-6 text-[#ffffff70] text-[12px] md:text-[19px] text-center leading-[100%]">
  Real-time intelligence from Twitter, meme trends, and on-chain data — enabling you to buy before the crowd even sees it.
</p>
 <Link
          href={"/runner"}
          className="w-[130px] hidden h-[48px] md:w-56 md:flex justify-center items-center md:h-[54px] bg-[#ff4c02] rounded border-none text-white hover:bg-[#e63d00] transition-colors duration-300"
        >
          <div className="font-['Space_Grotesk',Helvetica] backdrop-blur-sm font-normal text-[16.3px] text-center tracking-[-0.65px] leading-normal">
            Snipe now
          </div>
        </Link>
          </div>
        
      <div className='flex mx-auto mt-20 gap-8 justify-between max-w-[779px]'>
        {stats.map((stat) => (<div
        className='border-[#FFFFFF33] font-grok  flex flex-col justify-center items-center border px-8 py-6 bg-[#040A0EC4] rounded-[13.4px]'
        key={stat.id}> 
<h3 className='text-[#FFFFFF] text-[37.4px] font-bold'>${stat.stat}</h3>
<p className='text-sm text-white '>{stat.title}</p>

          </div>))}
      </div>
</div>
        </section>
  );
}

export default NewHero