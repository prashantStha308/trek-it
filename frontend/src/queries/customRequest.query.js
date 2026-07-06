import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/store/ui.store";
import {
    sendCustomRequest,
    getMyCustomRequests,
    acceptCustomRequest,
    rejectCustomRequest,
    withdrawCustomRequest,
} from "@/api/customRequest.api";

export const useGetMyCustomRequests = (options) => {
    return useQuery({
        queryKey: ["customRequests", "mine"],
        queryFn: getMyCustomRequests,
        ...options,
    });
};

export const useSendCustomRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: sendCustomRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customRequests"] });
            showToast({
                title: "Request sent",
                message: "Your customization request has been sent to the guide.",
            });
        },
        onError: (error) => {
            showToast({
                title: "Request failed",
                message: error?.message || "Unable to send customization request.",
            });
        },
    });
};

// onAccepted(tourist) is called by the component after a successful accept
// so the component can handle navigation using its own useRouter / useChatStore
export const useAcceptCustomRequest = (onAccepted) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: acceptCustomRequest,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["customRequests"] });
            queryClient.invalidateQueries({ queryKey: ["booking"] });
            if (onAccepted) onAccepted(data?.tourist);
        },
        onError: (error) => {
            showToast({
                title: "Failed to accept",
                message: error?.message || "Unable to accept the request.",
            });
        },
    });
};

export const useRejectCustomRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: rejectCustomRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customRequests"] });
            showToast({
                title: "Request rejected",
                message: "The customization request has been declined.",
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

export const useWithdrawCustomRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: withdrawCustomRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customRequests"] });
            showToast({
                title: "Request withdrawn",
                message: "Your customization request has been withdrawn.",
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
