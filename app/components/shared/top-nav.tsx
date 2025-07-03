"use client"
import React from 'react'
import { Icons } from '@/components/shared/icons';
import UserProfileSidebar from '../sheets/user-profile-sheet';
import { WalletConnectButton } from '@solana/wallet-adapter-react-ui';

const TopNav = () => {
  
  return (
    <div className="border-b py-[1.64rem] justify-end px-4 flex items-center border-brandgray">
      <div className='gap-4 flex '>
     <WalletConnectButton className="active-btn flex gap-3 items-center px-4 py-2">
  <Icons.walletIcon />
  <p className="max-w-[70px] text-start leading-[11.08px] font-medium text-[11.01px]">
    Connect wallet
  </p>
</WalletConnectButton>

<UserProfileSidebar />
        {/* <div className="flex items-center rounded-full border-white border p-2">
          <AudioWaveform className="text-[#779CBF38]" />
        </div> */}
      </div>
    </div>
  );
}

export default TopNav