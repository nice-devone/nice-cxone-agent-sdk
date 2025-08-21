export declare enum NotificationTypeEnum {
    WemNotification = "WemNotification",
    AgentNotification = "AgentNotification",
    RecordingNotification = "RecordingNotification",
    ConversationNotification = "ConversationNotification"
}
export declare type NotificationType = keyof typeof NotificationTypeEnum;
/**
 * model class to display Agent Message notification
 */
export declare class AgentMessageNotification {
    /**
     * @remarks notification message id
     */
    id: string;
    /**
     * @remarks notification message
     */
    message: string;
    /**
     * @remarks notification subject
     */
    subject: string;
    /**
     * @remarks received date time
     */
    receivedDateTime: Date;
    /**
     * @remarks message read
     */
    msgRead: boolean;
    /**
     * @remarks valid until
     */
    validUntil: number;
    /**
     * @remarks received time
     */
    receivedTime: number;
    /**
     * @remarks expiration time
     */
    expTimer: number;
    /**
     * @remarks Notification type
     */
    notificationType: NotificationType;
    /**
     * The parse will parse the agent notification message
     * @param data -
     * @example -
     * ```
     * parse(message);
     * ```
     */
    parse(data: {
        [key: string]: string;
    }): void;
}
