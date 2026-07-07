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
    updateGuide,

    toggleGuideAvailability,
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
        queryKey: ["guide", "search", query],
        queryFn: () => searchGuides(query),
        enabled: !!(query?.name?.length >= 2 || query?.regions?.length || query?.specialitiies?.length),
    })
}

export const useUpdateGuideProfile = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, ...payload }) => updateGuide(id, payload),
        onSuccess: (data, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["guide", id] });
            queryClient.invalidateQueries({ queryKey: ["guides"] });
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
}

export const useToggleGuideAvailaility = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => toggleGuideAvailability(),
        onSuccess: ()=>{

        }
    })
}