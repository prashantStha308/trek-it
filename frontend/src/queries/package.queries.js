import { 
    useQueryClient,
    useQuery,
    useMutation
} from "@tanstack/react-query";

import {
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage
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

export const useGetPackage = (id) => {
    return useQuery({
        queryKey: ["package", id],
        queryFn: () => getPackageById(id),
        enabled: !!id,
    })
}

export const useSearchQuery = (value) => {
    return useQuery({
        queryKey: ["packageSearch", value],
        queryFn: () => getAllPackages({ search: value }),
        enabled: !!value,
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