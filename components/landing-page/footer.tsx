import React from 'react'
import { Icons } from '../shared/icons'

const footerlinks = [
  {
    id: 1,
    icon: Icons.xicon,
    href: 'https://twitter.com/socialsniperai',
  },
  // {
  //   id: 2,
  //   icon: Icons.telegram,
  //   href: 'https://t.me/yourchannel',
  // },
  // {
  //   id: 1665,
  //   icon: Icons.discord,
  //   href: 'https://discord.gg/yourinvite',
  // },
]

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='bg-[#00090F] py-16'>
      <div className='mx-auto flex md:flex-row flex-col space-y-6 items-center justify-between w-[90%] md:w-[80%]'>
        <div onClick={scrollToTop} className='cursor-pointer'>
          <Icons.logo className='size-24' />
        </div>

        <a
          href='mailto:hello@socialsniper.ai'
          className='text-[#FFFFFF70] text-2xl hover:underline'
        >
          hello@socialsniper.ai
        </a>

        <div className='flex gap-4'>
          {footerlinks.map((footer) => (
            <a
              key={footer.id}
              href={footer.href}
              target='_blank'
              rel='noopener noreferrer'
              className='p-3 rounded-sm bg-[#FFFFFF0A] border-[#FFFFFF38] border'
            >
              <footer.icon className='size-6' />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
