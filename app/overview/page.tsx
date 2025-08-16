"use client"

import StatCard from "../components/shared/overview-stat-card";
import OverviewTable from "./components/overview-table";
import { useGetOverview } from "@/service/overview";
import { useWallet } from "@solana/wallet-adapter-react";


const OverviewPage = () => {
  const {publicKey} = useWallet()
const {data, isLoading}  = useGetOverview(publicKey?.toBase58() ?? "")
const statsoverview = [
    {
    title: 'Total Tokens Sniped',
    value: data?.total_tokens_sniped ?? 0,
    subtitle: 'Tokens',
  },
  {
    title: 'Overall Portfolio PNL',
    value: data?.portfolio_pnl ?? 0,
    subtitle: '',
  },
  {
    title: 'Auto Buy Active',
    value: data?.buy_active ?? 0,
    subtitle: 'Targets',
  },
  {
    title: 'Rug Warnings',
    value: data?.rug_warnings ?? 0,
    subtitle: 'Tokens Flagged',
  },
]
console.log(data)
  return (
    <section className="flex flex-col space-y-4">
      <h2 className="text-[40.41px]  -leading-[1%] text-[#FFFFFFBF]">SNIPE OVERVIEW</h2>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
{
  statsoverview.map((stat) => (
    <StatCard isLoading={isLoading} key={stat.title} subtitle={stat.subtitle} title={stat.title} value={stat.value} />
  ))
}
      </div>
      
        <OverviewTable />

     
    </section>
  );
};

export default OverviewPage;
