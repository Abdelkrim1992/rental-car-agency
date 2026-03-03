"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMessages, markMessageRead } from "@/store/slices/messagesSlice";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Clock, FileWarning } from "lucide-react";

export default function MessagesPage() {
    const dispatch = useAppDispatch();
    const { messages, loading } = useAppSelector((state) => state.messages);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    const handleMarkAsRead = (id: string, status: string) => {
        if (status === "unread") {
            dispatch(markMessageRead(id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Contact Inquiries</h1>
                <p className="text-sm text-slate-500">
                    Messages received from the landing page contact form.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>
                        You have {messages.filter(m => m.status === 'unread').length} unread messages.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="py-20 flex justify-center items-center">
                            <span className="text-sm text-slate-500">Loading messages...</span>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="py-20 flex flex-col justify-center items-center gap-3">
                            <FileWarning className="w-10 h-10 text-slate-300" />
                            <span className="text-sm text-slate-500 font-medium">No messages found.</span>
                            <span className="text-xs text-slate-400">If your Supabase table is not set up, form submissions will fall back to local mock data.</span>
                        </div>
                    ) : (
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead className="hidden md:table-cell">Contact</TableHead>
                                        <TableHead className="w-[40%]">Message</TableHead>
                                        <TableHead className="text-right">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {messages.map((msg) => (
                                        <TableRow
                                            key={msg.id}
                                            className={`cursor-pointer ${msg.status === "unread" ? 'bg-slate-50 font-medium' : ''}`}
                                            onClick={() => handleMarkAsRead(msg.id, msg.status)}
                                        >
                                            <TableCell>
                                                {msg.status === "unread" ? (
                                                    <Badge variant="default" className="bg-orange-500 hover:bg-orange-600">Unread</Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="bg-slate-100 text-slate-600">Read</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>{msg.name}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex flex-col gap-1 text-sm text-slate-500 font-normal">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-3 h-3" />
                                                        {msg.email}
                                                    </div>
                                                    {msg.phone && (
                                                        <div className="flex items-center gap-2">
                                                            <Phone className="w-3 h-3" />
                                                            {msg.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-[200px] truncate text-sm">
                                                {msg.message}
                                            </TableCell>
                                            <TableCell className="text-right text-slate-500 text-sm font-normal">
                                                {new Date(msg.created_at).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
