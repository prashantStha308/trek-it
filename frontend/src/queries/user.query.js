import { 
    useQueryClient,
    useMutation,
 } from "@tanstack/react-query";

import {
    updateMe
} from "@/api/user.api";

import {showToast} from "@/store/ui.store.js";

export const useUpdateMe = ()=>{
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (body) => updateMe( body),

        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["me"] });

            showToast({
                title: "Success",
                message: res.message ?? "Updated Successfully"
            })
        },
        onError: (err) => {
            showToast({
                title: "Failed",
                message: err.message ?? "Failed to update"
            })
        }
    });

}