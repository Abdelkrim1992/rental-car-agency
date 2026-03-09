"use client";

import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "@heroui/react";
import { AlertCircle } from "lucide-react";

export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    title?: string;
    message?: string;
    isLoading?: boolean;
    confirmColor?: "danger" | "primary" | "warning";
    confirmText?: string;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to perform this action?",
    isLoading = false,
    confirmColor = "danger",
    confirmText = "Delete"
}: ConfirmModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="center"
            backdrop="blur"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <AlertCircle className={`size-5 ${confirmColor === 'danger' ? 'text-danger' : 'text-primary'}`} />
                                <span className="text-xl font-bold">{title}</span>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-default-500">{message}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                variant="light"
                                onPress={onClose}
                                isDisabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                color={confirmColor}
                                onPress={async () => {
                                    await onConfirm();
                                    onClose();
                                }}
                                isLoading={isLoading}
                            >
                                {confirmText}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
