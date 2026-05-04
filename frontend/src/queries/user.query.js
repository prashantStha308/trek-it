import { 
    useQueryClient,
    useQuery,
    useMutation
} from "@tanstack/react-query";

import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    searchGuides,
} from "@/api/user.api";

export const useGetAllGuides = ({
    limit = 10,
    page = 1,
    ...filter
}, options = {}) => {
    return useQuery({
        queryKey: ["guides", { limit, page, ...filter }],
        queryFn: () => searchGuides({ limit, page, ...filter }),
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
        queryFn: () => searchPackages(query),
        enabled: !!(query?.name?.length >= 2 || query?.regions?.length || query?.activities?.length),
    })
}
