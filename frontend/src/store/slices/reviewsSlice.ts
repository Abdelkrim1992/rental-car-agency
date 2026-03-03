import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reviews as staticReviews } from "@/data/carsData";

interface Review {
    name: string;
    location: string;
    rating: number;
    title: string;
    text: string;
    avatar: string;
    photo: string;
}

interface ReviewsState {
    reviews: Review[];
    loading: boolean;
    error: string | null;
}

const initialState: ReviewsState = {
    reviews: staticReviews,
    loading: false,
    error: null,
};

export const fetchReviews = createAsyncThunk("reviews/fetchReviews", async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://atlascarrental-backend.netlify.app"}/api/reviews`);
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return (await res.json()) as Review[];
    } catch {
        return rejectWithValue("Backend unavailable, using static data");
    }
});

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => { state.loading = true; })
            .addCase(fetchReviews.fulfilled, (state, action) => { state.loading = false; state.reviews = action.payload; })
            .addCase(fetchReviews.rejected, (state) => { state.loading = false; /* keep static data */ });
    },
});

export default reviewsSlice.reducer;
