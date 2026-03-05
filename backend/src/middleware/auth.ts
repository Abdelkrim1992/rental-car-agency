import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../config/supabase.js";

export interface AuthRequest extends Request {
    userId?: string;
}

/**
 * Middleware to verify Supabase JWT tokens.
 * Since the frontend logs in via Supabase, we MUST verify the token
 * with Supabase instead of a custom backend secret.
 */
export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: "No token provided (Authorization header missing)" });
        return;
    }

    if (!authHeader.toLowerCase().startsWith("bearer")) {
        res.status(401).json({ error: "Invalid Authorization format (Expected Bearer <token>)" });
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token || token.trim() === "") {
        res.status(401).json({ error: "Empty token provided" });
        return;
    }

    try {
        // Use Supabase to verify the token and get the user
        const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

        if (error || !user) {
            console.warn("Supabase auth error:", error?.message);
            res.status(401).json({ error: "Invalid or expired token" });
            return;
        }

        // Attach userId to the request for downstream use
        req.userId = user.id;
        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err);
        res.status(401).json({ error: "Authentication failed" });
    }
}
