// runners.ts

import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { RunnerFilters } from "@/types/runner";

// POST request to fetch filtered runners
export const getRunners = async (filters: RunnerFilters) => {
  const response = await api.post('/runnerhistory/create-runnerHistory', {
    engagement_score: filters.engagement_score,
    min_followers: filters.min_followers,
    min_market_cap: filters.min_market_cap,
    max_market_cap: filters.max_market_cap,
    buy_ratio: filters.buy_ratio,
    sell_ratio: filters.sell_ratio,
    minimum_holders: filters.minimum_holders,
    account_age: filters.account_age,
    startDate: filters.startDate,
    endDate: filters.endDate,
    liquidity_locked: filters.liquidity_locked
  });

  return response.data;
};

// React Query hook for fetching runners
export const useGetRunners = (publicKey: string | undefined, filters: RunnerFilters) => {
  return useQuery({
    queryKey: ['get-targets', publicKey, filters],
    queryFn: () => getRunners(filters),
    enabled: !!publicKey,
  });
};
