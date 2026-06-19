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
    const queryClient = useQueryClient();

    const currentUser = queryClient.getQueryData(["me"])

    return useQuery({
        queryKey: ["chats"],
        queryFn: () => getAllUserChats(query),
        enabled: !!currentUser
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
    const cached = queryClient.getQueryData(["messages", chatId, { limit, page, filters }]);

    return useQuery({
        queryKey: ["messages", chatId, { limit, page, filters }],
        queryFn: () => getChatMessages(chatId, { limit, page, ...filters }),
        initialData: cached,
        enabled: !!chatId,
    });
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