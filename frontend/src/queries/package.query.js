import { 
    useQueryClient,
    useQuery,
    useMutation
} from "@tanstack/react-query";

import {
    // GET
    getAllPackages,
    getPackageById,
    searchPackages,
    getGuidePackages,
    getPackageCollaborators,

    // POST
    createPackage,
    
    // PUT
    updatePackage,
    
    // DELETE
    deletePackage,    
} from "@/api/package.api";


// GET
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

export const useGetGuidePackages = (guideId)=>{
    return useQuery({
        queryKey: ["packages", guideId],
        queryFn: ()=> getGuidePackages(guideId)
    })
}

export const useGetPackageCollaborators = (pkgId) => {
    return useQuery({
        queryKey: ["guide", pkgId],
        queryFn: ()=> getPackageCollaborators(pkgId),
    })
}

// POST
export const useCreatePackage = ()=>{
    return useMutation({
        mutationFn: (body) => createPackage(body),
    })
}


// PUT
export const useUpdatePackage = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updatePackage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] })
        },
    })
}


// DELETE
export const useDeletePackage = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (id) => deletePackage(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["packages", id]})
        }
    })
}