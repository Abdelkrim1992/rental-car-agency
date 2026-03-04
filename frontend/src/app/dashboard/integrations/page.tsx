"use client";

import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
    Chip,
    Divider
} from "@heroui/react";
import { Link2, Webhook, Fingerprint, Globe, ShieldCheck, Zap } from "lucide-react";

const integrations = [
    {
        name: "Stripe",
        description: "Handle reservation deposits and subscription billing with global compliance.",
        status: "disconnected",
        statusLabel: "Disconnected",
        icon: Globe,
        detail: "Global Payout Enabled",
        action: "Connect",
        actionIcon: Link2,
    },
    {
        name: "Resend",
        description: "Send booking confirmations and arrival instructions via email with high deliverability.",
        status: "active",
        statusLabel: "Active",
        icon: ShieldCheck,
        detail: "Security Protocol Active",
        action: "Configure",
        actionIcon: Fingerprint,
    },
    {
        name: "Webhooks",
        description: "Trigger real-time updates to external ERP systems and maintain inventory parity.",
        status: "disconnected",
        statusLabel: "Offline",
        icon: Zap,
        detail: "Low Latency Target",
        action: "Setup",
        actionIcon: Webhook,
    },
];

export default function IntegrationsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Integrations</h1>
                <p className="text-small text-default-500">Connect your fleet with external services and secure ecosystems.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((item) => (
                    <Card key={item.name}>
                        <CardHeader className="flex justify-between items-start pb-2">
                            <div>
                                <p className="text-large font-bold">{item.name}</p>
                                <p className="text-tiny text-default-400">{item.status === "active" ? "Communication Bridge" : "Integration"}</p>
                            </div>
                            <Chip
                                variant="flat"
                                color={item.status === "active" ? "success" : "default"}
                                size="sm"
                            >
                                {item.statusLabel}
                            </Chip>
                        </CardHeader>
                        <CardBody className="py-2">
                            <p className="text-small text-default-500">{item.description}</p>
                            <div className="mt-4 p-3 rounded-lg bg-default-100 flex items-center gap-2">
                                <item.icon className="size-4 text-default-400" />
                                <span className="text-tiny text-default-500">{item.detail}</span>
                            </div>
                        </CardBody>
                        <CardFooter className="justify-end border-t border-default-100">
                            <Button
                                variant="flat"
                                size="sm"
                                startContent={<item.actionIcon className="size-4" />}
                            >
                                {item.action}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
