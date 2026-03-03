"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "sonner";
import { fetchBookings } from "@/store/slices/bookingSlice";
import { fetchMessages } from "@/store/slices/messagesSlice";

export function RealtimeNotifications() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const supabase = createClient();

        // Listen for new Bookings
        const bookingsChannel = supabase.channel('bookings-insert')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'bookings' },
                (payload) => {
                    const newBooking = payload.new;
                    toast.success("New Booking Received!", {
                        description: `${newBooking.guest_name} just booked ${newBooking.car_name} for ${newBooking.pickup_date}.`
                    });

                    // Re-fetch to update the Dashboard Redux State live
                    dispatch(fetchBookings());
                }
            )
            .subscribe();

        // Listen for new Messages
        const messagesChannel = supabase.channel('messages-insert')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload) => {
                    const newMsg = payload.new;
                    toast.info("New Message from Contact Form", {
                        description: `From: ${newMsg.name} - "${newMsg.message.slice(0, 30)}..."`
                    });

                    // Re-fetch to update Redux 
                    dispatch(fetchMessages());
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(bookingsChannel);
            supabase.removeChannel(messagesChannel);
        };
    }, [dispatch]);

    return null; // This component handles side-effects only.
}
