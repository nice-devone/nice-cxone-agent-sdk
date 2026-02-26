import { __awaiter } from "tslib";
import { CXoneClient } from '@nice-devone/agent-sdk';
import { RecordingMessages, RecordingStatus, RecordingStatusReason, } from '@nice-devone/common-sdk';
import { createAsyncThunk, createSelector, createSlice, } from '@reduxjs/toolkit';
import { Logger } from '@nice-devone/core-sdk';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { ToastMessageType } from '../../enums/toast-message-type';
export const AGENT_NOTIFICATION_KEY = 'agentNotification';
export var NotificationTemplate;
(function (NotificationTemplate) {
    NotificationTemplate["PUBLISH_SCHEDULE_FOR_SPECIFIC_DATE"] = "PUBLISH_SCHEDULE_FOR_SPECIFIC_DATE";
    NotificationTemplate["PUBLISH_SCHEDULE_BETWEEN_DATE"] = "PUBLISH_SCHEDULE_BETWEEN_DATE";
    NotificationTemplate["APPROVED_TIME_OFF_REQUEST"] = "APPROVED_TIME_OFF_REQUEST_V3";
    NotificationTemplate["SHIFT_TRADING_ACCEPTED"] = "SHIFT_TRADING_ACCEPTED";
    NotificationTemplate["SHIFT_TRADING_APPROVED"] = "SHIFT_TRADING_APPROVED";
})(NotificationTemplate || (NotificationTemplate = {}));
const logger = new Logger();
const intialNotificationState = {
    notifications: [],
    acdNotifications: [],
    newAcdNotification: {},
    newRecordingNotification: {},
    isNotificationNavigationKeyPressed: false,
    conversations: [],
    newConversationNotification: {},
};
/**
 * Function to establish websocket connection and get notifications
 * @example - dispatch(fetchAllNotifications())
 */
export const fetchAllNotifications = createAsyncThunk('notifications/fetchAllNotifications', () => __awaiter(void 0, void 0, void 0, function* () {
    CXoneClient.instance.notification
        .startWemWebSocket({
        locale: Intl.DateTimeFormat().resolvedOptions().locale || '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    })
        .catch((err) => {
        logger.error('fetchAllNotifications', JSON.stringify(err));
        return [];
    });
}));
/**
 * Function to send notification acknowledgement
 * @example - dispatch(markNotificationsAknowledged())
 */
export const markNotificationsAknowledged = createAsyncThunk('notifications/markNotificationsAknowledged', (msgId) => __awaiter(void 0, void 0, void 0, function* () {
    CXoneClient.instance.notification.sendWemAcknowledge(msgId);
}));
/**
 * Function to send acd notification markread acknowledgement
 * @example - dispatch(markACDNotification(1234))
 */
export const markACDNotification = createAsyncThunk('notifications/markACDNotification', (notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    CXoneAcdClient.instance.notification.markACDNotificationAcknowledge(notificationId)
        .catch((err) => {
        logger.error('markACDNotification', JSON.stringify(err));
        return;
    });
}));
/**
 * Function to get active acd notifications
 * @example - dispatch(getActiveACDNotifications())
 */
export const getActiveACDNotifications = createAsyncThunk('notifications/activeACDnotifications', () => __awaiter(void 0, void 0, void 0, function* () {
    CXoneAcdClient.instance.notification.getAgentMessageNotification();
}));
/**
 * Function to get active recording notifications
 * @example -
 * ```
 * dispatch(getActiveRecordingNotifications())
 * ```
 * @returns - Promise that resolves to an array of WemNotificationRecordingData
 */
export const getActiveRecordingNotifications = createAsyncThunk('notifications/activeRecordingNotifications', (_, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recordingNotifications = yield CXoneAcdClient.instance.notification.voiceRecordingStatusProvider.getVoiceRecordingStatus();
        dispatch(agentWemNotificationsActions.processRecordingNotifications(recordingNotifications));
        return recordingNotifications;
    }
    catch (error) {
        logger.error('getActiveRecordingNotifications', JSON.stringify(error));
        throw error;
    }
}));
/**
 * Function to update voice call recording state
 * @param isRecording - boolean indicating if the voice call is being recorded
 * @example
 * ```
 * updateVoiceCallRecordState(true)
 * ```
 */
