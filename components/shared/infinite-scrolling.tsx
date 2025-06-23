'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
const steps = [
    {
        step: 1,
        name: "Detect Memes & Influencer Signals",
        desc: "Social Sniper monitors Twitter 24/7 to detect trending memes, tweets, and potential contract drops."
    },
    {
        step: 2,
        name: "Spot Token Drops Instantly",
        desc: "We calculate engagement scores, mention spikes, liquidity lock status, and red flags — instantly."
    },
    {
        step: 3,
        name: "Auto-Buy or Snipe Instantly",
        desc: "When tokens are being pumped, our sniper bots instantly buy or snipe, saving you time and emotion."
    }
]

export const InfiniteStepsCarousel = ({
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const content = Array.from(scrollerRef.current.children);
      content.forEach((item) => {
        const clone = item.cloneNode(true);
        scrollerRef.current!.appendChild(clone);
      });

      containerRef.current.style.setProperty(
        '--animation-direction',
        direction === 'left' ? 'forwards' : 'reverse'
      );

      const duration =
        speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s';
      containerRef.current.style.setProperty('--animation-duration', duration);

      setStart(true);
    }
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller container-new relative z-10 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {steps.map((step, idx) => (
          <li
            key={idx}
            className="relative w-[280px] space-y-4 sm:w-[320px] md:w-[420px] shrink-0   px-6 py-6 backdrop-blur-md"
          >
            <div className="mb-3 w-fit p-2 flex gap-2 items-center border-[#FF8F61] bg-[#FF8F61]/10 border-2 rounded-[12px]">
              <p className="text-[#FF8F61] font-bold text-sm">STEP</p>
              <span className="text-[#FF8F61] font-semibold text-sm">
                {step.step}
              </span>
            </div>
            <h5 className="gradient-text text-xl md:text-[32px] font-bold mb-2">{step.name}</h5>
            <p className="text-[#FFFFFF8A]  text-[19px] leading-snug font-inter">
              {step.desc}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
