import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "./api"
// Request body type
export type TwitterTargetFilters = {
  engagement_score: number;
  min_followers: number;
  username: string;
  verification_status: boolean;
  account_age: number;
  startDate: string; // ISO format: 'YYYY-MM-DD'
  endDate: string;   // ISO format: 'YYYY-MM-DD'
};

// Example response type (customize to match your API response)
export type TwitterTarget = {
  id: string;
  username: string;
  followers: number;
  engagement_score: number;
  verified: boolean;
  account_age: number;
  // add other expected fields...
};

export type GetTwitterTargetResponse = TwitterTarget[];

export const getTargets = async (
  filters: TwitterTargetFilters
) => {
  const response = await api.post('/twittertarget/getTwitterTarget', {
  "engagement_score": filters.engagement_score,
    "min_followers": filters.min_followers,
    "username": filters.username,
    "verification_status": filters.verification_status,
    "account_age": filters.account_age,
    "startDate": filters.startDate,
    "endDate": filters.endDate
  });
  return response.data;
};


export const useGetTargets = (publicKey: string, filters: TwitterTargetFilters) => {
  return useQuery({
    queryKey: ['get-targets', publicKey, filters], // track by user and filters
    queryFn: () => getTargets(filters),
    enabled: !!publicKey,
  });
};




const addTarget = async ({username, buyAmount, takeProfit, stopLoss, autoBuy}: {username: string, buyAmount: number, takeProfit: number, stopLoss: number, autoBuy: boolean}) => {
  const res = await api.post('/twittertarget/twitterTarget', {
      twitterUsername: username,
      buyAmount: buyAmount,
      takeProfit: takeProfit,
      stopLoss:  stopLoss,
      autoBuy: autoBuy
    })

  return res.data
}

export const useAddTarget = () =>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addTarget,
    mutationKey: ['add-target'],
    onSuccess: () =>{
queryClient.invalidateQueries({ queryKey: ['get-all-targets'] })
    }
  })
}

const getAllTargets = async () => {
  const res = await api.get('/twittertarget/getAllTargets')
  return res.data

}
export const useGetAllTargets = (publicKey: string) => {
  return useQuery({
    queryKey: ['get-all-targets', publicKey],
    queryFn: getAllTargets,
    enabled: !!publicKey,
    
  })
}