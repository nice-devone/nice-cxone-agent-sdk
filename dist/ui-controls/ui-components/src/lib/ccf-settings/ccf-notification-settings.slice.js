import { __awaiter } from "tslib";
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { CallContactEventStatus, LocalStorageHelper, StorageKeys, VoiceMailContactEventStatus } from '@nice-devone/core-sdk';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { CXoneLeaderElector, NotificationTypeEnum, WemNotificationDisplayData, WorkItemContactStatus, } from '@nice-devone/common-sdk';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
import { CXoneVoiceContact, CXoneVoiceMailContact, CXoneWorkItemContact } from '@nice-devone/acd-sdk';
export const NOTIFICATION_SETTINGS_KEY = 'notificationSettings';
export var NotificationType;
(function (NotificationType) {
    NotificationType["INCOMING_VOICE_INTERACTION"] = "IncomingVoiceInteraction";
    NotificationType["INCOMING_DIGITAL_INTERACTION"] = "IncomingDigitalInteraction";
    NotificationType["NEW_REPLY_DIGITAL_INTERACTION"] = "newReplyDigitalInteraction";
    NotificationType["NEW_AGENT_MESSAGE"] = "NewAgentMessage";
    NotificationType["END_INTERACTION"] = "EndInteraction";
    NotificationType["END_DIGITAL_INTERACTION"] = "EndDigitalInteraction";
    NotificationType["INCOMING_VOICEMAIL_INTERACTION"] = "IncomingVoicemailInteraction";
    NotificationType["INCOMING_WORKITEM_INTERACTION"] = "IncomingWorkitemInteraction";
})(NotificationType || (NotificationType = {}));
/**
 *
 * @param skillID - Skill ID number used to find name of the skill
 * @param agentSkills - the list of all assigned agent skills
 * @returns - string - the name of the skill
 * @example - GetSkillName('12345', agentSkills) will return the name of the skill with ID '12345'
 */
