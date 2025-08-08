

"use client";

import { useState, useEffect } from "react";
import { Icons } from "../shared/icons";
import { X } from "lucide-react";
import { scrollToPricing, scrollToSection } from "@/utils/scroll";

const navlinks = [
  {
    id: 1,
    href: "#home",
    title: "Home",
    sectionId: "home",
  },
  {
    id: 2,
    href: "#how-it-works",
    title: "How it works",
    sectionId: "how-it-works",
  },
  {
    id: 3,
    href: "#features",
    title: "Features",
    sectionId: "features",
  },
  {
    id: 4,
    href: "#pricing",
    title: "Pricing",
    sectionId: "pricing",
  },
];

const NewNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  // Track hash changes and section visibility for active state
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "#home");
    };

    // Set initial hash
    setActiveHash(window.location.hash || "#home");

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Intersection Observer to update active section based on scroll
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const newHash = `#${sectionId}`;
          setActiveHash(newHash);
          // Update URL without triggering scroll
          window.history.replaceState({}, '', newHash);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navlinks.forEach((link) => {
      const element = document.getElementById(link.sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href: string, sectionId: string, event?: React.MouseEvent) => {
    setActiveHash(href);
    closeMobileMenu();
    
    // Prevent default anchor behavior and use smooth scroll
    event?.preventDefault();
    scrollToSection(sectionId);
  };
  return (
    <>
      <div className=" flex justify-between  rounded-[24px] items-center w-full  px-6 py-2 md:py-1 border-[#FFFFFF2B] border  ">
        <Icons.logo className="size-16 md:size-[70px]" />

        {/* Desktop Navigation */}
        <div className="hidden bg-[#020D13] px-6 py-3 justify-between rounded-[9px] w-full max-w-[500px] md:flex items-center">
          {navlinks.map((navlink) => {
            const isCurrent = activeHash === navlink.href;
            const linkClass = isCurrent
              ? "text-white bg-[#071218] text-white py-2 px-4 rounded-md"
              : "text-[#FFFFFF45]";

            return (
              <a
                key={navlink.id}
                href={navlink.href}
                onClick={(e) => handleNavClick(navlink.href, navlink.sectionId, e)}
                className={`${linkClass} text-[16.3px] font-["Space_Grotesk",Helvetica] font-normal tracking-[-0.65px] leading-normal mr-6 hover:text-[#ff4c02] transition-colors duration-300`}
              >
                {navlink.title}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <button
          onClick={scrollToPricing}
          className="w-[130px] hidden h-[48px] md:w-56 md:flex justify-center items-center md:h-[54px] bg-[#ff4c02] rounded border-none text-white hover:bg-[#e63d00] transition-colors duration-300"
        >
          <div className="font-['Space_Grotesk',Helvetica] font-normal text-[16.3px] text-center tracking-[-0.65px] leading-normal">
            Snipe now
          </div>
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="inline-block cursor-pointer md:hidden p-2 hover:bg-[#071218] rounded-md transition-colors duration-300"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="size-6 text-white" />
          ) : (
            <Icons.menuicon className="size-8" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[55] md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#020D13] transform transition-transform duration-300 ease-in-out z-[60] md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-[#071218]">
            <Icons.logo className="size-16" />
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-[#071218] rounded-md transition-colors duration-300"
              aria-label="Close mobile menu"
            >
              <X className="size-6 text-white" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col p-6 space-y-4 flex-1">
            {navlinks.map((navlink) => {
              const isCurrent = activeHash === navlink.href;
              const linkClass = isCurrent
                ? "text-white bg-[#071218] py-3 px-4 rounded-md"
                : "text-[#FFFFFF44] py-3 px-4";

              return (
                <a
                  key={navlink.id}
                  href={navlink.href}
                  onClick={(e) => handleNavClick(navlink.href, navlink.sectionId, e)}
                  className={`${linkClass} text-lg font-["Space_Grotesk",Helvetica] font-normal tracking-[-0.65px] leading-normal hover:text-[#ff4c02] transition-colors duration-300 block`}
                >
                  {navlink.title}
                </a>
              );
            })}
          </div>

          {/* Mobile CTA Button */}
          <div className="p-6 border-t border-[#071218]">
            <button
              onClick={() => {
                scrollToPricing();
                closeMobileMenu();
              }}
              className="w-full h-12 flex justify-center items-center bg-[#ff4c02] rounded border-none text-white hover:bg-[#e63d00] transition-colors duration-300"
            >
              <div className="font-['Space_Grotesk',Helvetica] font-normal text-base text-center tracking-[-0.65px] leading-normal">
                Snipe now
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewNav;
