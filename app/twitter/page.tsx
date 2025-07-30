"use client"
import React from 'react'
import DashboardLayout from '../components/shared/dashboard-layout'
import { Icons } from '@/components/shared/icons'
import TargetsTable from './components/targets-table'
import { TwitterTargetFilters, useGetTargets } from '@/service/target'
import { useWallet } from '@solana/wallet-adapter-react'

const Twitter = () => {
  const {publicKey} = useWallet()
    const filters: TwitterTargetFilters = {
    engagement_score: 0,
    min_followers: 1404,
    username: "TheCryptoCajun",
    verification_status: true,
    account_age: 2,
    startDate: "2025-06-01",
    endDate: "2025-06-28"
  };
  
  const { data, isLoading} = useGetTargets(publicKey?.toBase58() ?? '', filters);
  console.log(data)
  return (
    <DashboardLayout>

     <section className="flex flex-col space-y-4">
          <h2 className="text-[40.41px]   -leading-[1%] text-[#FFFFFFBF]">
            TWITTER TARGETS
          </h2>
          <div className="bg-[#091820] p-[14px] flex justify-between items-center">
            <p className="flex gap-2  text-[#FFFFFF94] items-center">
              {/* <span className="text-lg  "></span> */}
              <Icons.refresh className="text-[#FFFFFF94]" />
            </p>
            <div className='flex gap-4 items-center'>
              <div className="border-[#779CBF6B] flex gap-3 items-center border p-3 rounded-[4px]">
                <Icons.filterIcon className="text-[#FFFFFF8A] text-sm" />
                <p className="text-[#FFFFFF8A] text-sm">ACCOUNT FILTERS</p>
              </div>
              <div className="border-[#779CBF6B] flex gap-3 items-center border p-3 rounded-[4px]">
                <Icons.filterIcon className="text-[#FFFFFF8A] text-sm" />
                <p className="text-[#FFFFFF8A] text-sm">FILTER MEANING</p>
              </div>
            </div>
          </div>

          <TargetsTable
          isLoading={isLoading}
          data={data?.result ?? []}
          />
        </section>
    </DashboardLayout>
  )
}

export default Twitter