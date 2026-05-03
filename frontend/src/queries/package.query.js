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
} = {}) => {
    return useQuery({
        queryKey: ["packages", { limit, page, ...filter }],
        queryFn: () => getAllPackages({ limit, page, ...filter }),
    })
}

export const useFilteredPackageQuery = (filters = {})=>{
    return useQuery({
        queryKey: ["packages", filters],
        queryFn: ()=> getAllPackages(filters),
        enabled: !!filters,
    })
}

export const useGetPackageById = (packageId) => {
    const queryClient = useQueryClient();

    const cachedPackage = queryClient.getQueriesData({ queryKey: ["packages"] })
        .flatMap(([, data]) => data?.packages ?? [])
        .find(pkg => pkg._id === packageId);

    return useQuery({
        queryKey: ["packages", packageId],
        queryFn: () => getPackageById(packageId),
        initialData: cachedPackage,
        enabled: !!packageId,
    });
}

export const useSearchQuery = (query) => {
    return useQuery({
        queryKey: ["packageSearch", query],
        queryFn: () => searchPackages(query),
        enabled: !!(query?.name || query?.regions?.length || query?.activities?.length),
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