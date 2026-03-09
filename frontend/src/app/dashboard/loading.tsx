"use client";

import React from 'react';
import { Spinner } from "@heroui/react";

export default function Loading() {
    return (
        <div className="flex h-[80vh] w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Spinner size="lg" color="primary" labelColor="primary" label="Loading dashboard..." />
            </div>
        </div>
    );
}
