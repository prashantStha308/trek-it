import { 
    useQueryClient,
    useQuery,
 } from "@tanstack/react-query";

import {
    DEFAULT_LIMIT,
    DEFAULT_PAGE
} from "@/constants/config.constants.js"

import {
    getAllNotifications
} from "@/api/notification.api.js";



export const useGetAllNotifications = ({ limit = DEFAULT_LIMIT , page = DEFAULT_PAGE, sort= {createdAt: -1} ,...filters } = {})=>{
    // add caching logic here later

    return useQuery({
        queryKey: [ "notifications", {limit, page, filters} ],
        queryFn: () => getAllNotifications({limit, page, filters})
    })
}