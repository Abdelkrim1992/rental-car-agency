"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMessages, markMessageRead, deleteMessage } from "@/store/slices/messagesSlice";
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
import { Mail, Phone, Clock, FileWarning, MoreHorizontal, Trash2, Eye, CheckCircle2, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this message?")) {
            dispatch(deleteMessage(id));
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Inquiry Hub</h1>
                <p className="text-muted-foreground font-medium">
                    Monitor and respond to direct inquiries from your potential clients.
                </p>
            </div>

            <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold">Contact Stream</CardTitle>
                    <CardDescription className="text-sm font-medium">
                        You have <span className="text-orange-600 font-bold">{messages.filter(m => m.status === 'unread').length}</span> priority messages awaiting your attention.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="py-32 flex flex-col items-center justify-center gap-4">
                            <span className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
                            <span className="text-sm font-bold text-muted-foreground animate-pulse uppercase tracking-widest">Synchronizing...</span>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="py-32 flex flex-col items-center justify-center text-muted-foreground gap-4">
                            <Inbox className="h-16 w-16 opacity-10" />
                            <div className="text-center space-y-1">
                                <span className="text-sm font-bold uppercase tracking-widest opacity-50 block">No inquiries found</span>
                                <p className="text-xs max-w-[280px]">Your inbox is currently clear. New messages from the contact form will appear here.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl border bg-background/50 overflow-hidden">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="w-[120px] font-bold uppercase text-[10px] tracking-widest">Classification</TableHead>
                                        <TableHead className="font-bold uppercase text-[10px] tracking-widest">Sender</TableHead>
                                        <TableHead className="hidden md:table-cell font-bold uppercase text-[10px] tracking-widest">Connectivity</TableHead>
                                        <TableHead className="w-[35%] font-bold uppercase text-[10px] tracking-widest">Message Digest</TableHead>
                                        <TableHead className="text-right font-bold uppercase text-[10px] tracking-widest">Received</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {messages.map((msg) => (
                                        <TableRow
                                            key={msg.id}
                                            className={`group transition-all duration-300 hover:bg-muted/30 cursor-pointer ${msg.status === "unread" ? 'bg-orange-50/30' : ''}`}
                                            onClick={() => handleMarkAsRead(msg.id, msg.status)}
                                        >
                                            <TableCell>
                                                {msg.status === "unread" ? (
                                                    <Badge className="bg-orange-500 hover:bg-orange-600 font-bold uppercase text-[9px] px-2 h-5">New Alert</Badge>
                                                ) : (
                                                    <Badge variant="outline" className="font-bold uppercase text-[9px] px-2 h-5 text-muted-foreground/60">Reviewed</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8 border-2 border-background shadow-sm">
                                                        <AvatarFallback className="text-[10px] font-bold bg-muted-foreground/10">{msg.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-bold text-sm tracking-tight">{msg.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex flex-col gap-1.5 py-1">
                                                    <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                                                        <Mail className="w-3 h-3 text-primary/40" />
                                                        {msg.email}
                                                    </div>
                                                    {msg.phone && (
                                                        <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                                                            <Phone className="w-3 h-3 text-primary/40" />
                                                            {msg.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <p className="max-w-[300px] truncate text-xs font-medium text-foreground/80 leading-relaxed italic">
                                                    "{msg.message}"
                                                </p>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className="text-[11px] font-black text-foreground/70 tracking-tighter">{new Date(msg.created_at).toLocaleDateString()}</span>
                                                    <span className="text-[9px] font-bold uppercase text-muted-foreground/50 tracking-widest flex items-center gap-1">
                                                        <Clock className="w-2.5 h-2.5" />
                                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Manage Link</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => handleMarkAsRead(msg.id, msg.status)} className="flex items-center gap-2">
                                                            <CheckCircle2 className="h-4 w-4 text-green-500" /> Mark as Processed
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                                            onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" /> Delete Permanently
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
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
