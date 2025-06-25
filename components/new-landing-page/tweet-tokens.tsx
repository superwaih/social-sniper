'use client';
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { motion } from 'framer-motion';
import { InfiniteStepsCarousel } from '../shared/infinite-scrolling';

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const TweetTokens = () => {
  return (
    <motion.section
      className="bg-black"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Heading */}
      <motion.div
        variants={fadeUpVariant}
        className="flex flex-col max-w-[517px] mx-auto text-center"
      >
        <h1 className="font-grok mt-12 -tracking-[2px] md:tracking-normal gradient-text font-bold leading-[33.51px] md:leading-[60.1px] text-[30.72px] md:text-[57.48px]">
          From Tweet to Token. In Seconds.
        </h1>
      
      </motion.div>

      <div className='max-w-[765px] w-full text-center mx-auto'>
          <p className="mt-6 text-[#ffffff70] font-inter text-[12px] md:text-[18.88px] leading-snug">
          “Powered by real-time Twitter & on‑chain data for lightning-fast meme-token insight.”
        </p>
      </div>

      {/* Divider Image */}
      <motion.div
        variants={fadeUpVariant}
        className="container-new py-5"
      >
        <img src="/images/line-1.png" className="h-[80px] w-full" alt="Divider" />
      </motion.div>

      {/* Carousel (already animated separately) */}
      <InfiniteStepsCarousel speed="fast" direction="left" />

      {/* Flowchart */}
      <motion.div
        variants={fadeUpVariant}
        className="container-new mt-12 w-full"
      >
        <img
          src="/images/flow-chart.webp"
          className="w-full "
          alt="flowchart"
        />
      </motion.div>
    </motion.section>
  );
};

export default TweetTokens;
