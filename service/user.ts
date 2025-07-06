import { useMutation, useQuery } from "@tanstack/react-query"
import { api } from "./api"

interface Ilogin {
    publicKey: string
}
const loginFn  = async (data: Ilogin) => {
    const response = await api.post('/user/connect-wallet', data)
    return response.data
}


export const useLoginFn = () =>{
    return useMutation({
        mutationFn: loginFn,
        mutationKey: ['login']
    })
}

interface IUserData {
    publicKey: string;
    username?: string;
    profilePicture?: string
}

const updateProfile = async (user: IUserData) =>{
    const response = await api.put('/user/update-profile', {
        withCredentials: true,
        ...user
    })
    return response.data
} 

export const useUpdateProfile = () =>{
    return useMutation({
        mutationFn: updateProfile,
        mutationKey: ['update-profile']
    })
}

const getUser = async () =>{
    const response = await api.get('/user/get-userprofile', {
        withCredentials: true
    })
    return response.data
}

export const useGetUser = () =>{
    return useQuery({
        queryKey: ['get-user'],
        queryFn: getUser
    })
}

const disconnectWallet = async () =>{
    const response = await api.post('/user/disconnect-wallet')
    return response.data
}

export const useDisconnectUser = () =>{
    return useMutation({
        mutationKey: ['disconnect-wallet'],
        mutationFn: disconnectWallet
    })
}

export const useGetUserProfile = () =>{
    return useQuery({
        queryKey: ['get-user-update'],
        queryFn: getUser
    })
}