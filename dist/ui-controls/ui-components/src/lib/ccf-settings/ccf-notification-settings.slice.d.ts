import { PayloadAction } from '@reduxjs/toolkit';
import { AgentMessageNotification, CXoneAgentSettings, CXoneAudioVisualNotificationSettings, HeadsetDevice, InteractionDetails, VisualNotificationDetails, WemNotificationDisplayData } from '@nice-devone/common-sdk';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
import { CXoneVoiceContact, CXoneVoiceMailContact, CXoneWorkItemContact } from '@nice-devone/acd-sdk';
export declare const NOTIFICATION_SETTINGS_KEY = "notificationSettings";
export declare enum NotificationType {
    INCOMING_VOICE_INTERACTION = "IncomingVoiceInteraction",
    INCOMING_DIGITAL_INTERACTION = "IncomingDigitalInteraction",
    NEW_REPLY_DIGITAL_INTERACTION = "newReplyDigitalInteraction",
    NEW_AGENT_MESSAGE = "NewAgentMessage",
    END_INTERACTION = "EndInteraction",
    END_DIGITAL_INTERACTION = "EndDigitalInteraction",
    INCOMING_VOICEMAIL_INTERACTION = "IncomingVoicemailInteraction",
    INCOMING_WORKITEM_INTERACTION = "IncomingWorkitemInteraction"
}
export declare const fetchAllNotificationSettings: import("@reduxjs/toolkit").AsyncThunk<CXoneAudioVisualNotificationSettings, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const setAllNotificationSettings: import("@reduxjs/toolkit").AsyncThunk<void, CXoneAudioVisualNotificationSettings, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const clearNotificationSettingsfromIDB: import("@reduxjs/toolkit").AsyncThunk<void, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const handleCXoneAudioVisualNotification: import("@reduxjs/toolkit").AsyncThunk<void, {
    type: NotificationType;
    payload: CXoneVoiceContact | CXoneDigitalContact | AgentMessageNotification[] | WemNotificationDisplayData | CXoneVoiceMailContact | CXoneWorkItemContact;
}, {
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
 *
 * @example - playAudioForNotification(notificationType, audioFilePath);
 * @returns
 */
export declare const playAudioForNotification: (notificationType: string, audioFilePath: string, _loop?: boolean) => void;
export declare const notificationSettingsSlice: import("@reduxjs/toolkit").Slice<{
    avNotifications: CXoneAudioVisualNotificationSettings;
    notifiedEvents: InteractionDetails[];
    visualNotificationDetails: VisualNotificationDetails;
    currentHeadsetDevice: HeadsetDevice;
    headsetDeviceList: HeadsetDevice[];
}, {
    /**
     * Reducer function to store Notification Settings
     * @param state - NotificationSettingsState
     * @param action - action.payload
     * @example - dispatch(storeNotificationSettings());
     * @returns - updated state
     */
    storeNotificationSettings(state: import("immer/dist/internal").WritableDraft<{
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: InteractionDetails[];
        visualNotificationDetails: VisualNotificationDetails;
        currentHeadsetDevice: HeadsetDevice;
        headsetDeviceList: HeadsetDevice[];
    }>, action: PayloadAction<CXoneAudioVisualNotificationSettings>): {
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: import("immer/dist/internal").WritableDraft<InteractionDetails>[];
        visualNotificationDetails: import("immer/dist/internal").WritableDraft<VisualNotificationDetails>;
        currentHeadsetDevice: import("immer/dist/internal").WritableDraft<HeadsetDevice>;
        headsetDeviceList: import("immer/dist/internal").WritableDraft<HeadsetDevice>[];
    };
    /**
     * Reducer function to store Notified Events
     * @param state - NotificationSettingsState
     * @param action - action.payload
     * @example - dispatch(storeNotifiedEvents());
     * @returns - updated state
     */
    storeNotifiedEvents(state: import("immer/dist/internal").WritableDraft<{
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: InteractionDetails[];
        visualNotificationDetails: VisualNotificationDetails;
        currentHeadsetDevice: HeadsetDevice;
        headsetDeviceList: HeadsetDevice[];
    }>, action: PayloadAction<InteractionDetails>): {
        notifiedEvents: InteractionDetails[];
        avNotifications: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        visualNotificationDetails: import("immer/dist/internal").WritableDraft<VisualNotificationDetails>;
        currentHeadsetDevice: import("immer/dist/internal").WritableDraft<HeadsetDevice>;
        headsetDeviceList: import("immer/dist/internal").WritableDraft<HeadsetDevice>[];
    };
    /**
     * Reducer function to remove Notified Events
     * @param state - NotificationSettingsState
     * @param action - action.payload
     * @example - dispatch(removeNotifiedEvent());
     * @returns - updated state
     */
    removeNotifiedEvent(state: import("immer/dist/internal").WritableDraft<{
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: InteractionDetails[];
        visualNotificationDetails: VisualNotificationDetails;
        currentHeadsetDevice: HeadsetDevice;
        headsetDeviceList: HeadsetDevice[];
    }>, action: PayloadAction<InteractionDetails>): {
        notifiedEvents: import("immer/dist/internal").WritableDraft<InteractionDetails>[];
        avNotifications: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        visualNotificationDetails: import("immer/dist/internal").WritableDraft<VisualNotificationDetails>;
        currentHeadsetDevice: import("immer/dist/internal").WritableDraft<HeadsetDevice>;
        headsetDeviceList: import("immer/dist/internal").WritableDraft<HeadsetDevice>[];
    };
    /**
     * Reducer function to store Visual Notifications message
     * @param state - NotificationSettingsState
     * @param action - action.payload
     * @example - dispatch(storeVisualNotifications());
     * @returns - updated state
     */
    storeVisualNotifications(state: import("immer/dist/internal").WritableDraft<{
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: InteractionDetails[];
        visualNotificationDetails: VisualNotificationDetails;
        currentHeadsetDevice: HeadsetDevice;
        headsetDeviceList: HeadsetDevice[];
    }>, action: PayloadAction<VisualNotificationDetails>): {
        visualNotificationDetails: {
            display: true;
            title: string;
            from?: string | undefined;
            customerName?: string | undefined;
            message?: string | undefined;
            contactId?: string | undefined;
            skillName?: string | undefined;
        };
        avNotifications: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        notifiedEvents: import("immer/dist/internal").WritableDraft<InteractionDetails>[];
        currentHeadsetDevice: import("immer/dist/internal").WritableDraft<HeadsetDevice>;
        headsetDeviceList: import("immer/dist/internal").WritableDraft<HeadsetDevice>[];
    };
    /**
     * Reducer function to store Current Headset Device
     * @param state - NotificationSettingsState
     * @param action - action.payload
     * @example - dispatch(storeCurrentHeadsetDevice());
     * @returns - updated state
     */
    storeCurrentHeadsetDevice(state: import("immer/dist/internal").WritableDraft<{
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: InteractionDetails[];
        visualNotificationDetails: VisualNotificationDetails;
        currentHeadsetDevice: HeadsetDevice;
        headsetDeviceList: HeadsetDevice[];
    }>, action: PayloadAction<HeadsetDevice>): {
        currentHeadsetDevice: HeadsetDevice;
        avNotifications: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        notifiedEvents: import("immer/dist/internal").WritableDraft<InteractionDetails>[];
        visualNotificationDetails: import("immer/dist/internal").WritableDraft<VisualNotificationDetails>;
        headsetDeviceList: import("immer/dist/internal").WritableDraft<HeadsetDevice>[];
    };
    /**
     * Reducer function to store Headset Device List
     * @param state - NotificationSettingsState
     * @param action - action.payload
     * @example - dispatch(storeHeadsetDeviceList());
     * @returns - updated state
     */
    storeHeadsetDeviceList(state: import("immer/dist/internal").WritableDraft<{
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: InteractionDetails[];
        visualNotificationDetails: VisualNotificationDetails;
        currentHeadsetDevice: HeadsetDevice;
        headsetDeviceList: HeadsetDevice[];
    }>, action: PayloadAction<HeadsetDevice[]>): {
        headsetDeviceList: HeadsetDevice[];
        avNotifications: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        notifiedEvents: import("immer/dist/internal").WritableDraft<InteractionDetails>[];
        visualNotificationDetails: import("immer/dist/internal").WritableDraft<VisualNotificationDetails>;
        currentHeadsetDevice: import("immer/dist/internal").WritableDraft<HeadsetDevice>;
    };
}, "notificationSettings">;
export declare const notificationsSettingsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Reducer function to store Notification Settings
     * @param state - NotificationSettingsState
     * @param action - action.payload
     * @example - dispatch(storeNotificationSettings());
     * @returns - updated state
     */
    storeNotificationSettings(state: import("immer/dist/internal").WritableDraft<{
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: InteractionDetails[];
        visualNotificationDetails: VisualNotificationDetails;
        currentHeadsetDevice: HeadsetDevice;
        headsetDeviceList: HeadsetDevice[];
    }>, action: PayloadAction<CXoneAudioVisualNotificationSettings>): {
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: import("immer/dist/internal").WritableDraft<InteractionDetails>[];
        visualNotificationDetails: import("immer/dist/internal").WritableDraft<VisualNotificationDetails>;
        currentHeadsetDevice: import("immer/dist/internal").WritableDraft<HeadsetDevice>;
        headsetDeviceList: import("immer/dist/internal").WritableDraft<HeadsetDevice>[];
    };
    /**
     * Reducer function to store Notified Events
     * @param state - NotificationSettingsState
     * @param action - action.payload
     * @example - dispatch(storeNotifiedEvents());
     * @returns - updated state
     */
    storeNotifiedEvents(state: import("immer/dist/internal").WritableDraft<{
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: InteractionDetails[];
        visualNotificationDetails: VisualNotificationDetails;
        currentHeadsetDevice: HeadsetDevice;
        headsetDeviceList: HeadsetDevice[];
    }>, action: PayloadAction<InteractionDetails>): {
        notifiedEvents: InteractionDetails[];
        avNotifications: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        visualNotificationDetails: import("immer/dist/internal").WritableDraft<VisualNotificationDetails>;
        currentHeadsetDevice: import("immer/dist/internal").WritableDraft<HeadsetDevice>;
        headsetDeviceList: import("immer/dist/internal").WritableDraft<HeadsetDevice>[];
    };
    /**
     * Reducer function to remove Notified Events
     * @param state - NotificationSettingsState
     * @param action - action.payload
     * @example - dispatch(removeNotifiedEvent());
     * @returns - updated state
     */
    removeNotifiedEvent(state: import("immer/dist/internal").WritableDraft<{
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: InteractionDetails[];
        visualNotificationDetails: VisualNotificationDetails;
        currentHeadsetDevice: HeadsetDevice;
        headsetDeviceList: HeadsetDevice[];
    }>, action: PayloadAction<InteractionDetails>): {
        notifiedEvents: import("immer/dist/internal").WritableDraft<InteractionDetails>[];
        avNotifications: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        visualNotificationDetails: import("immer/dist/internal").WritableDraft<VisualNotificationDetails>;
        currentHeadsetDevice: import("immer/dist/internal").WritableDraft<HeadsetDevice>;
        headsetDeviceList: import("immer/dist/internal").WritableDraft<HeadsetDevice>[];
    };
    /**
     * Reducer function to store Visual Notifications message
     * @param state - NotificationSettingsState
     * @param action - action.payload
     * @example - dispatch(storeVisualNotifications());
     * @returns - updated state
     */
    storeVisualNotifications(state: import("immer/dist/internal").WritableDraft<{
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: InteractionDetails[];
        visualNotificationDetails: VisualNotificationDetails;
        currentHeadsetDevice: HeadsetDevice;
        headsetDeviceList: HeadsetDevice[];
    }>, action: PayloadAction<VisualNotificationDetails>): {
        visualNotificationDetails: {
            display: true;
            title: string;
            from?: string | undefined;
            customerName?: string | undefined;
            message?: string | undefined;
            contactId?: string | undefined;
            skillName?: string | undefined;
        };
        avNotifications: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        notifiedEvents: import("immer/dist/internal").WritableDraft<InteractionDetails>[];
        currentHeadsetDevice: import("immer/dist/internal").WritableDraft<HeadsetDevice>;
        headsetDeviceList: import("immer/dist/internal").WritableDraft<HeadsetDevice>[];
    };
    /**
     * Reducer function to store Current Headset Device
     * @param state - NotificationSettingsState
     * @param action - action.payload
     * @example - dispatch(storeCurrentHeadsetDevice());
     * @returns - updated state
     */
    storeCurrentHeadsetDevice(state: import("immer/dist/internal").WritableDraft<{
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: InteractionDetails[];
        visualNotificationDetails: VisualNotificationDetails;
        currentHeadsetDevice: HeadsetDevice;
        headsetDeviceList: HeadsetDevice[];
    }>, action: PayloadAction<HeadsetDevice>): {
        currentHeadsetDevice: HeadsetDevice;
        avNotifications: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        notifiedEvents: import("immer/dist/internal").WritableDraft<InteractionDetails>[];
        visualNotificationDetails: import("immer/dist/internal").WritableDraft<VisualNotificationDetails>;
        headsetDeviceList: import("immer/dist/internal").WritableDraft<HeadsetDevice>[];
    };
    /**
     * Reducer function to store Headset Device List
     * @param state - NotificationSettingsState
     * @param action - action.payload
     * @example - dispatch(storeHeadsetDeviceList());
     * @returns - updated state
     */
    storeHeadsetDeviceList(state: import("immer/dist/internal").WritableDraft<{
        avNotifications: CXoneAudioVisualNotificationSettings;
        notifiedEvents: InteractionDetails[];
        visualNotificationDetails: VisualNotificationDetails;
        currentHeadsetDevice: HeadsetDevice;
        headsetDeviceList: HeadsetDevice[];
    }>, action: PayloadAction<HeadsetDevice[]>): {
        headsetDeviceList: HeadsetDevice[];
        avNotifications: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        notifiedEvents: import("immer/dist/internal").WritableDraft<InteractionDetails>[];
        visualNotificationDetails: import("immer/dist/internal").WritableDraft<VisualNotificationDetails>;
        currentHeadsetDevice: import("immer/dist/internal").WritableDraft<HeadsetDevice>;
    };
}, "notificationSettings">;
export declare const storeNotificationSettings: import("@reduxjs/toolkit").ActionCreatorWithPayload<CXoneAudioVisualNotificationSettings, "notificationSettings/storeNotificationSettings">, storeNotifiedEvents: import("@reduxjs/toolkit").ActionCreatorWithPayload<InteractionDetails, "notificationSettings/storeNotifiedEvents">, storeVisualNotifications: import("@reduxjs/toolkit").ActionCreatorWithPayload<VisualNotificationDetails, "notificationSettings/storeVisualNotifications">, removeNotifiedEvent: import("@reduxjs/toolkit").ActionCreatorWithPayload<InteractionDetails, "notificationSettings/removeNotifiedEvent">, storeCurrentHeadsetDevice: import("@reduxjs/toolkit").ActionCreatorWithPayload<HeadsetDevice, "notificationSettings/storeCurrentHeadsetDevice">, storeHeadsetDeviceList: import("@reduxjs/toolkit").ActionCreatorWithPayload<HeadsetDevice[], "notificationSettings/storeHeadsetDeviceList">;
export declare const notificationsSettingsReducer: import("redux").Reducer<{
    avNotifications: CXoneAudioVisualNotificationSettings;
    notifiedEvents: InteractionDetails[];
    visualNotificationDetails: VisualNotificationDetails;
    currentHeadsetDevice: HeadsetDevice;
    headsetDeviceList: HeadsetDevice[];
}, import("redux").AnyAction>;
export declare const getAVNotifications: ((state: {
    notificationSettings: CXoneAgentSettings;
}) => CXoneAudioVisualNotificationSettings) & import("reselect").OutputSelectorFields<(args_0: CXoneAgentSettings) => CXoneAudioVisualNotificationSettings & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getVisualNotification: ((state: {
    notificationSettings: CXoneAgentSettings;
}) => VisualNotificationDetails) & import("reselect").OutputSelectorFields<(args_0: CXoneAgentSettings) => VisualNotificationDetails & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getCurrentHeadsetDevice: ((state: {
    notificationSettings: CXoneAgentSettings;
}) => HeadsetDevice) & import("reselect").OutputSelectorFields<(args_0: CXoneAgentSettings) => HeadsetDevice & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getHeadsetDeviceList: ((state: {
    notificationSettings: CXoneAgentSettings;
}) => HeadsetDevice[]) & import("reselect").OutputSelectorFields<(args_0: CXoneAgentSettings) => HeadsetDevice[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
