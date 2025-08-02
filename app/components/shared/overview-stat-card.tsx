'use client';

import { FC } from 'react';
import { Icons } from '@/components/shared/icons';

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};

const StatCard: FC<StatCardProps> = ({ title, value, subtitle }) => (
  <div className="border-[#779CBF38] space-y-6 h-[148px] rounded-[6px] pt-[23px] px-[19px] bg-cover bg-card border">
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
