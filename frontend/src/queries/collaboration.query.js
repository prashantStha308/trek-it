import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/store/ui.store";
import {
    sendCollabRequest,
    
    getCollabRequests,
    getMyCollabRequests,
    getCollaboratingPackages,
    getGuideCollaboratingPackages,

    acceptCollabRequest,
    rejectCollabRequest,
    
    withdrawCollabRequest,
} from "@/api/collaboration.api";

export const useGetCollabRequests = (query, options) => {
    return useQuery({
        queryKey: ["collabRequests", query],
        queryFn: () => getCollabRequests(query),
        ...options,
    });
};

export const useGetMyCollabRequests = (query, options) => {
    return useQuery({
        queryKey: ["collabRequests", "mine", query],
        queryFn: () => getMyCollabRequests(query),
        ...options,
    });
};

export const useGetCollaboratingPackages = (options) => {
    return useQuery({
        queryKey: ["collabPackages"],
        queryFn: getCollaboratingPackages,
        ...options,
    });
};

export const useGetGuideCollaboratingPackages = (guideId, options) => {
    return useQuery({
        queryKey: ["collabPackages", guideId],
        queryFn: () => getGuideCollaboratingPackages(guideId),
        enabled: !!guideId,
        ...options,
    });
};

export const useSendCollabRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: sendCollabRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["collabRequests"] });
            showToast({
                title: "Request sent",
                message: "Your collaboration request has been sent to the package owner.",
            });
        },
        onError: (error) => {
            showToast({
                title: "Request failed",
                message: error?.message || "Unable to send collaboration request.",
            });
        },
    });
};

export const useAcceptCollabRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: acceptCollabRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["collabRequests"] });
            showToast({
                title: "Request accepted",
                message: "The guide has been added as a collaborator.",
            });
        },
        onError: (error) => {
            showToast({
                title: "Failed to accept",
                message: error?.message || "Unable to accept the request.",
            });
        },
    });
};

export const useRejectCollabRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: rejectCollabRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["collabRequests"] });
            showToast({
                title: "Request rejected",
                message: "The collaboration request has been rejected.",
            });
        },
        onError: (error) => {
            showToast({
                title: "Failed to reject",
                message: error?.message || "Unable to reject the request.",
            });
        },
    });
};

export const useWithdrawCollabRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: withdrawCollabRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["collabRequests"] });
            showToast({
                title: "Request withdrawn",
                message: "Your collaboration request has been withdrawn.",
            });
        },
        onError: (error) => {
            showToast({
                title: "Failed to withdraw",
                message: error?.message || "Unable to withdraw the request.",
            });
        },
    });
};