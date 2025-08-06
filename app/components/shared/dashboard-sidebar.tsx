"use client"
import { Icons } from '@/components/shared/icons';
import { dashboardLinks } from '@/utils/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { useAppTheme } from '@/hooks/useAppTheme';

const DashboardSidebar = () => {
    const pathname = usePathname()
    const { currentTheme } = useAppTheme();

  return (
    <section className="border-r flex flex-col  w-full  pl-6 max-w-[338px] border-brandgray  ">
      <div className="border-b flex justify-start items-start pt-8 pb-3 border-brandgray">
        <p className="font-pixelify text-white text-[34.85px] max-w-[117px] leading-[24.89px]">
          SOCIAL SNIPER
        </p>
      </div>

      <div className=" mx-3  h-[80vh] mt-20 flex flex-col space-y-4">
        {dashboardLinks.map((navlink) => (
          <Link
            className={
              pathname === navlink.href
                ? " flex items-center gap-2 px-4 py-3 rounded-md border transition uppercase text-white"
                : " py-3 px-3 flex items-center gap-2  text-[#FFFFFF69] uppercase"
            }
            style={
              pathname === navlink.href 
                ? {
                    borderColor: `${currentTheme.primaryColor}80`,
                    background: `linear-gradient(90deg, ${currentTheme.primaryColor}4C 0%, rgba(35, 20, 15, 0.67) 100%)`,
                  }
                : {}
            }
            href={navlink.href}
            key={navlink.id}
          >
            <navlink.icon className={
                pathname === navlink.href 
                ?
                'stroke-[#FFFFFF]'
                : 'stroke-[#FFFFFF69]'
            } />
            <p className="text-[16.89px] ">{navlink.title}</p>
          </Link>
        ))}
      </div>

      <div className="border-brandgray  flex gap-3 mb-[5.24rem]  border-b py-2 w-full">
        <Icons.logoutIcon />
        <p className="text-[#FF4C02] text-[19.89px] font-pixelify ">LOGOUT</p>
      </div>
    </section>
  );
}

export default DashboardSidebar