const GetSkillName = (skillID, agentSkills) => {
    var _a;
    const skillIDNumber = parseInt(skillID);
    const matchingSkills = agentSkills.filter((skill) => skill.skillId === skillIDNumber);
    return matchingSkills.length > 0 ? (_a = matchingSkills[0]) === null || _a === void 0 ? void 0 : _a.skillName : skillID;
};
let incomingVoiceContactAudio = null;
const intialNotificationSettingsState = {
    avNotifications: {
        audioAgentMessage: false,
        audioAgentMessageTone: 'agent-message',
        audioEndContact: false,
        audioEndContactTone: 'end-contact',
        audioNewContactReply: false,
        audioNewContactReplyTone: 'new-chat-message',
        audioNewContact: false,
        audioNewContactTone: 'new-contact',
        visualAgentMessage: false,
        visualEndContact: false,
        visualNewContactReply: false,
        visualNewContact: false,
    },
    notifiedEvents: [],
    visualNotificationDetails: {
        title: '',
        from: '',
        customerName: '',
        message: '',
        contactId: '0',
        skillName: '',
        display: false,
    },
    currentHeadsetDevice: {
        name: '',
        id: '0',
    },
    headsetDeviceList: [],
};
export const fetchAllNotificationSettings = createAsyncThunk('notificationSettings/allNotificationSettings', (_, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const notificationSettingsFromIDB = (_a = yield CXoneClient.instance.agentSetting.getNotificationSettings()) !== null && _a !== void 0 ? _a : intialNotificationSettingsState.avNotifications;
    dispatch(notificationsSettingsActions.storeNotificationSettings(notificationSettingsFromIDB));
    return notificationSettingsFromIDB;
}));
export const setAllNotificationSettings = createAsyncThunk('notificationSettings/setNotificationSettings', (updatedSettings) => __awaiter(void 0, void 0, void 0, function* () {
    yield CXoneClient.instance.agentSetting.setNotificationSettings(updatedSettings);
}));
export const clearNotificationSettingsfromIDB = createAsyncThunk('notificationSettings/clearNotificationSettingsfromIDB', () => __awaiter(void 0, void 0, void 0, function* () {
    CXoneClient.instance.agentSetting.clearNotificationSettings();
}));
export const handleCXoneAudioVisualNotification = createAsyncThunk('notificationSettings/handleCXoneAudioVisualNotification', ({ type, payload, }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const reduxState = getState();
    const { notificationSettings, agentNotification, voicePreference } = reduxState;
    const agentSkills = (_b = reduxState === null || reduxState === void 0 ? void 0 : reduxState.agentSkillDetails) === null || _b === void 0 ? void 0 : _b.agentSkills;
    const isConversationsStandAlone = LocalStorageHelper.getItem(StorageKeys.IS_CONVERSATIONS_STANDALONE, true) === true;
    if (CXoneLeaderElector.instance.isLeader) {
        switch (type) {
            case NotificationType.INCOMING_VOICE_INTERACTION: {
                if (payload instanceof CXoneVoiceContact) {
                    const isIncomingEventNotified = notificationSettings.notifiedEvents.some(event => event.id === payload.contactID && event.status === payload.status);
                    if ((payload.status === CallContactEventStatus.INCOMING || payload.status === CallContactEventStatus.CALL_BACK_DISCONNECTED) && !isIncomingEventNotified) {
                        if (notificationSettings.avNotifications.audioNewContact === true) {
                            playAudioForNotification(NotificationType.INCOMING_VOICE_INTERACTION, notificationSettings.avNotifications.audioNewContactTone);
                        }
                        if (notificationSettings.avNotifications.visualNewContact === true) {
                            const skill = GetSkillName(payload.skill, agentSkills);
                            dispatch(notificationsSettingsActions.storeVisualNotifications({ title: 'incomingInteraction', from: payload.ani, skillName: skill, contactId: payload.contactID }));
                        }
                        dispatch(notificationsSettingsActions.storeNotifiedEvents({ id: payload.contactID, skillName: payload.skillName, status: payload.status }));
                    }
                    const isDisconnectedEventNotified = notificationSettings.notifiedEvents.some(event => event.id === payload.contactID && event.status === payload.status);
                    if ((payload.status === CallContactEventStatus.DISCONNECTED) &&
                        !isDisconnectedEventNotified) {
                        if (notificationSettings.avNotifications.audioEndContact === true) {
                            playAudioForNotification(NotificationType.END_INTERACTION, notificationSettings.avNotifications.audioEndContactTone);
                        }
                        if (notificationSettings.avNotifications.visualEndContact === true) {
                            const skill = (_c = payload.skillName) !== null && _c !== void 0 ? _c : payload.skill;
                            dispatch(notificationsSettingsActions.storeVisualNotifications({ title: 'liveInteractionHasEnded', from: payload.ani, skillName: skill }));
                        }
                        dispatch(notificationsSettingsActions.storeNotifiedEvents({ id: payload.contactID, skillName: payload.skillName, status: payload.status }));
                    }
                }
                break;
            }
            case NotificationType.INCOMING_DIGITAL_INTERACTION: {
                if (payload instanceof CXoneDigitalContact) {
                    // Check if the event is already notified to avoid duplicate notifications during contact switch
                    const isDigitalCaseAssignedEventNotified = notificationSettings.notifiedEvents.some(event => event.id === payload.contactID);
                    if (!isDigitalCaseAssignedEventNotified) {
                        if (notificationSettings.avNotifications.audioNewContact === true) {
                            playAudioForNotification(NotificationType.INCOMING_DIGITAL_INTERACTION, notificationSettings.avNotifications.audioNewContactTone);
                        }
                        if (notificationSettings.avNotifications.visualNewContact === true) {
                            dispatch(notificationsSettingsActions.storeVisualNotifications({ title: 'incomingInteraction', customerName: payload.customerName, skillName: payload.skill }));
                        }
                        dispatch(notificationsSettingsActions.storeNotifiedEvents({ id: payload.contactID, skillName: payload.skillName, status: payload.status }));
                    }
                }
                break;
            }
            case NotificationType.INCOMING_VOICEMAIL_INTERACTION: {
                if (payload instanceof CXoneVoiceMailContact) {
                    const isIncomingVoicemailEventNotified = notificationSettings.notifiedEvents.some(event => event.id === payload.contactID && event.status === payload.status);
                    if (payload.status === VoiceMailContactEventStatus.INCOMING && !isIncomingVoicemailEventNotified) {
                        if (notificationSettings.avNotifications.audioNewContact === true && voicePreference.selectedVoicePreferenceValue !== 'WebRTC') {
                            playAudioForNotification(NotificationType.INCOMING_VOICEMAIL_INTERACTION, notificationSettings.avNotifications.audioNewContactTone);
                        }
                        if (notificationSettings.avNotifications.visualNewContact === true) {
                            const skill = GetSkillName(payload.skill, agentSkills);
                            dispatch(notificationsSettingsActions.storeVisualNotifications({ title: 'incomingInteraction', from: payload.from, contactId: payload.contactID, skillName: skill }));
                        }
                        dispatch(notificationsSettingsActions.storeNotifiedEvents({ id: payload.contactID, skillName: payload.skillName, status: payload.status }));
                    }
                }
                break;
            }
            case NotificationType.INCOMING_WORKITEM_INTERACTION: {
                if (payload instanceof CXoneWorkItemContact) {
                    const isIncomingWorkItemEventNotified = notificationSettings.notifiedEvents.some(event => event.id === payload.contactID && event.status === payload.status);
                    if (payload.status === WorkItemContactStatus.INCOMING && !isIncomingWorkItemEventNotified) {
                        if (notificationSettings.avNotifications.audioNewContact === true) {
                            playAudioForNotification(NotificationType.INCOMING_WORKITEM_INTERACTION, notificationSettings.avNotifications.audioNewContactTone);
                        }
                        if (notificationSettings.avNotifications.visualNewContact === true) {
                            const skill = GetSkillName(payload.skill, agentSkills);
                            dispatch(notificationsSettingsActions.storeVisualNotifications({ title: 'incomingInteraction', contactId: payload.contactID, skillName: skill }));
                        }
                        dispatch(notificationsSettingsActions.storeNotifiedEvents({ id: payload.contactID, skillName: payload.skillName, status: payload.status }));
                    }
                }
                break;
            }
            case NotificationType.END_DIGITAL_INTERACTION: {
                if (payload instanceof CXoneDigitalContact) {
                    if (notificationSettings.avNotifications.audioEndContact === true) {
                        playAudioForNotification(NotificationType.END_DIGITAL_INTERACTION, notificationSettings.avNotifications.audioEndContactTone);
                    }
                    if (notificationSettings.avNotifications.visualEndContact === true) {
                        dispatch(notificationsSettingsActions.storeVisualNotifications({ title: 'liveInteractionHasEnded', customerName: payload.customerName, skillName: payload.skill }));
                    }
                }
                break;
            }
            case NotificationType.NEW_REPLY_DIGITAL_INTERACTION: {
                if (payload instanceof CXoneDigitalContact) {
                    if (notificationSettings.avNotifications.audioNewContactReply === true) {
                        playAudioForNotification(NotificationType.NEW_REPLY_DIGITAL_INTERACTION, notificationSettings.avNotifications.audioNewContactReplyTone);
                    }
                    if (notificationSettings.avNotifications.visualNewContactReply === true) {
                        dispatch(notificationsSettingsActions.storeVisualNotifications({ title: 'newInteractionResponse', customerName: payload.customerName, skillName: payload.skill }));
                    }
                }
                break;
            }
            case NotificationType.NEW_AGENT_MESSAGE: {
                if (!(payload instanceof WemNotificationDisplayData ||
                    payload instanceof CXoneVoiceContact ||
                    payload instanceof CXoneDigitalContact ||
                    payload instanceof CXoneVoiceMailContact ||
                    payload instanceof CXoneWorkItemContact)) {
                    const notifications = payload.reverse();
                    let existingAcdNotifications = agentNotification.acdNotifications;
                    if (agentNotification.newAcdNotification) {
                        existingAcdNotifications = [...existingAcdNotifications, agentNotification.newAcdNotification];
                    }
                    const results = notifications.filter(({ id: id1 }) => !existingAcdNotifications.some(({ id: id2 }) => id2 === id1));
                    if (results.length > 0) {
                        results.map((element) => {
                            if (element.notificationType === 'AgentNotification' && element.msgRead === false) {
                                handleNewMessageNotification(element.message, element.subject);
                            }
                            else if (element.notificationType === NotificationTypeEnum.ConversationNotification && element.msgRead === false) {
                                if (isConversationsStandAlone) {
                                    handleNewConversationsMessageNotification(element.message, element.subject);
                                }
                                else {
                                    handleNewMessageNotification(element.message, element.subject);
                                }
                            }
                            return null;
                        });
                    }
                }
                if (payload instanceof WemNotificationDisplayData) {
                    handleNewMessageNotification(payload.message, payload.subject);
                }
                break;
            }
        }
    }
    /**
     *
     * @example - handleNewMessageNotification(message, subject);
     * @returns
     */
    function handleNewMessageNotification(message, subject) {
        if (notificationSettings.avNotifications.audioAgentMessage === true) {
            playAudioForNotification(NotificationType.NEW_AGENT_MESSAGE, notificationSettings.avNotifications.audioAgentMessageTone);
        }
        if (notificationSettings.avNotifications.visualAgentMessage === true) {
            const plainText = message.replace(/<\/?[^>]+(>|$)/g, ''); // to convert message that is sent in html format to plain text
            dispatch(notificationsSettingsActions.storeVisualNotifications({ title: 'newAgentMessage', message: `${subject}\n${plainText}` }));
        }
    }
    /**
     * handles new conversations message notification
     * @param message - message to be displayed in notification
     * @param subject - subject of the message
     * @example - handleNewConversationsMessageNotification(message, subject);
     * @returns
     */
    function handleNewConversationsMessageNotification(message, subject) {
        playAudioForNotification(NotificationType.NEW_AGENT_MESSAGE, 'new-chat-message');
        const plainText = message.replace(/<\/?[^>]+(>|$)/g, ''); // to convert message that is sent in html format to plain text
        dispatch(notificationsSettingsActions.storeVisualNotifications({ title: 'newAgentMessage', message: `${subject}\n${plainText}` }));
    }
}));
/**
 *
 * @example - playAudioForNotification(notificationType, audioFilePath);
 * @returns
 */
