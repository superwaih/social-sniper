import React from 'react'
import { Icons } from '../shared/icons'

const Footer = () => {
  return (
    <footer className='bg-[#00090F] py-16'>
        <div className='mx-auto flex items-center justify-between w-[90%] md:w-[80%]'>
<Icons.logo className='w-20 h-20 mb-4' />
<p className='text-[#FFFFFF70] text-2xl'>hello@socialsniper.ai</p>

        </div>
    </footer>
  )
}

export default Footer