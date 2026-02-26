import { AgentMessageNotification, RecordingMessages, WemNotificationDisplayData, WemNotificationRecordingData } from '@nice-devone/common-sdk';
import { PayloadAction } from '@reduxjs/toolkit';
import { ToastMessageType } from '../../enums/toast-message-type';
export declare const AGENT_NOTIFICATION_KEY = "agentNotification";
export declare enum NotificationTemplate {
    PUBLISH_SCHEDULE_FOR_SPECIFIC_DATE = "PUBLISH_SCHEDULE_FOR_SPECIFIC_DATE",
    PUBLISH_SCHEDULE_BETWEEN_DATE = "PUBLISH_SCHEDULE_BETWEEN_DATE",
    APPROVED_TIME_OFF_REQUEST = "APPROVED_TIME_OFF_REQUEST_V3",
    SHIFT_TRADING_ACCEPTED = "SHIFT_TRADING_ACCEPTED",
    SHIFT_TRADING_APPROVED = "SHIFT_TRADING_APPROVED"
}
export interface CcfNotification {
    notifications: WemNotificationDisplayData[];
    acdNotifications: AgentMessageNotification[];
    newAcdNotification: AgentMessageNotification;
    newRecordingNotification?: WemNotificationRecordingData;
    isNotificationNavigationKeyPressed: boolean;
    conversations: AgentMessageNotification[];
    newConversationNotification: AgentMessageNotification;
}
/**
 * Function to establish websocket connection and get notifications
 * @example - dispatch(fetchAllNotifications())
 */
export declare const fetchAllNotifications: import("@reduxjs/toolkit").AsyncThunk<void, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Function to send notification acknowledgement
 * @example - dispatch(markNotificationsAknowledged())
 */
export declare const markNotificationsAknowledged: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Function to send acd notification markread acknowledgement
 * @example - dispatch(markACDNotification(1234))
 */
export declare const markACDNotification: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Function to get active acd notifications
 * @example - dispatch(getActiveACDNotifications())
 */
export declare const getActiveACDNotifications: import("@reduxjs/toolkit").AsyncThunk<void, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Function to get active recording notifications
 * @example -
 * ```
 * dispatch(getActiveRecordingNotifications())
 * ```
 * @returns - Promise that resolves to an array of WemNotificationRecordingData
 */
export declare const getActiveRecordingNotifications: import("@reduxjs/toolkit").AsyncThunk<WemNotificationRecordingData, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Function to update voice call recording state
 * @param isRecording - boolean indicating if the voice call is being recorded
 * @example
 * ```
 * updateVoiceCallRecordState(true)
 * ```
 */
export declare const updateVoiceCallRecordState: import("@reduxjs/toolkit").AsyncThunk<void, boolean, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Function to update recording message based on recording status
 * @param recordingNotification - WemNotificationRecordingData
 * @returns Updated WemNotificationRecordingData
 * @example
 * ```
 * updateRecordingMessage(recordingNotification)
 * ```
 */
