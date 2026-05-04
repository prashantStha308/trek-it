import { 
    useQueryClient,
    useQuery,
 } from "@tanstack/react-query";

import {
    getRegions,
    getActivities,
    getSpecialities,
} from "@/api/meta.api";


const useCreateMetaQuery = (meta, func, query) => {
    return useQuery({
        queryKey: [meta, query],
        queryFn: () => func(query)
    })
}

export const useGetRegions = (query) => useCreateMetaQuery("regions", getRegions, query);
export const useGetActivities = (query) => useCreateMetaQuery("activities", getActivities, query);
export const useGetSpecialities = (query) => useCreateMetaQuery("specialities", getSpecialities, query);
