import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase.js";

const router = Router();

// POST /api/auth/register
router.post("/register", async (req: Request, res: Response) => {
    try {
        const { email, password, full_name } = req.body;

        if (!email || !password || !full_name) {
            res.status(400).json({ error: "Email, password, and full name are required" });
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name },
            },
        });

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        res.json({
            user: {
                id: data.user?.id,
                email: data.user?.email,
                full_name,
            },
            token: data.session?.access_token,
        });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ error: "Registration failed" });
    }
});

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            res.status(401).json({ error: error.message });
            return;
        }

        res.json({
            user: {
                id: data.user.id,
                email: data.user.email,
                full_name: data.user.user_metadata?.full_name || "User",
            },
            token: data.session.access_token,
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Login failed" });
    }
});

// POST /api/auth/logout
router.post("/logout", async (_req: Request, res: Response) => {
    try {
        await supabase.auth.signOut();
        res.json({ message: "Logged out successfully" });
    } catch {
        res.status(500).json({ error: "Logout failed" });
    }
});

export default router;
