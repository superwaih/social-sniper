"use client";
import React, { PropsWithChildren } from "react";
import DashboardSidebar from "./dashboard-sidebar";
import TopNav from "./top-nav";
import Footer from "./footer";
import { useAppTheme } from "@/hooks/useAppTheme";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { getThemeStyles } = useAppTheme();
  
  return (
    <section style={{
        background: getThemeStyles().background,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}>
    <main 
      className="h-screen flex max-w-[1600px] mx-auto"
      
    >
      <DashboardSidebar />
      <div className="flex-1 w-full flex flex-col h-screen">
        <TopNav />
        <div className="flex-1 no-scrollbar overflow-y-auto px-[30px] py-4">{children}</div>
        <Footer />
      </div>
    </main>

    </section>
  );
};

export default DashboardLayout;
