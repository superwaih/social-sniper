'use client';

import { FC } from 'react';
import { Icons } from '@/components/shared/icons';

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};


const StatCard: FC<StatCardProps> = ({ title, value, subtitle }) => (
  <div className="relative border-[#779CBF38] space-y-6 h-[158px]  rounded-[6px] pt-[10px] px-[19px] bg-[#06131B] border overflow-hidden">
    <div
      className="w-[200px] h-[120px] overflow-hidden -top-2 -right-24 rounded-full absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-30 pointer-events-none"
    />
  
    <div className='flex gap-4 items-center'>
      <Icons.snipeOverviewIcon />
      <div className="text-[14px] text-[#FFFFFF73] uppercase tracking-wide ">{title}</div>
    </div>
    <div className="font-grok flex gap-3  items-center">
      <div className="text-[48px] text-[#FFFFFFBF] font-semibold">{value}</div>
      <div className="text-[13.89px] pt-6 text-[#FFFFFF] tracking-wide uppercase">{subtitle}</div>
    </div>
  </div>
);



export default StatCard;
