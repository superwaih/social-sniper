import { Icons } from '@/components/shared/icons';
import React from 'react'
import RunnerTable from './components/runner-table';

const Runner = () => {
  return (
    <section className="flex flex-col space-y-4">
      <h2 className="text-[40.41px] font-mono -leading-[1%] text-[#FFFFFFBF]">
        RUNNER REPORTS
      </h2>
      <div className="bg-[#091820] p-[14px] flex justify-between items-center">
        <p className="flex gap-2  text-[#FFFFFF94] items-center">
          <span className="text-lg font-mono">NEW RUNNERS</span>
          <Icons.refresh className="text-[#FFFFFF94]" />
        </p>
        <div className='flex gap-4 items-center'>
          <div className="border-[#779CBF6B] flex gap-3 items-center border p-3 rounded-[4px]">
            <Icons.filterIcon className="text-[#FFFFFF8A] text-sm" />
            <p className="text-[#FFFFFF8A] text-sm">RUNNER FILTERS</p>
          </div>
          <div className="border-[#779CBF6B] flex gap-3 items-center border p-3 rounded-[4px]">
            <Icons.filterIcon className="text-[#FFFFFF8A] text-sm" />
            <p className="text-[#FFFFFF8A] text-sm">RUNNER FILTERS</p>
          </div>
        </div>
      </div>
      <RunnerTable />
    </section>
  );
}

export default Runner