export const playAudioForNotification = (notificationType, audioFilePath, _loop = true) => {
    if ('Audio' in window) {
        switch (notificationType) {
            case NotificationType.INCOMING_VOICE_INTERACTION: {
                incomingVoiceContactAudio = new Audio(`/assets/audio/${audioFilePath}.mp3`);
                incomingVoiceContactAudio.play();
                break;
            }
            case NotificationType.INCOMING_DIGITAL_INTERACTION:
            case NotificationType.INCOMING_VOICEMAIL_INTERACTION:
            case NotificationType.NEW_REPLY_DIGITAL_INTERACTION: {
                let incomingDigitalContactAudio = null;
                incomingDigitalContactAudio = new Audio(`/assets/audio/${audioFilePath}.mp3`);
                incomingDigitalContactAudio.play();
                break;
            }
            case NotificationType.NEW_AGENT_MESSAGE: {
                let newAgentMessageAudio = null;
                newAgentMessageAudio = new Audio(`/assets/audio/${audioFilePath}.mp3`);
                newAgentMessageAudio.play();
                break;
            }
            case NotificationType.END_INTERACTION:
            case NotificationType.END_DIGITAL_INTERACTION: {
                let endContactAudio = null;
                endContactAudio = new Audio(`/assets/audio/${audioFilePath}.mp3`);
                endContactAudio.play();
                break;
            }
            default:
                break;
        }
    }
};
export const notificationSettingsSlice = createSlice({
    name: NOTIFICATION_SETTINGS_KEY,
    initialState: intialNotificationSettingsState,
    reducers: {
        /**
         * Reducer function to store Notification Settings
         * @param state - NotificationSettingsState
         * @param action - action.payload
         * @example - dispatch(storeNotificationSettings());
         * @returns - updated state
         */
        storeNotificationSettings(state, action) {
            return Object.assign(Object.assign({}, state), { avNotifications: action.payload });
        },
        /**
         * Reducer function to store Notified Events
         * @param state - NotificationSettingsState
         * @param action - action.payload
         * @example - dispatch(storeNotifiedEvents());
         * @returns - updated state
         */
        storeNotifiedEvents(state, action) {
            return Object.assign(Object.assign({}, state), { notifiedEvents: [...state.notifiedEvents, action.payload] });
        },
        /**
         * Reducer function to remove Notified Events
         * @param state - NotificationSettingsState
         * @param action - action.payload
         * @example - dispatch(removeNotifiedEvent());
         * @returns - updated state
         */
        removeNotifiedEvent(state, action) {
            return Object.assign(Object.assign({}, state), { notifiedEvents: [...state.notifiedEvents.filter(event => event.id !== action.payload.id)] });
        },
        /**
         * Reducer function to store Visual Notifications message
         * @param state - NotificationSettingsState
         * @param action - action.payload
         * @example - dispatch(storeVisualNotifications());
         * @returns - updated state
         */
        storeVisualNotifications(state, action) {
            return Object.assign(Object.assign({}, state), { visualNotificationDetails: Object.assign(Object.assign({}, action.payload), { display: true }) });
        },
        /**
         * Reducer function to store Current Headset Device
         * @param state - NotificationSettingsState
         * @param action - action.payload
         * @example - dispatch(storeCurrentHeadsetDevice());
         * @returns - updated state
         */
        storeCurrentHeadsetDevice(state, action) {
            return Object.assign(Object.assign({}, state), { currentHeadsetDevice: action.payload });
        },
        /**
         * Reducer function to store Headset Device List
         * @param state - NotificationSettingsState
         * @param action - action.payload
         * @example - dispatch(storeHeadsetDeviceList());
         * @returns - updated state
         */
        storeHeadsetDeviceList(state, action) {
            return Object.assign(Object.assign({}, state), { headsetDeviceList: action.payload });
        },
    },
});
export const notificationsSettingsActions = notificationSettingsSlice.actions;
export const { storeNotificationSettings, storeNotifiedEvents, storeVisualNotifications, removeNotifiedEvent, storeCurrentHeadsetDevice, storeHeadsetDeviceList } = notificationSettingsSlice.actions;
export const notificationsSettingsReducer = notificationSettingsSlice.reducer;
/**
 * Function to get notifications settings
 * @param rootState - NotificationSettings
 * @returns It returns notifications settings
 * @example - const notificationSettings = getNotificationsSettings(rootState)
 */
const getNotificationsSettings = (rootState) => {
    return rootState[NOTIFICATION_SETTINGS_KEY];
};
export const getAVNotifications = createSelector(getNotificationsSettings, (state) => state.avNotifications);
export const getVisualNotification = createSelector(getNotificationsSettings, (state) => state.visualNotificationDetails);
export const getCurrentHeadsetDevice = createSelector(getNotificationsSettings, (state) => state.currentHeadsetDevice);
export const getHeadsetDeviceList = createSelector(getNotificationsSettings, (state) => state.headsetDeviceList);
//# sourceMappingURL=ccf-notification-settings.slice.js.map