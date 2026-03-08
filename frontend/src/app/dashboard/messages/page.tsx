"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMessages, markMessageRead, deleteMessage, replyToMessage, Message } from "@/store/slices/messagesSlice";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Avatar,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Textarea,
    Skeleton,
    Divider
} from "@heroui/react";
import { Mail, Phone, Clock, MoreVertical, Trash2, Eye, Inbox, Send, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function MessagesPage() {
    const dispatch = useAppDispatch();
    const { messages, loading } = useAppSelector((state) => state.messages);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [replyText, setReplyText] = useState("");
    const [isReplying, setIsReplying] = useState(false);

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

    const handleOpenMessage = (msg: Message) => {
        setSelectedMessage(msg);
        handleMarkAsRead(msg.id, msg.status);
    };

    const handleSendReply = async () => {
        if (!selectedMessage || !replyText.trim()) return;
        setIsReplying(true);
        try {
            await dispatch(replyToMessage({ id: selectedMessage.id, replyMessage: replyText })).unwrap();
            toast.success("Reply sent successfully!");
            setReplyText("");
            setSelectedMessage(null);
        } catch (err) {
            toast.error("Failed to send reply: " + String(err));
        } finally {
            setIsReplying(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Messages</h1>
                <p className="text-small text-default-500">
                    <span className="text-warning font-medium">{messages.filter(m => m.status === 'unread').length} unread</span> messages awaiting attention
                </p>
            </div>

            <Card>
                <CardHeader className="pb-2">
                    <div>
                        <p className="text-large font-bold">Contact Stream</p>
                        <p className="text-small text-default-500">All incoming messages</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <Table
                        aria-label="Messages table"
                        removeWrapper
                        selectionMode="single"
                        onRowAction={(key) => handleOpenMessage(messages.find(m => m.id === key) as Message)}
                    >
                        <TableHeader>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Sender</TableColumn>
                            <TableColumn className="hidden md:table-cell">Contact</TableColumn>
                            <TableColumn className="hidden sm:table-cell">Message</TableColumn>
                            <TableColumn className="text-right hidden lg:table-cell">Received</TableColumn>
                            <TableColumn className="text-right">Actions</TableColumn>
                        </TableHeader>
                        <TableBody
                            loadingContent={<Skeleton className="w-full h-20" />}
                            emptyContent={
                                <div className="py-12 flex flex-col items-center justify-center gap-2 text-default-400">
                                    <Inbox size={32} />
                                    <span>No messages yet</span>
                                </div>
                            }
                        >
                            {messages.map((msg) => (
                                <TableRow key={msg.id} className="cursor-pointer">
                                    <TableCell>
                                        <Chip
                                            variant="flat"
                                            color={msg.status === "unread" ? "warning" : "default"}
                                            size="sm"
                                        >
                                            {msg.status === "unread" ? "New" : "Read"}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar name={msg.name} size="sm" />
                                            <span className="text-sm font-semibold">{msg.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-tiny text-default-500 flex items-center gap-1">
                                                <Mail size={12} /> {msg.email}
                                            </p>
                                            {msg.phone && (
                                                <p className="text-tiny text-default-500 flex items-center gap-1">
                                                    <Phone size={12} /> {msg.phone}
                                                </p>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <p className="text-small text-default-500 line-clamp-1 italic">
                                            &ldquo;{msg.message}&rdquo;
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-right hidden lg:table-cell">
                                        <div className="flex flex-col items-end">
                                            <span className="text-small font-medium">{new Date(msg.created_at).toLocaleDateString()}</span>
                                            <span className="text-tiny text-default-400 flex items-center gap-1">
                                                <Clock size={10} />
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Dropdown placement="bottom-end">
                                            <DropdownTrigger>
                                                <Button isIconOnly variant="light" size="sm" onClick={(e) => e.stopPropagation()}>
                                                    <MoreVertical size={18} />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Message actions">
                                                <DropdownItem key="view" startContent={<Eye size={16} />} onPress={() => handleOpenMessage(msg)}>
                                                    View & Reply
                                                </DropdownItem>
                                                <DropdownItem key="delete" color="danger" className="text-danger" startContent={<Trash2 size={16} />} onPress={() => handleDelete(msg.id)}>
                                                    Delete Message
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>

            {/* Reply Modal */}
            <Modal
                isOpen={!!selectedMessage}
                onClose={() => setSelectedMessage(null)}
                size="2xl"
                scrollBehavior="inside"
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="size-5 text-primary" />
                                    <span className="text-xl font-bold">Message Details</span>
                                </div>
                                <p className="text-small text-default-400">
                                    Received on {selectedMessage && new Date(selectedMessage.created_at).toLocaleString()}
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-4 bg-default-50 rounded-lg">
                                            <p className="text-tiny text-default-400 font-semibold mb-2 uppercase">Sender Info</p>
                                            <div className="space-y-2">
                                                <p className="text-sm flex items-center gap-2"><User size={14} /> {selectedMessage?.name}</p>
                                                <p className="text-sm flex items-center gap-2"><Mail size={14} /> {selectedMessage?.email}</p>
                                                <p className="text-sm flex items-center gap-2"><Phone size={14} /> {selectedMessage?.phone || "No phone"}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-warning-50 rounded-lg">
                                            <p className="text-tiny text-warning font-semibold mb-2 uppercase">Message</p>
                                            <p className="text-sm italic">&ldquo;{selectedMessage?.message}&rdquo;</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Send className="size-4 text-primary" />
                                            <span className="text-small font-semibold text-default-500">Prepare Response</span>
                                        </div>
                                        <Textarea
                                            placeholder="Write your email reply here..."
                                            variant="flat"
                                            minRows={6}
                                            value={replyText}
                                            onValueChange={setReplyText}
                                        />
                                        <p className="text-tiny text-default-400 text-center">
                                            This email will be delivered to <span className="text-primary">{selectedMessage?.email}</span>
                                        </p>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    Dismiss
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={handleSendReply}
                                    isLoading={isReplying}
                                    endContent={!isReplying && <Send size={16} />}
                                    isDisabled={!replyText.trim()}
                                >
                                    Send Email Reply
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
