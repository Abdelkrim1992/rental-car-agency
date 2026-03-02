import { Router, Request, Response } from "express";
import { supabaseAdmin } from "../config/supabase.js";
import { authMiddleware, AuthRequest } from "../middleware/auth.js";

const router = Router();

// GET /api/reviews — Get reviews (optional car_id filter)
router.get("/", async (req: Request, res: Response) => {
    try {
        let query = supabaseAdmin.from("reviews").select("*, profiles(full_name, avatar_url)").order("created_at", { ascending: false });

        if (req.query.car_id) {
            query = query.eq("car_id", req.query.car_id);
        }

        const { data, error } = await query.limit(20);

        if (error) throw error;

        const reviews = (data || []).map((r: Record<string, unknown>) => ({
            name: (r.profiles as Record<string, unknown>)?.full_name || "Anonymous",
            location: "Customer",
            rating: r.rating,
            title: r.title,
            text: r.text,
            avatar: (r.profiles as Record<string, unknown>)?.avatar_url || "",
            photo: "",
        }));

        res.json(reviews);
    } catch (err) {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
});

// POST /api/reviews — Submit a review (protected)
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { car_id, rating, title, text } = req.body;

        if (!car_id || !rating || !title || !text) {
            res.status(400).json({ error: "Missing required review fields" });
            return;
        }

        const { data, error } = await supabaseAdmin
            .from("reviews")
            .insert({
                user_id: req.userId!,
                car_id,
                rating: Math.min(5, Math.max(1, rating)),
                title,
                text,
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (err) {
        console.error("Error creating review:", err);
        res.status(500).json({ error: "Failed to create review" });
    }
});

export default router;
