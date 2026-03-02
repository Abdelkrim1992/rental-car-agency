import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { createClient } from "@/lib/supabase/client";

interface User {
    id: string;
    email: string;
    full_name: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    initialized: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    initialized: false,
};

// Check existing session on app load
export const initAuth = createAsyncThunk("auth/init", async (_, { rejectWithValue }) => {
    try {
        const supabase = createClient();
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) return null;
        return {
            id: user.id,
            email: user.email || "",
            full_name: user.user_metadata?.full_name || "User",
        } as User;
    } catch {
        return rejectWithValue("Failed to initialize auth");
    }
});

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const supabase = createClient();
            const { data, error } = await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password,
            });
            if (error) throw new Error(error.message);
            return {
                id: data.user.id,
                email: data.user.email || "",
                full_name: data.user.user_metadata?.full_name || "User",
            } as User;
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : "Login failed");
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data: { email: string; password: string; full_name: string }, { rejectWithValue }) => {
        try {
            const supabase = createClient();
            const { data: authData, error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: { data: { full_name: data.full_name } },
            });
            if (error) throw new Error(error.message);
            if (!authData.user) throw new Error("Registration failed");
            return {
                id: authData.user.id,
                email: authData.user.email || "",
                full_name: data.full_name,
            } as User;
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : "Registration failed");
        }
    }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError(state) {
            state.error = null;
        },
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Init
            .addCase(initAuth.fulfilled, (state, action) => {
                state.initialized = true;
                state.user = action.payload;
            })
            .addCase(initAuth.rejected, (state) => {
                state.initialized = true;
            })
            // Login
            .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Register
            .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { clearAuthError, setUser } = authSlice.actions;
export default authSlice.reducer;
