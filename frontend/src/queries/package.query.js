import { 
    useQueryClient,
    useQuery,
    useMutation
} from "@tanstack/react-query";

import {
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
    searchPackages
} from "@/api/package.api";


export const useGetAllPackages = ({
    limit = 10,
    page = 1,
    ...filter
}, options = {}) => {
    return useQuery({
        queryKey: ["packages", { limit, page, ...filter }],
        queryFn: () => getAllPackages({ limit, page, ...filter }),
        ...options
    });
}

export const useGetPackageById = (packageId) => {
    const queryClient = useQueryClient();

    const cachedPackage = queryClient.getQueriesData({ queryKey: ["packages"] })
        .flatMap(([, data]) => data?.docs ?? [])
        .find(pkg => pkg._id === packageId);

    return useQuery({
        queryKey: ["packages", packageId],
        queryFn: () => getPackageById(packageId),
        initialData: cachedPackage,
        enabled: !!packageId,
    });
}

export const usePackageSearchQuery = (query) => {
    return useQuery({
        queryKey: ["package" ,"search" ,query],
        queryFn: () => searchPackages(query),
        enabled: !!(query?.name?.length >= 2 || query?.regions?.length || query?.activities?.length),
    })
}

export const useUpdatePackage = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updatePackage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] })
        },
    })
}

export const useDeletePackage = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: deletePackage,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["packages"]})
        }
    })
}