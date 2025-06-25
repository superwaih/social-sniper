'use client';
import React from 'react';
import { motion } from 'framer-motion';
import NewNav from './new-nav';
import Link from 'next/link';
import { Icons } from '../shared/icons';

const stats = [
  { id: 1, stat: 100000, title: 'Realized Profits' },
  { id: 2, stat: 108000, title: 'Pending Profits' },
  { id: 3, stat: 104000, title: 'Total Profits' },
];


const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const dividerVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut', delay: 1.6 } },
};

const NewHero = () => {
  return (
    <section className="bg-publichero relative bg-cover bg-center w-full min-h-[900px] flex flex-col">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="p-4 sm:p-6 lg:p-8 mx-auto flex justify-between flex-col space-y-6 sm:space-y-8 w-[95%] md:w-[85%] flex-1"
      >
        <NewNav />

        {/* Hero Content */}
        <motion.div
          variants={fadeUpVariant}
          className="flex flex-col space-y-8 mx-auto justify-center items-center w-full flex-1"
        >
          <h1 className="font-grok max-w-[800px] mt-6 sm:mt-12 -tracking-[1px] sm:-tracking-[2px] z-20 md:tracking-normal gradient-text font-bold leading-[28px] sm:leading-[34px] md:leading-[79.48px] text-[28px] sm:text-[40.72px] md:text-[79.48px] text-center px-4">
            Snipe Meme Tokens Before They Moon.
          </h1>

          <p className="text-[#ffffff70] max-w-[800px] font-inter text-[14px] sm:text-[16px] md:text-[19px] text-center leading-[120%] sm:leading-[100%] px-4 ">
            Real-time intelligence from Twitter, meme trends, and on-chain data — enabling you to buy before the crowd even sees it.
          </p>

          {/* CTA Button */}
          <Link
            href="/runner"
            className="w-[140px] h-[48px] sm:w-[160px] sm:h-[50px] md:w-56 flex justify-center items-center md:h-[54px] bg-[#ff4c02] rounded border-none text-white hover:bg-[#e63d00] transition-colors duration-300"
          >
            <div className="font-['Space_Grotesk',Helvetica] backdrop-blur-sm font-normal text-[14px] sm:text-[15px] md:text-[16.3px] text-center tracking-[-0.65px] leading-normal">
              Snipe now
            </div>
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={fadeUpVariant}
          className="flex mx-auto z-50 gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-center items-center w-full max-w-[879px] flex-wrap sm:flex-nowrap px-4 sm:px-0"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={fadeUpVariant}
              className="border-[#FFFFFF33] font-grok min-h-[120px] sm:min-h-[140px] md:min-h-[154px] w-full sm:min-w-[200px] md:min-w-[257px] flex flex-col justify-center items-center border px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-[#040A0EC4] rounded-[13.4px] backdrop-blur-sm"
            >
              <h3 className="text-[#FFFFFF] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[37.4px] font-bold text-center">
                +${stat.stat.toLocaleString()}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white text-center mt-1">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider Icon (comes in last) */}
        <motion.div
          variants={dividerVariant}
          className="absolute bottom-[20%] sm:bottom-[15%]  transform   min-w-[1500px] w-full flex justify-center"
        >
          <Icons.divideicon />
        </motion.div>
      
      </motion.div>
    </section>
  );
};

export default NewHero;