export const updateVoiceCallRecordState = createAsyncThunk('notifications/updateVoiceCallRecordState', (isRecording) => __awaiter(void 0, void 0, void 0, function* () {
    CXoneAcdClient.instance.contactManager.updateVoiceCallRecordState(isRecording);
}));
/**
 * Function to update recording message based on recording status
 * @param recordingNotification - WemNotificationRecordingData
 * @returns Updated WemNotificationRecordingData
 * @example
 * ```
 * updateRecordingMessage(recordingNotification)
 * ```
 */
export const updateRecordingMessage = (recordingNotification) => {
    let isRecording = false;
    let messageKey = RecordingMessages.RECORDING_FAILURE;
    let toastType = ToastMessageType.FAILURE;
    switch (recordingNotification === null || recordingNotification === void 0 ? void 0 : recordingNotification.status) {
        case RecordingStatus.RECORDING:
            isRecording = true;
            messageKey = RecordingMessages.RECORDING_STARTED;
            toastType = ToastMessageType.INFO;
            break;
        case RecordingStatus.STOPPED:
            messageKey = RecordingMessages.RECORDING_STOPPED;
            toastType = ToastMessageType.INFO;
            break;
        case RecordingStatus.RECORDING_FAILURE:
        case RecordingStatus.POOR_QUALITY:
        default:
            break;
    }
    return Object.assign(Object.assign({}, recordingNotification), { isRecording,
        messageKey,
        toastType });
};
export const notificationSlice = createSlice({
    name: AGENT_NOTIFICATION_KEY,
    initialState: intialNotificationState,
    reducers: {
        /**
         * Function to set conversaions notifications
         * @param state - agentnotifications
         * @param action  - PayloadAction<AgentMessageNotification>
         * @returns It returns updated conversations notifications
         * @example -processAndSetConversationsNotifications()
         */
        processAndSetConversationsNotifications(state, action) {
            var _a;
            const currentMessage = action.payload;
            const messageArray = [...state.conversations, ...currentMessage];
            const updatedMessage = messageArray.sort((a, b) => new Date(b.receivedDateTime).getTime() - new Date(a.receivedDateTime).getTime());
            return Object.assign(Object.assign({}, state), { conversations: updatedMessage, newConversationNotification: ((_a = updatedMessage[0]) === null || _a === void 0 ? void 0 : _a.msgRead)
                    ? {}
                    : updatedMessage[0] });
        },
        /**
         * Function to set agent notifications
         * @param state - agentnotifications
         * @param action  - PayloadAction<WemNotificationDisplayData>
         * @returns It returns updated agent notifications
         * @example -processAndSetNotifications()
         */
        processAndSetNotifications(state, action) {
            const currentMessage = action.payload;
            const messageArray = [...state.notifications, currentMessage];
            const sortedArray = messageArray.sort((a, b) => new Date(b.receivedDateTime).getTime() -
                new Date(a.receivedDateTime).getTime());
            return Object.assign(Object.assign({}, state), { notifications: sortedArray });
        },
        /**
         * Function to set agent's ACD notifications
         * @param state - agentnotifications
         * @param action  - PayloadAction<AgentMessageNotification>
         * @returns It returns updated agent notifications
         * @example -processAndSetACDNotifications()
         */
        processAndSetACDNotifications(state, action) {
            var _a;
            const acdMessages = [].slice.call(action.payload);
            const sortedAcdMessage = (acdMessages || []).sort((a, b) => new Date(b.receivedDateTime).getTime() -
                new Date(a.receivedDateTime).getTime());
            return Object.assign(Object.assign({}, state), { acdNotifications: [...sortedAcdMessage], newAcdNotification: ((_a = sortedAcdMessage[0]) === null || _a === void 0 ? void 0 : _a.msgRead) ? {} : sortedAcdMessage[0] });
        },
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
        processRecordingNotifications(state, action) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            if (!action.payload || action.payload.status === RecordingStatus.NO_RECORDING) {
                return state;
            }
            if (((_a = state.newRecordingNotification) === null || _a === void 0 ? void 0 : _a.timestamp) &&
                ((_b = action.payload) === null || _b === void 0 ? void 0 : _b.timestamp) &&
                new Date(state.newRecordingNotification.timestamp).getTime() > new Date(action.payload.timestamp).getTime()) {
                return state;
            }
            if (((_c = action.payload) === null || _c === void 0 ? void 0 : _c.status) === RecordingStatus.STOPPED &&
                [
                    RecordingStatusReason.HOLD,
                    RecordingStatusReason.MASK,
                    RecordingStatusReason.STOP_ON_DEMAND
                ].indexOf((_d = action.payload) === null || _d === void 0 ? void 0 : _d.reason) === -1) {
                const newRecordingNotification = updateRecordingMessage(action.payload);
                newRecordingNotification.isRealtimeNotificationEnabled = false;
                return Object.assign(Object.assign({}, state), { newRecordingNotification });
            }
            if (((_e = state.newRecordingNotification) === null || _e === void 0 ? void 0 : _e.recordingId) === ((_f = action.payload) === null || _f === void 0 ? void 0 : _f.recordingId) &&
                ((_g = state.newRecordingNotification) === null || _g === void 0 ? void 0 : _g.status) === ((_h = action.payload) === null || _h === void 0 ? void 0 : _h.status) &&
                ((_j = state.newRecordingNotification) === null || _j === void 0 ? void 0 : _j.recordingStreamDirection) !== ((_k = action.payload) === null || _k === void 0 ? void 0 : _k.recordingStreamDirection)) {
                return state;
            }
            if (((_l = action.payload) === null || _l === void 0 ? void 0 : _l.template) === 'RecordingManagerStatus' &&
                ((_m = state.newRecordingNotification) === null || _m === void 0 ? void 0 : _m.status) === ((_o = action.payload) === null || _o === void 0 ? void 0 : _o.status) &&
                ((_p = state.newRecordingNotification) === null || _p === void 0 ? void 0 : _p.contactId) === ((_q = action.payload) === null || _q === void 0 ? void 0 : _q.contactId)) {
                return state;
            }
            return Object.assign(Object.assign({}, state), { newRecordingNotification: updateRecordingMessage(action.payload) });
        },
        /**
         * Function to update last shown recording notification
         * @param state - agentnotifications
         * @returns It returns updated last shown recording notification
         * @example
         * ```
         * removeRecordingNotification()
         * ```
         */
        removeRecordingNotification(state) {
            return Object.assign(Object.assign({}, state), { newRecordingNotification: {} });
        },
        /**
         * Function to mark read conversation
         * @param state - conversation notifications
         * @returns It returns updated conversation notifications
         * @example -markConversationsNotificatonRead()
         */
        markConversationsNotificatonRead(state, action) {
            const updatedConversations = state.conversations.map((conversation) => conversation.id === action.payload
                ? Object.assign(Object.assign({}, conversation), { msgRead: true }) : conversation);
            return Object.assign(Object.assign({}, state), { conversations: updatedConversations });
        },
        /**
         * Function to set agent's ACD notifications
         * @param state - agentnotifications
         * @returns It returns updated agent notifications
         * @example -markAcdNotificatonRead()
         */
        markAcdNotificatonRead(state) {
            return Object.assign(Object.assign({}, state), { newAcdNotification: {} });
        },
        /**
         * Function to set msgRead as true for WEM notifications
         * @param state - notifications
         * @returns It returns updated WEM notifications
         * @example
         * ```
         * markWemNotificationsAcknowledged()
         * ```
         */
        markWemNotificationsAcknowledged(state) {
            return Object.assign(Object.assign({}, state), { notifications: state.notifications.map((notification) => !notification.msgRead
                    ? Object.assign(Object.assign({}, notification), { msgRead: true }) : Object.assign({}, notification)) });
        },
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
        focusNotification(state, action) {
            return Object.assign(Object.assign({}, state), { isNotificationNavigationKeyPressed: action.payload });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(markNotificationsAknowledged.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { notifications: state.notifications.map((notification) => !notification.msgRead
                    ? Object.assign(Object.assign({}, notification), { msgRead: true }) : Object.assign({}, notification)) });
        });
    },
});
export const agentWemNotificationsActions = notificationSlice.actions;
export const agentWemNotificationsReducer = notificationSlice.reducer;
/**
 * Function to get agent notifications
 * @param rootState - AgentNotification
 * @returns It returns agent notifications
 * @example - const agentNotification = getAgentNotifications(rootState)
 */
