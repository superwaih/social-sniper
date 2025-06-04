import React from 'react'
import { Icons } from '../shared/icons';

const specs = [
  {
    id: 1,
    text: 'Locked Liquidity',
  },
  {
    id: 2,
    text: 'See Trusted Accounts',
  },
  {
    id: 3,
    text: 'Buy/Sell Pressure',
  },
  {
    id: 4,
    text: 'Contract Health and Activity',
  },
  
]
const BuiltBanner = () => {
  return (
    <section className="bg-[#00090F] py-16">
      <div>
        <div className="flex flex-col space-y-8  justify-center my-20  items-center ">
          <h1 className="text-2xl md:text-4xl gradient-text max-w-[528px] font-medium text-center">
            Built for Degens, Backed by Logic
          </h1>
           <p className="font-['Space_Grotesk',Helvetica] text-cemter max-w-[720px] font-normal text-[#FFFFFF70] text-[19px] text-center leading-normal">
          Detect viral meme tokens the moment they hit Twitter — and auto-buy
          them before the rest of the market catches on.
        </p>
        </div>
        <div className='mx-auto w-[90%] md:w-[70%]'>
<div className='flex gap-6 w-full justify-between'>
{specs.map((spec) => (
  <div
    key={spec.id}
    className="bg-[#060F15] px-6 py-3  flex gap-3 items-center p-3 rounded-[11px] mb-4">
      <Icons.checkmark />
    <p className="text-[#FFFFFF8F] grok">{spec.text}</p>
      </div>
))}
</div>
        </div>
      </div>
    </section>
  );
}

export default BuiltBanner