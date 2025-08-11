'use client'

import { motion } from "framer-motion"
import PricingCard from './pricing-card'
import { useState } from 'react'
import SubscriptionModal from './subscription-modal'

const PricingSection = () => {
  const [open, setOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<"SNIPER BASIC" | "SNIPER PRO" | null>(null)
  const basicPlan = {
    title: "SNIPER BASIC",
    description: "Perfect for trendspotters who want insights without automation.",
    price: 25,
    features: [
      "Runner Reports (AI-powered meme & trend signals)",
      "Twitter Target Scanning",
    ],
    buttonText: "Purchase Plan",
  }

  const proPlan = {
    title: "SNIPER PRO",
    description: "Full automation. For the snipers who never sleep.",
    price: 50,
    features: [
      "Everything in Basic",
      "Auto Sniping (Pre-set triggers, auto-execute)",
    ],
    buttonText: "Purchase Plan",
    isPro: true,
  }

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <motion.section
      id="pricing"
      className="bg-[#00090F] py-16 px-4 min-h-[60vh]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-col space-y-8 justify-center my-20 items-center"
        variants={childVariants}
      >
        <h4 className='text-[23.58px] md:text-[50px] leading-normal md:leading-[60.1px] gradient-text max-w-[628px] font-bold text-center'>
          Simple Pricing for Serious Meme Snipers
        </h4>
        <p className="font-['Space_Grotesk',Helvetica] max-w-[720px] text-sm font-normal text-[#FFFFFF70] md:text-[19px] text-center leading-normal">
          Choose your plan. Start sniping with confidence. Powered by Solana.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col lg:flex-row justify-center mx-auto w-full md:w-[70%] items-center gap-8 px-4"
        variants={containerVariants}
      >
        <motion.div variants={childVariants}>
      <PricingCard {...basicPlan} delay={0.1} onPurchase={() => { setSelectedPlan('SNIPER BASIC'); setOpen(true) }} />
        </motion.div>
        <motion.div variants={childVariants}>
      <PricingCard {...proPlan} delay={0.3} onPurchase={() => { setSelectedPlan('SNIPER PRO'); setOpen(true) }} />
        </motion.div>
      </motion.div>

    <SubscriptionModal open={open} onOpenChange={(v)=>{ if(!v) setSelectedPlan(null); setOpen(v) }} plan={selectedPlan} />
    </motion.section>
  )
}

export default PricingSection
