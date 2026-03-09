import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { createClient } from "@/lib/supabase/client";

export interface Notification {
    id: string;
    title: string;
    description: string;
    type: 'booking' | 'message' | 'alert';
    resource_id?: string;
    payload?: any;
    status: 'unread' | 'read';
    created_at: string;
}

interface NotificationsState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
}

const initialState: NotificationsState = {
    notifications: [],
    loading: false,
    error: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const fetchWithTimeout = (url: string, options?: RequestInit, timeoutMs = 15000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    return fetch(url, { ...options, signal: controller.signal })
        .finally(() => clearTimeout(timeoutId));
};

export const fetchNotifications = createAsyncThunk("notifications/fetchNotifications", async (_, { rejectWithValue }) => {
    try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;

        const response = await fetchWithTimeout(`${API_URL}/notifications`, {
            headers: {
                "Authorization": `Bearer ${token || ""}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Failed to fetch notifications");
        const data = await response.json();
        return data as Notification[];
    } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : "Failed to fetch notifications");
    }
});

export const markNotificationRead = createAsyncThunk(
    "notifications/markNotificationRead",
    async (id: string, { rejectWithValue }) => {
        try {
            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token || "";

            const response = await fetchWithTimeout(`${API_URL}/notifications/${id}/read`, {
                method: "PATCH",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Failed to mark read");
            return id;
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : "Failed to mark read");
        }
    }
);

export const markAllRead = createAsyncThunk(
    "notifications/markAllRead",
    async (_, { rejectWithValue }) => {
        try {
            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token || "";

            const response = await fetchWithTimeout(`${API_URL}/notifications/mark-all-read`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Failed to mark all read");
            return true;
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : "Failed to mark all read");
        }
    }
);

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            if (!state.notifications.find(n => n.id === action.payload.id)) {
                state.notifications.unshift(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => { state.loading = true; })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(markNotificationRead.fulfilled, (state, action) => {
                const notif = state.notifications.find(n => n.id === action.payload);
                if (notif) notif.status = "read";
            })
            .addCase(markAllRead.fulfilled, (state) => {
                state.notifications.forEach(n => {
                    n.status = "read";
                });
            });
    },
});

export const { addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
