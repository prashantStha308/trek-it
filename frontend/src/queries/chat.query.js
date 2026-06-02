import { 
    useQueryClient,
    useQuery,
    useMutation
 } from "@tanstack/react-query";
import {
    getAllUserChats,
    getChatById
} from "@/api/chat.api.js";


export const useGetAllUserChats = (query)=>{
    return useQuery({
        queryKey: ["chats"],
        queryFn: () => getAllUserChats(query)
    })
}

export const useGetChatById = (id)=>{
    return useQuery({
        queryKey: ["chats", id],
        queryFn: () => getChatById(id)
    })
}