import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    DEFAULT_LIMIT,
    DEFAULT_PAGE
} from "@/constants/config.constants.js"

import {
    createBooking,
    
    getUserBookings,
    getBookingById,
    getActiveBookings,

    cancleBooking,
    updateBookingStatus,
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
            showToast({
                title: "Booking failed",
                message: error?.message || "Unable to create your booking right now."
            });
        }
    });
};


export const useGetUserBookings = ({page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, ...filters} = {}, options) => {
    return useQuery({
        queryKey: ["booking", {page: page, limit: limit, ...filters}],
        queryFn: ()=> getUserBookings({page: page, limit: limit, ...filters}),
        ...options
    })
}

export const useGetBookingById = (id, options) => {
    return useQuery({
        queryKey: ["booking", id],
        queryFn: ()=> getBookingById(id),
        enabled: !!id,
        ...options
    })
}


export const useGetActiveBookings = ({page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, ...filters} = {}, options) => {
    return useQuery({
        queryKey: ["booking", {page: page, limit: limit, ...filters}],
        queryFn: ()=> getActiveBookings({page: page, limit: limit, ...filters}),
        ...options
    })
}



// updates
export const useCancleBooking = () => (
    useMutation({
        mutationFn: (id)=> cancleBooking(id)
    })
)

export const useUpdateBookingStatus = () => (
    useMutation({
        mutationFn: (id, status)=> updateBookingStatus(id, status)
    })
)