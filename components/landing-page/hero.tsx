/* eslint-disable @next/next/no-img-element */
"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import LandingNavbar from "./landing-navbar"

export const Hero = () => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
  }

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  }

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(255, 76, 2, 0.3)",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  }

  const imageVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.25, 0, 1],
        delay: 0.4,
      },
    },
  }

  const gradientVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 0.29,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="home" className="relative p-4 overflow-hidden md:h-screen container-new" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <LandingNavbar />
      </motion.div>

      <motion.div
        className="max-w-[720px] mt-16 md:mt-32 w-full mx-auto items-center justify-center flex flex-col space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          className="font-grok mt-12 max-w-[253px] md:max-w-[720px] -tracking-[2px] md:tracking-normal text-white leading-[33.51px] md:leading-[72px] text-[40.72px] md:text-[79px] text-center"
          variants={textVariants}
        >
          Be First. Be Fast. Be a{" "}
          <motion.span
            className="text-[#ff4c02] font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: [0.25, 0.25, 0, 1],
            }}
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px rgba(255, 76, 2, 0.5)",
              transition: { duration: 0.2 },
            }}
          >
            Social Sniper<span className="text-white">.</span>
          </motion.span>
        </motion.h2>

        <motion.p
          className="mt-4 text-[#ffffff70] text-[12px] md:text-[19px] text-center leading-[100%]"
          variants={textVariants}
        >
          Detect viral meme tokens the moment they hit Twitter — and auto-buy them before the rest of the market catches
          on.
        </motion.p>

        <motion.div variants={buttonVariants}>
          <Link href="/">
            <motion.div
              className="w-56 flex items-center justify-center h-[54px] bg-[#ff4c02] rounded border-none text-white cursor-pointer relative overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#ff4c02] to-[#ff6b2b] opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="font-['Space_Grotesk',Helvetica] font-normal text-[16.3px] text-center tracking-[-0.65px] leading-normal relative z-10">
                Snipe now
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Animated Background Gradients */}
      <motion.div
        className="absolute w-[400px] md:w-[671px] h-[271px] top-[100px] md:top-[250px] left-[83px] rounded-[335.5px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)]"
        variants={gradientVariants}
        initial="hidden"
        animate={
          isInView
            ? {
                ...gradientVariants.visible,
                scale: [1, 1.05, 1],
                opacity: [0.29, 0.4, 0.29],
              }
            : "hidden"
        }
        transition={{
          ...gradientVariants.visible.transition,
          scale: {
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          opacity: {
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        className="absolute w-[450px] md:w-[671px] h-[200px] md:h-[671px] md:top-[150px] right-[83px] rounded-[335.5px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)]"
        variants={gradientVariants}
        initial="hidden"
        animate={
          isInView
            ? {
                ...gradientVariants.visible,
                scale: [1, 1.05, 1],
                opacity: [0.29, 0.4, 0.29],
              }
            : "hidden"
        }
        transition={{
          ...gradientVariants.visible.transition,
          scale: {
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          opacity: {
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      />

      {/* Responsive Animated Hero Image */}
      <motion.div
        className="mx-auto w-full max-w-[1010px] h-[300px] md:h-[660px] relative pt-8 md:pt-20"
        variants={imageVariants}
        initial="hidden"
        animate={
          isInView
            ? {
                ...imageVariants.visible,
                y: [-10, 10, -10],
                transition: {
                  ...imageVariants.visible.transition,
                  y: {
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                },
              }
            : "hidden"
        }
      >
        <motion.div
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          className="relative w-full h-full" // Changed to h-full to use all available height
        >
          {/* Mobile Image */}
          <img
            src="/mobile-hero.png"
            alt="Hero Image Mobile"
            className="absolute bottom-0 md:hidden w-full h-full" // Removed scale-110
          />

          {/* Desktop Image */}
          <Image
            src="/heroo-img.png"
            fill
            alt="Hero Image Desktop"
            className="drop-shadow-2xl object-contain hidden md:block"
            sizes="(min-width: 768px) 1010px, 0vw"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Floating Particles Effect */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#ff4c02] rounded-full opacity-20"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </section>
  )
}