export declare const updateRecordingMessage: (recordingNotification: WemNotificationRecordingData) => {
    isRecording: boolean;
    messageKey: RecordingMessages;
    toastType: ToastMessageType.FAILURE | ToastMessageType.INFO;
    id: string;
    recordingId: string;
    contactId: string;
    recordingStreamDirection: "ToAgent" | "FromAgent";
    status: "RECORDING" | "STOPPED" | "RECORDING_FAILURE" | "POOR_QUALITY" | "UNKNOWN" | "NORECORDING";
    reason: "Policy" | "Hold" | "Mask" | "RecordOnDemand" | "StopOnDemand" | "CustomerDisconsent" | "Unknown";
    template: string;
    notificationType: "WemNotification" | "AgentNotification" | "RecordingNotification" | "ConversationNotification";
    isRealtimeNotificationEnabled: boolean;
    timestamp?: Date | undefined;
};
export declare const notificationSlice: import("@reduxjs/toolkit").Slice<{
    isNotificationNavigationKeyPressed: boolean;
    notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
    acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
    newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
    conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
    newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
}, {
    /**
     * Function to set conversaions notifications
     * @param state - agentnotifications
     * @param action  - PayloadAction<AgentMessageNotification>
     * @returns It returns updated conversations notifications
     * @example -processAndSetConversationsNotifications()
     */
    processAndSetConversationsNotifications(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>, action: PayloadAction<AgentMessageNotification[]>): {
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
        notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        isNotificationNavigationKeyPressed: boolean;
    };
    /**
     * Function to set agent notifications
     * @param state - agentnotifications
     * @param action  - PayloadAction<WemNotificationDisplayData>
     * @returns It returns updated agent notifications
     * @example -processAndSetNotifications()
     */
    processAndSetNotifications(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>, action: PayloadAction<WemNotificationDisplayData>): {
        notifications: WemNotificationDisplayData[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        isNotificationNavigationKeyPressed: boolean;
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
    /**
     * Function to set agent's ACD notifications
     * @param state - agentnotifications
     * @param action  - PayloadAction<AgentMessageNotification>
     * @returns It returns updated agent notifications
     * @example -processAndSetACDNotifications()
     */
    processAndSetACDNotifications(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>, action: PayloadAction<AgentMessageNotification[]>): {
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        isNotificationNavigationKeyPressed: boolean;
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
    /**
     * Function to set agent's Recording notifications
     * @param state - agentnotifications
     * @param action  - PayloadAction<WemNotificationRecordingData>
     * @returns It returns updated agent notifications
     * @example
     * ```
     * processAndSetRecordingNotifications()
     * ```
     */
    processRecordingNotifications(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>, action: PayloadAction<WemNotificationRecordingData>): import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>;
    /**
     * Function to update last shown recording notification
     * @param state - agentnotifications
     * @returns It returns updated last shown recording notification
     * @example
     * ```
     * removeRecordingNotification()
     * ```
     */
    removeRecordingNotification(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>): {
        newRecordingNotification: WemNotificationRecordingData;
        notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
        isNotificationNavigationKeyPressed: boolean;
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
    /**
     * Function to mark read conversation
     * @param state - conversation notifications
     * @returns It returns updated conversation notifications
     * @example -markConversationsNotificatonRead()
     */
    markConversationsNotificatonRead(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>, action: PayloadAction<string>): {
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        isNotificationNavigationKeyPressed: boolean;
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
    /**
     * Function to set agent's ACD notifications
     * @param state - agentnotifications
     * @returns It returns updated agent notifications
     * @example -markAcdNotificatonRead()
     */
    markAcdNotificatonRead(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>): {
        newAcdNotification: AgentMessageNotification;
        notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        isNotificationNavigationKeyPressed: boolean;
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
    /**
     * Function to set msgRead as true for WEM notifications
     * @param state - notifications
     * @returns It returns updated WEM notifications
     * @example
     * ```
     * markWemNotificationsAcknowledged()
     * ```
     */
    markWemNotificationsAcknowledged(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>): {
        notifications: {
            id: string;
            message: string;
            subject: string;
            receivedDateTime: Date;
            msgRead: boolean;
            evolveNotificationUrl: string;
            template: string;
            notificationType: "WemNotification" | "AgentNotification" | "RecordingNotification" | "ConversationNotification";
            parse: (message: import("@nice-devone/common-sdk").WemNotificationMessage) => void;
        }[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        isNotificationNavigationKeyPressed: boolean;
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
    /**
     * Function to set isNotificationNavigationKeyPressed
     * @param state - notifications
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated isNotificationNavigationKeyPressed
     * @example
     * ```
     * focusNotification(true)
     * ```
     */
    focusNotification(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>, action: PayloadAction<boolean>): {
        isNotificationNavigationKeyPressed: boolean;
        notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
}, "agentNotification">;
export declare const agentWemNotificationsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Function to set conversaions notifications
     * @param state - agentnotifications
     * @param action  - PayloadAction<AgentMessageNotification>
     * @returns It returns updated conversations notifications
     * @example -processAndSetConversationsNotifications()
     */
    processAndSetConversationsNotifications(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>, action: PayloadAction<AgentMessageNotification[]>): {
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
        notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        isNotificationNavigationKeyPressed: boolean;
    };
    /**
     * Function to set agent notifications
     * @param state - agentnotifications
     * @param action  - PayloadAction<WemNotificationDisplayData>
     * @returns It returns updated agent notifications
     * @example -processAndSetNotifications()
     */
    processAndSetNotifications(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>, action: PayloadAction<WemNotificationDisplayData>): {
        notifications: WemNotificationDisplayData[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        isNotificationNavigationKeyPressed: boolean;
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
    /**
     * Function to set agent's ACD notifications
     * @param state - agentnotifications
     * @param action  - PayloadAction<AgentMessageNotification>
     * @returns It returns updated agent notifications
     * @example -processAndSetACDNotifications()
     */
    processAndSetACDNotifications(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>, action: PayloadAction<AgentMessageNotification[]>): {
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        isNotificationNavigationKeyPressed: boolean;
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
    /**
     * Function to set agent's Recording notifications
     * @param state - agentnotifications
     * @param action  - PayloadAction<WemNotificationRecordingData>
     * @returns It returns updated agent notifications
     * @example
     * ```
     * processAndSetRecordingNotifications()
     * ```
     */
    processRecordingNotifications(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>, action: PayloadAction<WemNotificationRecordingData>): import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>;
    /**
     * Function to update last shown recording notification
     * @param state - agentnotifications
     * @returns It returns updated last shown recording notification
     * @example
     * ```
     * removeRecordingNotification()
     * ```
     */
    removeRecordingNotification(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>): {
        newRecordingNotification: WemNotificationRecordingData;
        notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
        isNotificationNavigationKeyPressed: boolean;
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
    /**
     * Function to mark read conversation
     * @param state - conversation notifications
     * @returns It returns updated conversation notifications
     * @example -markConversationsNotificatonRead()
     */
    markConversationsNotificatonRead(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>, action: PayloadAction<string>): {
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        isNotificationNavigationKeyPressed: boolean;
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
    /**
     * Function to set agent's ACD notifications
     * @param state - agentnotifications
     * @returns It returns updated agent notifications
     * @example -markAcdNotificatonRead()
     */
    markAcdNotificatonRead(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>): {
        newAcdNotification: AgentMessageNotification;
        notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        isNotificationNavigationKeyPressed: boolean;
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
    /**
     * Function to set msgRead as true for WEM notifications
     * @param state - notifications
     * @returns It returns updated WEM notifications
     * @example
     * ```
     * markWemNotificationsAcknowledged()
     * ```
     */
    markWemNotificationsAcknowledged(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>): {
        notifications: {
            id: string;
            message: string;
            subject: string;
            receivedDateTime: Date;
            msgRead: boolean;
            evolveNotificationUrl: string;
            template: string;
            notificationType: "WemNotification" | "AgentNotification" | "RecordingNotification" | "ConversationNotification";
            parse: (message: import("@nice-devone/common-sdk").WemNotificationMessage) => void;
        }[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        isNotificationNavigationKeyPressed: boolean;
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
    /**
     * Function to set isNotificationNavigationKeyPressed
     * @param state - notifications
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated isNotificationNavigationKeyPressed
     * @example
     * ```
     * focusNotification(true)
     * ```
     */
    focusNotification(state: import("immer/dist/internal").WritableDraft<{
        notifications: WemNotificationDisplayData[];
        acdNotifications: AgentMessageNotification[];
        newAcdNotification: AgentMessageNotification;
        newRecordingNotification: WemNotificationRecordingData;
        isNotificationNavigationKeyPressed: boolean;
        conversations: AgentMessageNotification[];
        newConversationNotification: AgentMessageNotification;
    }>, action: PayloadAction<boolean>): {
        isNotificationNavigationKeyPressed: boolean;
        notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
        acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
        newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
        conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
        newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    };
}, "agentNotification">;
export declare const agentWemNotificationsReducer: import("redux").Reducer<{
    isNotificationNavigationKeyPressed: boolean;
    notifications: import("immer/dist/internal").WritableDraft<WemNotificationDisplayData>[];
    acdNotifications: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
    newAcdNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
    newRecordingNotification: import("immer/dist/internal").WritableDraft<WemNotificationRecordingData>;
    conversations: import("immer/dist/internal").WritableDraft<AgentMessageNotification>[];
    newConversationNotification: import("immer/dist/internal").WritableDraft<AgentMessageNotification>;
}, import("redux").AnyAction>;
/**
 * Used to get unread notifications
 * @example - const notificationCount = useSelector(getUnreadNotificationCount);
 */
export declare const getUnreadNotifications: ((state: {
    agentNotification: CcfNotification;
}) => (AgentMessageNotification | WemNotificationDisplayData)[]) & import("reselect").OutputSelectorFields<(args_0: CcfNotification) => (AgentMessageNotification | WemNotificationDisplayData)[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get unread ACD notifications
 * @example - const notificationCount = useSelector(getAcdUnreadNotification);
 */
export declare const getNewAcdUnreadNotification: ((state: {
    agentNotification: CcfNotification;
}) => AgentMessageNotification) & import("reselect").OutputSelectorFields<(args_0: CcfNotification) => AgentMessageNotification & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get new Recording Notification
 * @example
 * ```
 * const newRecordingNotification = useSelector(getNewRecordingNotification);
 * ```
 */
export declare const getNewRecordingNotification: ((state: {
    agentNotification: CcfNotification;
}) => WemNotificationRecordingData | undefined) & import("reselect").OutputSelectorFields<(args_0: CcfNotification) => WemNotificationRecordingData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get new conversations notifications
 * @example - const conversation = useSelector(getNewConversationNotification);
 */
export declare const getNewConversationNotification: ((state: {
    agentNotification: CcfNotification;
}) => AgentMessageNotification) & import("reselect").OutputSelectorFields<(args_0: CcfNotification) => AgentMessageNotification & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get unread Conversations notifications
 * @example - const notificationCount = useSelector(getConversationsUnreadNotification);
 */
export declare const getConversationsUnreadNotification: ((state: {
    agentNotification: CcfNotification;
}) => AgentMessageNotification[]) & import("reselect").OutputSelectorFields<(args_0: CcfNotification) => AgentMessageNotification[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get Wem Notifications
 * @example - const wemNotifications = useSelector(getWemNotifications);
 */
export declare const getWemNotifications: ((state: {
    agentNotification: CcfNotification;
}) => WemNotificationDisplayData[]) & import("reselect").OutputSelectorFields<(args_0: CcfNotification) => WemNotificationDisplayData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get acd Notifications
 * @example - const acdNotifications = useSelector(getAcdNotifications);
 */
export declare const getAcdNotifications: ((state: {
    agentNotification: CcfNotification;
}) => AgentMessageNotification[]) & import("reselect").OutputSelectorFields<(args_0: CcfNotification) => AgentMessageNotification[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get All Notifications
 * @example - const allNotifications = useSelector(getAllNotification);
 */
export declare const getAllNotification: ((state: {
    agentNotification: CcfNotification;
}) => (AgentMessageNotification | WemNotificationDisplayData)[]) & import("reselect").OutputSelectorFields<(args_0: CcfNotification) => (AgentMessageNotification | WemNotificationDisplayData)[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get schedule change Notifications
 * @example - const wemScheduleChangeNotifications = useSelector(getWemScheduleChangeNotifications);
 */
export declare const getWemScheduleChangeNotifications: ((state: {
    agentNotification: CcfNotification;
}) => WemNotificationDisplayData[]) & import("reselect").OutputSelectorFields<(args_0: CcfNotification) => WemNotificationDisplayData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isNotificationNavigationKeyPressed status
 * @example - const isNotificationKeyPressed = useSelector(getNotificationKeyStatus);
 */
export declare const getNotificationKeyStatus: ((state: {
    agentNotification: CcfNotification;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfNotification) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
