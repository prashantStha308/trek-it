import { 
    useQueryClient,
    useQuery,
    useMutation
} from "@tanstack/react-query";

import {
    getAllGuides,
    getGuideById,
    searchGuides,
} from "@/api/guide.api";

export const useGetAllGuides = ({
    limit = 10,
    page = 1,
    ...filter
}, options = {}) => {
    return useQuery({
        queryKey: ["guides", { limit, page, ...filter }],
        queryFn: () => getAllGuides({ limit, page, ...filter }),
        ...options
    })
}

export const useGetGuideById = (guideId) => {
    const queryClient = useQueryClient();

    const cachedGuides = queryClient.getQueriesData({ queryKey: ["guides"] })
        .flatMap(([, data]) => data?.docs ?? [])
        .find(guide => guide._id === guideId);

    return useQuery({
        queryKey: ["guide", guideId],
        queryFn: () => getGuideById(guideId),
        initialData: cachedGuides,
        enabled: !!guideId,
    });
}


export const useGuideSearchQuery = (query) => {
    return useQuery({
        queryKey: ["guide" ,"search" ,query],
    queryFn: () => searchGuides(query),
        enabled: !!(query?.name?.length >= 2 || query?.regions?.length || query?.specialitiies?.length),
    })
}
