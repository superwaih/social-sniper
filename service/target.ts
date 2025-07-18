import { useQuery } from "@tanstack/react-query"
import { api } from "./api"

const getTargets = async () => {
    const response = await api.get('/twittertarget/getTwitterTarget', {
        withCredentials: true,

    })
    return response.data
}

export const useGetTargets = (publicKey: string) =>{
    return useQuery({
        queryKey: ['get-targets'],
        queryFn: getTargets,
        enabled: !!publicKey
        
    })
}