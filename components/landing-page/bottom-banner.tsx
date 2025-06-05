"use client";

import React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export const BottomBanner = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const gradientVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 0.29,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };



  return (
    <section
      className="flex flex-col h-[434px] items-center justify-center relative bg-[#00060c] overflow-hidden"
      ref={ref}
    >
      {/* Animated Background Gradients */}
      <motion.div
        className="w-[648px] h-[648px] top-[-349px] left-[432px] rounded-[324px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)]"
        variants={gradientVariants}
        initial="hidden"
        animate={
          isInView
            ? {
                ...gradientVariants.visible,
                scale: [1, 1.1, 1],
                opacity: [0.29, 0.4, 0.29],
              }
            : "hidden"
        }
        transition={{
          ...gradientVariants.visible.transition,
          scale: {
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          opacity: {
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        className="size-[200px] md:w-[671px] md:h-[671px] top-[154px] left-[-42px] rounded-[335.5px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)]"
        variants={gradientVariants}
        initial="hidden"
        animate={
          isInView
            ? {
                ...gradientVariants.visible,
                scale: [1, 1.1, 1],
                opacity: [0.29, 0.4, 0.29],
              }
            : "hidden"
        }
        transition={{
          ...gradientVariants.visible.transition,
          scale: {
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1, // Offset the second gradient animation
          },
          opacity: {
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          },
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col max-w-[720px] items-center gap-[30px] py-[112px]"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          className="flex flex-col items-center gap-4 w-full"
          variants={containerVariants}
        >
          <motion.h1
            className="text-2xl md:text-4xl gradient-text max-w-[528px] font-medium text-center"
            variants={textVariants}
          >
            Ready to Front-Run the Timeline?
          </motion.h1>

          <motion.p
            className="[font-family:'Space_Grotesk',Helvetica] font-normal text-[#ffffff70] text-xl text-center leading-normal"
            variants={textVariants}
          >
            Join thousands of early snipers already securing entries. Your alpha
            advantage starts now.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex md:flex-row flex-col gap-[30px]"
          variants={buttonContainerVariants}
        >
          <motion.div variants={buttonVariants}>
            <Link href="/sniper">
              <motion.div
                className="px-12 py-3 bg-[#ff4c02] [font-family:'Space_Grotesk',Helvetica] font-normal text-white text-[16.3px] tracking-[-0.65px] rounded cursor-pointer relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#e64400",
                  boxShadow: "0 10px 30px rgba(255, 76, 2, 0.4)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#ff4c02] to-[#ff6b2b] opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Snipe now</span>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div variants={buttonVariants}>
            <Link href="/">
              <motion.div
                className="gradient-border px-8 py-3 [font-family:'Space_Grotesk',Helvetica] gradient-text font-medium text-[16.3px] cursor-pointer relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#ff4c02]/10 to-[#ff6b2b]/10 opacity-0 rounded"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Learn more</span>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-[#ff4c02] rounded-full opacity-30"
          style={{
            left: `${15 + i * 20}%`,
            top: `${20 + i * 15}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </section>
  );
};
