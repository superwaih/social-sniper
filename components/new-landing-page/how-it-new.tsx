'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const cards = [
  { id: 1, imgSrc: '/images/detect-1.webp' },
  { id: 2, imgSrc: '/images/detect-2.webp' },
  { id: 3, imgSrc: '/images/detect-3.webp' },
];

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const HowitWorksNew = () => {
  return (
    <motion.section
      id="how-it-works-content"
      className="bg-black  py-12  flex flex-col space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header Content */}
      <motion.div
        variants={fadeUpVariant}
        className="flex flex-col max-w-[920px] mx-auto text-center"
      >
        <h1 className="font-grok mt-12 -tracking-[2px] md:tracking-normal gradient-text font-bold leading-[33.51px] md:leading-[50.1px] text-[30.72px] md:text-[47.48px]">
          Your Meme Detection Engine. Built on Social + On-Chain Signals.
        </h1>
        <p className="mt-6 text-[#ffffff70] font-inter text-[12px] md:text-[18.88px] leading-snug">
          We unify influencer tweets, meme hashtags, smart contract launches, and AI-powered analysis into one seamless sniper flow.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        className="container-new gap-8  mt-8 flex lg:flex-row flex-col justify-between  "
      >
        {cards.map((card) => (
          <motion.div variants={fadeUpVariant} key={card.id}>
            <Image
              src={card.imgSrc}
              width={414}
              height={500}
              alt={`card-${card.id}`}
              className="rounded-lg"
            />
          </motion.div>
        ))}
      </motion.div>
      
    </motion.section>
  );
};

export default HowitWorksNew;
