"use client";

import { HeroUIProvider } from "@heroui/react";
import { ReduxProvider } from "@/store/provider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <ReduxProvider>
                {children}
                <Toaster richColors position="top-right" closeButton />
            </ReduxProvider>
        </HeroUIProvider>
    );
}
