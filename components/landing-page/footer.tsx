import React from 'react'
import { Icons } from '../shared/icons'
const footerlinks = [
    {
        id:1,
        icon: Icons.xicon
    },
    {
        id:2,
        icon: Icons.telegram
    },
    {
        id:1665,
        icon: Icons.discord
    },
]
const Footer = () => {
  return (
    <footer className='bg-[#00090F] py-16'>
        <div className='mx-auto flex md:flex-row flex-col space-y-6 items-center justify-between w-[90%] md:w-[80%]'>
<Icons.logo className='size-24 ' />
<p className='text-[#FFFFFF70] text-2xl'>hello@socialsniper.ai</p>
<div className='flex gap-4'>
   {footerlinks.map((footer) => (
        <div className='p-3 rounded-sm bg-[#FFFFFF0A] border-[#FFFFFF38] border' key={footer.id}>
<footer.icon className='size-6' />
        </div>
   ))}
</div>
        </div>
    </footer>
  )
}

export default Footer