const getAgentNotifications = (rootState) => {
    return rootState[AGENT_NOTIFICATION_KEY];
};
/**
 * Used to get unread notifications
 * @example - const notificationCount = useSelector(getUnreadNotificationCount);
 */
export const getUnreadNotifications = createSelector(getAgentNotifications, (state) => [...state.notifications, ...state.acdNotifications, ...state.conversations].filter((notification) => notification.msgRead === false));
/**
 * Used to get unread ACD notifications
 * @example - const notificationCount = useSelector(getAcdUnreadNotification);
 */
export const getNewAcdUnreadNotification = createSelector(getAgentNotifications, (state) => state.newAcdNotification);
/**
 * Used to get new Recording Notification
 * @example
 * ```
 * const newRecordingNotification = useSelector(getNewRecordingNotification);
 * ```
 */
export const getNewRecordingNotification = createSelector(getAgentNotifications, (state) => state.newRecordingNotification);
/**
 * Used to get new conversations notifications
 * @example - const conversation = useSelector(getNewConversationNotification);
 */
export const getNewConversationNotification = createSelector(getAgentNotifications, (state) => state.newConversationNotification);
/**
 * Used to get unread Conversations notifications
 * @example - const notificationCount = useSelector(getConversationsUnreadNotification);
 */
export const getConversationsUnreadNotification = createSelector(getAgentNotifications, (state) => state.conversations.filter((notification) => notification.msgRead === false));
/**
 * Used to get Wem Notifications
 * @example - const wemNotifications = useSelector(getWemNotifications);
 */
