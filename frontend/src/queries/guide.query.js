import { 
    useQueryClient,
    useQuery,
    useMutation
} from "@tanstack/react-query";

import {
    DEFAULT_LIMIT,
    DEFAULT_PAGE
} from "@/constants/config.constants.js"

import {
    getAllGuides,
    getGuideById,
    searchGuides,
} from "@/api/guide.api";

export const useGetAllGuides = ({
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
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

    const cachedGuide = queryClient.getQueriesData({ queryKey: ["guides"] })
        .flatMap(([, data]) => data?.docs ?? [])
        .find(guide => guide._id === guideId);

    return useQuery({
        queryKey: ["guide", guideId],
        queryFn: () => getGuideById(guideId),
        placeholderData: cachedGuide,
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
