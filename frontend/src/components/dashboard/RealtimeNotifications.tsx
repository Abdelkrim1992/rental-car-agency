"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "sonner";
import { addBooking } from "@/store/slices/bookingSlice";
import { addMessage } from "@/store/slices/messagesSlice";

export function RealtimeNotifications(): React.ReactNode {
    const dispatch = useAppDispatch();
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const connect = () => {
            const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000";
            console.log("📡 Attempting WebSocket connection to:", wsUrl);

            const ws = new WebSocket(wsUrl);
            socketRef.current = ws;

            ws.onopen = () => {
                console.log("🟢 WebSocket Connected for Dashboard Notifications");
                if (reconnectTimeoutRef.current) {
                    clearTimeout(reconnectTimeoutRef.current);
                    reconnectTimeoutRef.current = null;
                }
            };

            ws.onmessage = (event) => {
                try {
                    const { type, data } = JSON.parse(event.data);
                    console.log(`📡 WebSocket Message [${type}]:`, data);

                    if (type === "NEW_BOOKING") {
                        toast.success("New Booking Received!", {
                            description: `${data.guest_name || "A user"} just booked the ${data.car_name} for ${new Date(data.pickup_date).toLocaleDateString()}.`,
                            duration: 8000,
                        });
                        dispatch(addBooking(data));
                    } else if (type === "NEW_MESSAGE") {
                        toast.info("New Inquiry Received", {
                            description: `From: ${data.name} - "${data.message?.slice(0, 50)}..."`,
                            duration: 8000,
                        });
                        dispatch(addMessage(data));
                    }
                } catch (err) {
                    console.error("❌ Failed to parse WebSocket message:", err);
                }
            };

            ws.onclose = () => {
                console.warn("🟡 WebSocket Disconnected. Reconnecting in 5s...");
                reconnectTimeoutRef.current = setTimeout(connect, 5000);
            };

            ws.onerror = (err) => {
                console.error("❌ WebSocket Error:", err);
                ws.close();
            };
        };

        connect();

        return () => {
            if (socketRef.current) {
                socketRef.current.onclose = null; // Prevent reconnect on unmount
                socketRef.current.close();
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, [dispatch]);

    return null;
}
