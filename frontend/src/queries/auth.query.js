import { 
    useQueryClient,
    useQuery,
    useMutation
 } from "@tanstack/react-query";

import {
    getMe,
    login,
    register,
    logout
} from "@/api/auth.api";

const QUERY_KEYS = {
    me: ["me"],
}

export const useGetMe = () => {
    return useQuery({
        queryKey: QUERY_KEYS.me,
        queryFn: () => getMe(),
        retry: false,
        staleTime: Infinity
    })
}

export const useLogin = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.me })
        },
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: ({ body, role }) => register(body, role),
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.me })
        }
    })
}