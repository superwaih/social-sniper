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
        className="flex flex-col max-w-[500px] mx-auto text-center"
      >
        <h1 className="font-grok mt-12 -tracking-[2px] md:tracking-normal gradient-text font-bold leading-[33.51px] md:leading-[50.1px] text-[30.72px] md:text-[47.48px]">
          From Tweet to Token. In Seconds.
        </h1>
        <p className="mt-6 text-[#ffffff70] font-inter text-[12px] md:text-[18.88px] leading-[100%]">
          “Powered by real-time Twitter & on‑chain data for lightning-fast meme-token insight.”
        </p>
      </motion.div>

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
          className="w-full max-w-6xl mx-auto"
          alt="flowchart"
        />
      </motion.div>
    </motion.section>
  );
};

export default TweetTokens;