export const getWemNotifications = createSelector(getAgentNotifications, (state) => state.notifications);
/**
 * Used to get acd Notifications
 * @example - const acdNotifications = useSelector(getAcdNotifications);
 */
export const getAcdNotifications = createSelector(getAgentNotifications, (state) => state.acdNotifications);
/**
 * Used to get All Notifications
 * @example - const allNotifications = useSelector(getAllNotification);
 */
export const getAllNotification = createSelector(getAgentNotifications, (state) => [...state.notifications, ...state.acdNotifications, ...state.conversations].sort((a, b) => new Date(b.receivedDateTime).getTime() -
    new Date(a.receivedDateTime).getTime()));
/**
 * Used to get schedule change Notifications
 * @example - const wemScheduleChangeNotifications = useSelector(getWemScheduleChangeNotifications);
 */
export const getWemScheduleChangeNotifications = createSelector(getAgentNotifications, (state) => state.notifications.filter((notification) => Object.values(NotificationTemplate).includes(notification.template)));
/**
 * Used to get isNotificationNavigationKeyPressed status
 * @example - const isNotificationKeyPressed = useSelector(getNotificationKeyStatus);
 */
export const getNotificationKeyStatus = createSelector(getAgentNotifications, (state) => state.isNotificationNavigationKeyPressed);
//# sourceMappingURL=ccf-agent-notification.slice.js.map