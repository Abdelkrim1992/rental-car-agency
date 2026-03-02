import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
    globalLoading: boolean;
    notification: { message: string; type: "success" | "error" | "info" } | null;
}

const initialState: UiState = {
    globalLoading: false,
    notification: null,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setGlobalLoading(state, action: PayloadAction<boolean>) {
            state.globalLoading = action.payload;
        },
        showNotification(state, action: PayloadAction<{ message: string; type: "success" | "error" | "info" }>) {
            state.notification = action.payload;
        },
        clearNotification(state) {
            state.notification = null;
        },
    },
});

export const { setGlobalLoading, showNotification, clearNotification } = uiSlice.actions;
export default uiSlice.reducer;
