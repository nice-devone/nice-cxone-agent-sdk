import React from 'react';
import { ToastOptions } from 'react-toastify';
declare type NotificationHandlerOptions = {
    autoClose?: number;
} & ToastOptions;
/**
 * Connect LV notification system with CXone notification system
 * @example
 * ```
 * const { success, info, warn, error } = useNotificationHandler({ containerId: 'test' })
 * ```
 */
export default function useNotificationHandler(props: NotificationHandlerOptions): {
    error: (message: string) => void;
    info: (message: string) => void;
    success: (message: string) => void;
    warn: (message: string | React.ReactNode) => void;
};
export {};
