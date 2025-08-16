import { useQuery } from "@tanstack/react-query"
import { api } from "./api"

const getOverview = async () => {
  const res = await api.get('/snipeoverview/overview')
  return res.data

}
export const useGetOverview = (publicKey: string) => {
  return useQuery({
    queryKey: ['get-overview'],
    queryFn: getOverview,
    enabled: !!publicKey,
    
  })
}