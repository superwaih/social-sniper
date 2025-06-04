import React from "react";
import { Icons } from "../shared/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navlinks = [
  {
    id: 1,
    href: "#home",
    title: "Home",
  },
  {
    id: 2,
    href: "#how-it-works",
    title: "How it works",
  },
  {
    id: 3,
    href: "#features",
    title: "Features",
  },
];

const LandingNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center w-full px-6 py-4">
      <Icons.logo className="size-24" />
      <div className="hidden md:flex items-center">
        {navlinks.map((navlink) => {
          const isCurrent = pathname === navlink.href;
          const linkClass = isCurrent ? "text-white" : "text-[#FFFFFF44]";

          return (
            <a
              key={navlink.id}
              href={navlink.href}
              className={`${linkClass} text-[16.3px] font-["Space_Grotesk",Helvetica] font-normal tracking-[-0.65px] leading-normal mr-6 hover:text-[#ff4c02] transition-colors duration-300`}
            >
              {navlink.title}
            </a>
          );
        })}
      </div>
      <Link href={'/'} className="w-[130px] h-[48px] md:w-56 flex justify-center items-center md:h-[54px] bg-[#ff4c02] rounded border-none text-white">
        <div className="font-['Space_Grotesk',Helvetica] font-normal text-[16.3px] text-center tracking-[-0.65px] leading-normal">
          Snipe now
        </div>
      </Link>
    </div>
  );
};

export default LandingNavbar;
