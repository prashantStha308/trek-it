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

import {showToast} from "@/store/ui.store";


export const useGetMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => getMe(),
        retry: false,
        staleTime: Infinity,
        gcTime: 0,
        throwOnError: false,
        onError: (err) => {
            showToast({ message: err?.message, title: "Failed to Get User Data" })
        }
    })
}

export const useLogin = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
            showToast({message: data?.message  || "User logged in" , title: "Login Successfull"});
        },
        onError:(err)=>{
            showToast({message: err?.message  || "Failed to login" , title: "Login Failure"});
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            queryClient.setQueryData(["me"], null);
            showToast({ message: data?.message || "User logged out" , title: "Logged out Successfully" });
        },
        onError:(err)=>{
            showToast({message: err?.message  || "Failed to Logout" , title: "Logout Failure"});
        }
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: ({body, role }) => register(body, role),
        onSuccess: (data)=>{
            showToast({message: data?.message , title: "Registration Successful" });
        },
        onError:(err)=>{
            showToast({message: err?.message  || "Failed to register user" , title: "Registration Failure"});
        }
    })
}