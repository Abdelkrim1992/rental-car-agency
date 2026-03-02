import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { BrowseCar } from "@/data/carsData";
import { browseCars as staticCars } from "@/data/carsData";

interface CarsState {
    cars: BrowseCar[];
    selectedCar: BrowseCar | null;
    filters: {
        type: string;
        brand: string;
        location: string;
    };
    loading: boolean;
    error: string | null;
}

const initialState: CarsState = {
    cars: staticCars,
    selectedCar: null,
    filters: {
        type: "All Types",
        brand: "All Brands",
        location: "All Locations",
    },
    loading: false,
    error: null,
};

export const fetchCars = createAsyncThunk("cars/fetchCars", async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/cars`);
        if (!res.ok) throw new Error("Failed to fetch cars");
        return (await res.json()) as BrowseCar[];
    } catch {
        // Falls back to static data if backend is not available
        return rejectWithValue("Backend unavailable, using static data");
    }
});

export const fetchCarById = createAsyncThunk("cars/fetchCarById", async (id: string, { rejectWithValue }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/cars/${id}`);
        if (!res.ok) throw new Error("Car not found");
        return (await res.json()) as BrowseCar;
    } catch {
        return rejectWithValue("Car not found");
    }
});

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<{ key: keyof CarsState["filters"]; value: string }>) {
            state.filters[action.payload.key] = action.payload.value;
        },
        clearFilters(state) {
            state.filters = { type: "All Types", brand: "All Brands", location: "All Locations" };
        },
        setSelectedCar(state, action: PayloadAction<BrowseCar | null>) {
            state.selectedCar = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchCars.fulfilled, (state, action) => { state.loading = false; state.cars = action.payload; })
            .addCase(fetchCars.rejected, (state) => { state.loading = false; /* keep static data */ })
            .addCase(fetchCarById.pending, (state) => { state.loading = true; })
            .addCase(fetchCarById.fulfilled, (state, action) => { state.loading = false; state.selectedCar = action.payload; })
            .addCase(fetchCarById.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
    },
});

export const { setFilter, clearFilters, setSelectedCar } = carsSlice.actions;
export default carsSlice.reducer;
