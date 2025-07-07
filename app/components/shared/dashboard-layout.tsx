import React, { PropsWithChildren } from "react";
import DashboardSidebar from "./dashboard-sidebar";
import TopNav from "./top-nav";
import Footer from "./footer";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  
  return (
    <main className="h-screen flex max-w-[90%] mx-auto">
      <DashboardSidebar />
      <div className="flex-1 w-full flex flex-col h-screen">
        <TopNav />
        <div className="flex-1 no-scrollbar overflow-y-auto px-[30px] py-4">{children}</div>
        <Footer />
      </div>
    </main>
  );
};

export default DashboardLayout;
