"use client";
import { Icons } from "@/components/shared/icons";
import React, { useState } from "react";

import TokenFilterSheet from "../components/sheets/token-filter-sheet";
import RunnerTable from "./components/runner-table";


const Runner = () => {
  const [showfilters, setShowFilters] = useState(false);
  
  
  
  return (
      <section className="flex flex-col space-y-4">
        <h2 className="text-[40.41px]   -leading-[1%] text-[#FFFFFFBF]">
          RUNNER REPORTS
        </h2>
        <div className="bg-[#091820] p-[14px] flex justify-between items-center">
          <p className="flex gap-2  text-[#FFFFFF94] items-center">
            <span className="text-lg  ">NEW RUNNERS</span>
            <Icons.refresh className="text-[#FFFFFF94]" />
          </p>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setShowFilters(true)}
              className="border-[#779CBF6B] flex gap-3 items-center border p-3 rounded-[4px]"
            >
              <Icons.filterIcon className="text-[#FFFFFF8A] text-sm" />
              <p className="text-[#FFFFFF8A]   text-sm">
                RUNNER FILTERS
              </p>
            </button>
            <button className="border-[#779CBF6B] flex gap-3 items-center border p-3 rounded-[4px]">
              <Icons.filterIcon className="text-[#FFFFFF8A] text-sm" />
              <p className="text-[#FFFFFF8A]   text-sm">
                RUNNER FILTERS
              </p>
            </button>
          </div>
        </div>
        <RunnerTable  />

        <TokenFilterSheet open={showfilters} onOpenChange={setShowFilters} />
      </section>
  );
};

export default Runner;
