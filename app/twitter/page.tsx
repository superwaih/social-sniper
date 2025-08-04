"use client"
import React, { useState } from 'react'
import DashboardLayout from '../components/shared/dashboard-layout'
import { Icons } from '@/components/shared/icons'
import TargetsTable from './components/targets-table'
import { useGetAllTargets } from '@/service/target'
import { useWallet } from '@solana/wallet-adapter-react'
import TargetAddDialog from './components/add-new-target'
// import { toast } from 'sonner'

const Twitter = () => {
  const {publicKey} = useWallet()
  //   const filters: TwitterTargetFilters = {
  //   engagement_score: 0,
  //   min_followers: 1404,
  //   username: "TheCryptoCajun",
  //   verification_status: true,
  //   account_age: 2,
  //   startDate: "2025-06-01",
  //   endDate: "2025-06-28"
  // };
  
  const { data, isLoading} = useGetAllTargets(publicKey?.toBase58() ?? '');
const [isOpen, setIsOpen] = useState(false)
console.log(data)
  return (
    <DashboardLayout>

     <section className="flex flex-col space-y-4">
          <h2 className="text-[40.41px]   -leading-[1%] text-[#FFFFFFBF]">
            TWITTER TARGETS
          </h2>
          <div className="bg-[#091820] p-[14px] flex justify-between items-center">
            <p className="flex gap-2  text-[#FFFFFF94] items-center">
          
              <Icons.refresh className="text-[#FFFFFF94]" />
            </p>
            <div className='flex gap-4 items-center'>
              <button onClick={() => {
                  setIsOpen(true)

                if(!publicKey){
                  // toast.error('Login First')
                  // return 
                }else{
                  setIsOpen(true)
                }
              }} className="rounded-md border border-[rgba(255,76,2,0.8)] text-white bg-[linear-gradient(90deg,rgba(255,76,2,0.4958)_0%,rgba(35,20,15,0.67)_100%)] hover:opacity-90 transition uppercase flex gap-3 items-center px-4 py-2">
              <Icons.refresh className="text-[#FFFFFF94]" />

                <p className="text-[#FFFFFF8A] text-sm">ADD TARGET</p>
              </button>
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

          <TargetAddDialog open={isOpen}  setOpen={setIsOpen} />
        </section>
    </DashboardLayout>
  )
}

export default Twitter