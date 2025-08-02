// Runner.tsx
"use client"

import StatCard from "../components/shared/overview-stat-card";
import { overviewStats } from "@/utils/data";
import OverviewTable from "./components/overview-table";
import { dummyOverviewData } from "@/utils/constants";


const Runner = () => {

  return (
    <section className="flex flex-col space-y-4">
      <h2 className="text-[40.41px]  -leading-[1%] text-[#FFFFFFBF]">SNIPE OVERVIEW</h2>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
{
  overviewStats.map((stat) => (
    <StatCard key={stat.title} subtitle={stat.subtitle} title={stat.title} value={stat.value} />
  ))
}
      </div>
<OverviewTable data={dummyOverviewData} isLoading={false} />
      

     
    </section>
  );
};

export default Runner;
