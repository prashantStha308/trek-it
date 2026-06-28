import { 
    useQueryClient,
    useQuery,
 } from "@tanstack/react-query";
import {
    getAllNotifications
} from "@/api/notification.api.js";

export const useGetAllNotifications = ({ limit=30, page=1, sort= {createdAt: -1} ,...filters } = {})=>{
    // add caching logic here later

    return useQuery({
        queryKey: [ "notifications", {limit, page, filters} ],
        queryFn: () => getAllNotifications({limit, page, filters})
    })
}