import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBooking } from "@/api/booking.api";
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
