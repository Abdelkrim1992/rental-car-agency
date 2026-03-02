import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./slices/carsSlice";
import authReducer from "./slices/authSlice";
import bookingReducer from "./slices/bookingSlice";
import reviewsReducer from "./slices/reviewsSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
    reducer: {
        cars: carsReducer,
        auth: authReducer,
        booking: bookingReducer,
        reviews: reviewsReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
