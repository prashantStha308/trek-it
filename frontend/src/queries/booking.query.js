import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    createBooking,
    getUserBookings,
    getActiveBookings,
} from "@/api/booking.api";
import { showToast } from "@/store/ui.store";

export const useCreateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBooking,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["packages"] });
            showToast({
                title: "Booking request sent",
                message: data?.name
                    ? `Your booking for ${data.name} has been created.`
                    : "Your booking has been created successfully."
            });
        },
        onError: (error) => {

            console.error(error)
            showToast({
                title: "Booking failed",
                message: error?.message || "Unable to create your booking right now."
            });
        }
    });
};

export const useGetUserBookings = ({page = 1, limit = 10, ...filters} = {}, options) => {
    return useQuery({
        queryKey: ["booking", {page: 1, limit: 10, ...filters}],
        queryFn: ()=> getUserBookings({page: 1, limit: 10, ...filters}),
        ...options
    })
}

export const useGetActiveBookings = ({page = 1, limit = 10, ...filters} = {}, options) => {
    return useQuery({
        queryKey: ["booking", {page: 1, limit: 10, ...filters}],
        queryFn: ()=> getActiveBookings({page: 1, limit: 10, ...filters}),
        ...options
    })
}