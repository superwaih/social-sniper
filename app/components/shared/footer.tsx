import { footerLinks } from '@/utils/constants'
import React from 'react'

const Footer = () => {
  return (
    <div className='py-8 border-t border-brandgray w-full'>
       <div className='flex  justify-between px-8 w-full g'>
        {footerLinks.map((footer) =>(
            <div className='text-sm   text-[#FFFFFF75]' key={footer.id}>
                {footer.name}

            </div>
        ))}

       </div>
    </div>
  )
}

export default Footer