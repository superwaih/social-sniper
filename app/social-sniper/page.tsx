import React from "react";
import DashboardLayout from "../components/shared/dashboard-layout";
import { Icons } from "@/components/shared/icons";
import SniperTable from "./components/sniper-table";

const Twitter = () => {
  return (
    <DashboardLayout>
      <section className="flex flex-col space-y-4">
        <h2 className="text-[40.41px] font-mono -leading-[1%] text-[#FFFFFFBF]">
          SOCIAL SNIPER
        </h2>
        <div className="bg-[#091820] p-[14px] flex justify-between items-center">
          <p className="flex gap-2  text-[#FFFFFF94] items-center">
            {/* <span className="text-lg font-mono"></span> */}
            <Icons.refresh className="text-[#FFFFFF94]" />
          </p>
          <div className="flex gap-4 items-center">
            <div className="border-[#779CBF6B] flex gap-3 items-center border p-3 rounded-[4px]">
              <Icons.filterIcon className="text-[#FFFFFF8A] text-sm" />
              <p className="text-[#FFFFFF8A] text-sm">ACCOUNT FILTERS</p>
            </div>
            <div className="border-[#779CBF6B] flex gap-3 items-center border p-3 rounded-[4px]">
              <Icons.filterIcon className="text-[#FFFFFF8A] text-sm" />
              <p className="text-[#FFFFFF8A] text-sm">FILTER MEANING</p>
            </div>
          </div>
        </div>
        <SniperTable />
      </section>
    </DashboardLayout>
  );
};

export default Twitter;
