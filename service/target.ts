import { useQuery } from "@tanstack/react-query"
import { api } from "./api"

const getTargets = async () => {
    const response = await api.get('/twittertarget/getTwitterTarget')
    return response.data
}

export const useGetTargets = () =>{
    return useQuery({
        queryKey: ['get-targets'],
        queryFn: getTargets
    })
}