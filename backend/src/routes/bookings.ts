import { Router, Response } from "express";
import { supabaseAdmin } from "../config/supabase.js";
import { authMiddleware, AuthRequest } from "../middleware/auth.js";

const router = Router();

// GET /api/bookings — Get user's bookings (protected)
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { data, error } = await supabaseAdmin
            .from("bookings")
            .select("*, cars(name, image_url)")
            .eq("user_id", req.userId!)
            .order("created_at", { ascending: false });

        if (error) throw error;

        const bookings = (data || []).map((b: Record<string, unknown>) => ({
            id: b.id,
            car_id: b.car_id,
            car_name: (b.cars as Record<string, unknown>)?.name || "Unknown",
            car_img: (b.cars as Record<string, unknown>)?.image_url || "",
            pickup_date: b.pickup_date,
            return_date: b.return_date,
            pickup_location: b.pickup_location,
            total_price: b.total_price,
            status: b.status,
            created_at: b.created_at,
        }));

        res.json(bookings);
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
});

// POST /api/bookings — Create a booking (protected)
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { car_id, pickup_date, return_date, pickup_location, total_price } = req.body;

        if (!car_id || !pickup_date || !return_date || !pickup_location) {
            res.status(400).json({ error: "Missing required booking fields" });
            return;
        }

        const { data, error } = await supabaseAdmin
            .from("bookings")
            .insert({
                user_id: req.userId!,
                car_id,
                pickup_date,
                return_date,
                pickup_location,
                total_price: total_price || 0,
                status: "pending",
            })
            .select("*, cars(name, image_url)")
            .single();

        if (error) throw error;

        res.status(201).json({
            id: data.id,
            car_id: data.car_id,
            car_name: (data.cars as Record<string, unknown>)?.name || "Unknown",
            car_img: (data.cars as Record<string, unknown>)?.image_url || "",
            pickup_date: data.pickup_date,
            return_date: data.return_date,
            pickup_location: data.pickup_location,
            total_price: data.total_price,
            status: data.status,
            created_at: data.created_at,
        });
    } catch (err) {
        console.error("Error creating booking:", err);
        res.status(500).json({ error: "Failed to create booking" });
    }
});

// PATCH /api/bookings/:id — Update booking status (protected)
router.patch("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { status } = req.body;
        const validStatuses = ["pending", "confirmed", "completed", "cancelled"];

        if (!status || !validStatuses.includes(status)) {
            res.status(400).json({ error: "Invalid status" });
            return;
        }

        const { data, error } = await supabaseAdmin
            .from("bookings")
            .update({ status })
            .eq("id", req.params.id)
            .eq("user_id", req.userId!)
            .select()
            .single();

        if (error || !data) {
            res.status(404).json({ error: "Booking not found" });
            return;
        }

        res.json(data);
    } catch (err) {
        console.error("Error updating booking:", err);
        res.status(500).json({ error: "Failed to update booking" });
    }
});

export default router;
