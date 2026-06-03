import { 
    useQueryClient,
    useQuery,
    useMutation
 } from "@tanstack/react-query";
import {
    getAllUserChats,
    getChatById,
    getOrCreateDirectChat,
    getChatMessages,
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

export const useGetChatMessages = (chatId, {limit= 30, page = 1, ...filters})=>{
    const queryClient = useQueryClient();

    const cachedMsg = queryClient.getQueriesData({queryFn:["messages", chatId, {limit, page, filters}]})
        .flatMap(([, data]) => data?.docs ?? [])
        .find(msg => msg.chat === chatId);

    return useQuery({
        queryKey: ["messages", chatId, {limit, page, filters}],
        queryFn: () => getChatMessages(packageId),
        initialData: cachedMsg,
        enabled: !!chatId,
    })
}

export const useGetOrCreateDirectChat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (recipientId) => getOrCreateDirectChat(recipientId),
        onSuccess: (chat) => {
            // upsert the new chat into the existing chats cache
            queryClient.setQueryData(["chats"], (prev) => {
                if (!prev) return [chat];
                const exists = prev.find(c => c._id === chat._id);
                if (exists) return prev;
                return [...prev, chat];
            });
        }
    });
}