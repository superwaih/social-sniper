/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect } from 'react'
import { Icons } from '@/components/shared/icons';
import UserProfileSidebar from '../sheets/user-profile-sheet';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { shortenAddress } from '@/utils/constants';
import { useLoginFn } from '@/service/user';
import { toast } from "sonner"
// import { useLoginFn } from '@/service/user';

const TopNav = () => {
  const { publicKey } = useWallet();
  const {mutate: loginFn} = useLoginFn()

  const handleLogin = () =>{
    const data = {
      publicKey: publicKey?.toBase58() ?? ''
    }
    loginFn(data, {
      onSuccess: (res) =>{
        console.log(res, 'results faata')
        toast.success(res?.message)
      },
      onError: (err) => {
        console.log(err, 'error data')
        toast.error('An Error Occured')
      }
    })
  }

  useEffect(() => {
    if(publicKey){
      handleLogin()
    }
  }, [publicKey])

  console.log(publicKey)
  return (
    <div className="border-b py-[1.64rem] justify-end px-4 flex items-center border-brandgray">
      <div className='gap-4 flex '>
     <WalletMultiButton className="rounded-md border border-[rgba(255,76,2,0.8)] text-white bg-[linear-gradient(90deg,rgba(255,76,2,0.4958)_0%,rgba(35,20,15,0.67)_100%)] hover:opacity-90 transition uppercase flex gap-3 items-center px-4 py-2">
 {
  publicKey ?

  <>
  <p>{shortenAddress(publicKey?.toBase58() ?? '')}</p>
  </>
  :
  <>
   <Icons.walletIcon />
  <p className="max-w-[70px] text-start leading-[11.08px] font-medium text-[11.01px]">
    Connect wallet
  </p>
  </>
 }
     </WalletMultiButton>
{/* <button className='active-btn' onClick={handleLogin}>login</button> */}

<UserProfileSidebar />
        
      </div>
    </div>
  );
}

export default TopNav