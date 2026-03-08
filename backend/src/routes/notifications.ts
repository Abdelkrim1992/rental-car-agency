import { Router, Response } from "express";
import { supabaseAdmin } from "../config/supabase.js";
import { authMiddleware, AuthRequest } from "../middleware/auth.js";

const router = Router();

// GET /api/notifications — Fetch all notifications (admin only usually, but here we just fetch all for the dashboard)
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { data, error } = await supabaseAdmin
            .from("notifications")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;
        res.json(data || []);
    } catch (err) {
        console.error("❌ Error fetching notifications:", err);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
});

// PATCH /api/notifications/:id/read — Mark a notification as read
router.patch("/:id/read", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { error } = await supabaseAdmin
            .from("notifications")
            .update({ status: "read" })
            .eq("id", id);

        if (error) throw error;
        res.json({ success: true });
    } catch (err) {
        console.error("❌ Error marking notification as read:", err);
        res.status(500).json({ error: "Failed to update notification" });
    }
});

// POST /api/notifications/mark-all-read — Mark all as read
router.post("/mark-all-read", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { error } = await supabaseAdmin
            .from("notifications")
            .update({ status: "read" })
            .eq("status", "unread");

        if (error) throw error;
        res.json({ success: true });
    } catch (err) {
        console.error("❌ Error marking all read:", err);
        res.status(500).json({ error: "Failed to update notifications" });
    }
});

export default router;
