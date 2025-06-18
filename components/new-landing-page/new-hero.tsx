import React from 'react'
import NewNav from './new-nav';
import Link from 'next/link';
import { Icons } from '../shared/icons';

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
    id: 3,
    stat: 104000,
    title: 'Total Profits'
  },
]

const NewHero = () => {
  return (
    <section className="bg-publichero relative bg-cover bg-center w-full min-h-[839px] flex flex-col">
      <div className='p-4 sm:p-6 lg:p-8 mx-auto flex justify-between flex-col space-y-6 sm:space-y-8 w-[95%] md:w-[85%] flex-1'>
        <NewNav />
        
        {/* Hero Content */}
        <div className='flex flex-col space-y-8 sm:space-y-12 mx-auto w-full justify-center items-center    max-w-[770px] flex-1'>
          <h1 className='font-grok mt-6 sm:mt-12 -tracking-[1px] sm:-tracking-[2px] md:tracking-normal gradient-text font-bold leading-[28px] sm:leading-[34px] md:leading-[79.48px] text-[28px] sm:text-[40.72px] md:text-[79.48px] text-center px-4'>
            Snipe Meme Tokens Before They Moon.
          </h1>
          
          <p className="text-[#ffffff70] text-[14px] sm:text-[16px] md:text-[19px] text-center leading-[120%] sm:leading-[100%] px-4 max-w-[600px]">
            Real-time intelligence from Twitter, meme trends, and on-chain data — enabling you to buy before the crowd even sees it.
          </p>
          
          {/* CTA Button */}
          <Link
            href={"/runner"}
            className="w-[140px] h-[48px] sm:w-[160px] sm:h-[50px] md:w-56 flex justify-center items-center md:h-[54px] bg-[#ff4c02] rounded border-none text-white hover:bg-[#e63d00] transition-colors duration-300"
          >
            <div className="font-['Space_Grotesk',Helvetica] backdrop-blur-sm font-normal text-[14px] sm:text-[15px] md:text-[16.3px] text-center tracking-[-0.65px] leading-normal">
              Snipe now
            </div>
          </Link>
        </div>

        {/* Divider Icon */}
        <div className='absolute bottom-[20%] sm:bottom-[15%] left-1/2 transform -translate-x-1/2 w-full flex justify-center'>
          <Icons.divideicon />
        </div>

        {/* Stats Cards */}
        <div className='flex mx-auto z-50 gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-center items-center w-full max-w-[879px] flex-wrap sm:flex-nowrap px-4 sm:px-0'>
          {stats.map((stat) => (
            <div
              className='border-[#FFFFFF33] font-grok min-h-[120px] sm:min-h-[140px] md:min-h-[154px] w-full sm:min-w-[200px] md:min-w-[257px] flex flex-col justify-center items-center border px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-[#040A0EC4] rounded-[13.4px] backdrop-blur-sm'
              key={stat.id}
            >
              <h3 className='text-[#FFFFFF] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[37.4px] font-bold text-center'>
                ${stat.stat.toLocaleString()}
              </h3>
              <p className='text-xs sm:text-sm md:text-base text-white text-center mt-1'>
                {stat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewHero