'use client'

import { Crosshair } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface PricingCardProps {
  title: string
  description: string
  price: number
  features: string[]
  buttonText: string
  isPro?: boolean
  delay?: number // optional delay for staggered cards
  onPurchase?: () => void
}

export default function PricingCard({
  title,
  description,
  price,
  features,
  buttonText,
  delay = 0,
  onPurchase,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative p-4 sm:p-6 bg-[#00090F] border border-[#FFFFFF12] rounded-[20px] overflow-hidden w-full max-w-md"
    >
      <div className="rounded-[20px] bg-price bg-cover border border-[#FFFFFF24] p-6 sm:p-8 h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="py-6 space-y-3">
            <h3 className="text-white text-2xl sm:text-3xl md:text-[30px]">{title}</h3>
            <p className="text-[#FFFFFF8A] font-inter text-sm sm:text-base">{description}</p>
          </div>

          <div className="flex my-6 sm:my-8 items-baseline flex-wrap">
            <span className="text-white font-bold text-5xl sm:text-6xl md:text-[clamp(3rem,10vw,90px)] leading-none">
              <span className="gradient-text">${price}</span>
            </span>
            <span className="text-[#FFFFFF8A] text-lg sm:text-xl font-inter ml-2">/month</span>
          </div>

          <div className="mt-6 sm:mt-8 mb-8 sm:mb-12">
            <h4 className="text-[#FFFFFF8A] font-inter text-base font-medium mb-2">Features included</h4>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + 0.2 + index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-2 text-sm sm:text-base font-inter"
                >
                  <Crosshair className="w-4 h-4 text-[#FF4500] mt-1 shrink-0" />
                  <span className="text-[#FFFFFF8A]">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

  <Button onClick={onPurchase} className="w-full h-12 flex justify-center items-center bg-[#ff4c02] text-white rounded border-none hover:bg-[#e63d00] transition-colors duration-300">
          {buttonText}
        </Button>
      </div>
    </motion.div>
  )
}
