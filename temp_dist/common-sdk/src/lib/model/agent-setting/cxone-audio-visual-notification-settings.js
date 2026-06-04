"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneAudioVisualNotificationSettings = void 0;
/**
 * Model class for AVNotifications
 */
class CXoneAudioVisualNotificationSettings {
    ;
    /**
     * This method to parse AV notification details from client data
     * @param data -
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        this.audioAgentMessage = (_a = data === null || data === void 0 ? void 0 : data.AudioAgentMessage) !== null && _a !== void 0 ? _a : false;
        this.audioEndContact = (_b = data === null || data === void 0 ? void 0 : data.AudioEndContact) !== null && _b !== void 0 ? _b : false;
        this.audioNewContactReply = (_c = data === null || data === void 0 ? void 0 : data.AudioNewChat) !== null && _c !== void 0 ? _c : false;
        this.audioNewContact = (_d = data === null || data === void 0 ? void 0 : data.AudioNewContact) !== null && _d !== void 0 ? _d : false;
        this.visualAgentMessage = (_e = data === null || data === void 0 ? void 0 : data.VisualAgentMessage) !== null && _e !== void 0 ? _e : false;
        this.visualEndContact = (_f = data === null || data === void 0 ? void 0 : data.VisualEndContact) !== null && _f !== void 0 ? _f : false;
        this.visualNewContactReply = (_g = data === null || data === void 0 ? void 0 : data.VisualNewChat) !== null && _g !== void 0 ? _g : false;
        this.visualNewContact = (_h = data === null || data === void 0 ? void 0 : data.VisualNewContact) !== null && _h !== void 0 ? _h : false;
        this.visualNewChat = (_j = data === null || data === void 0 ? void 0 : data.VisualNewChat) !== null && _j !== void 0 ? _j : false;
        this.audioAgentMessageTone = (_k = data === null || data === void 0 ? void 0 : data.AudioAgentMessageTone) !== null && _k !== void 0 ? _k : 'agent-message';
        this.audioEndContactTone = (_l = data === null || data === void 0 ? void 0 : data.AudioEndContactTone) !== null && _l !== void 0 ? _l : 'end-contact';
        this.audioNewContactReplyTone = (_m = data === null || data === void 0 ? void 0 : data.AudioNewContactReplyTone) !== null && _m !== void 0 ? _m : 'new-chat-message';
        this.audioNewContactTone = (_o = data === null || data === void 0 ? void 0 : data.AudioNewContactTone) !== null && _o !== void 0 ? _o : 'new-contact';
    }
    /**
     * This method is to map CXoneAgentNotificationSettings to client Data that is sent in payload
     * @param clientData - clientData object with all properties
     * @param data - client data with av-notification and softphone setting properties
     * @example -
     * ```
     * mapper(data);
     * ```
     */
    mapper(clientData, data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const avNotification = data === null || data === void 0 ? void 0 : data.avNotification;
        return {
            AudioAgentMessage: (_a = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioAgentMessage) !== null && _a !== void 0 ? _a : clientData.AudioAgentMessage,
            AudioEndContact: (_b = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioEndContact) !== null && _b !== void 0 ? _b : clientData.AudioEndContact,
            AudioNewChat: (_c = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioNewContactReply) !== null && _c !== void 0 ? _c : clientData.AudioNewChat,
            AudioNewContact: (_d = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioNewContact) !== null && _d !== void 0 ? _d : clientData.AudioNewContact,
            VisualAgentMessage: (_e = avNotification === null || avNotification === void 0 ? void 0 : avNotification.visualAgentMessage) !== null && _e !== void 0 ? _e : clientData.VisualAgentMessage,
            VisualEndContact: (_f = avNotification === null || avNotification === void 0 ? void 0 : avNotification.visualEndContact) !== null && _f !== void 0 ? _f : clientData.VisualEndContact,
            VisualNewChat: (_g = avNotification === null || avNotification === void 0 ? void 0 : avNotification.visualNewContactReply) !== null && _g !== void 0 ? _g : clientData.VisualNewChat,
            VisualNewContact: (_h = avNotification === null || avNotification === void 0 ? void 0 : avNotification.visualNewContact) !== null && _h !== void 0 ? _h : clientData.VisualNewContact,
            AudioAgentMessageTone: (_j = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioAgentMessageTone) !== null && _j !== void 0 ? _j : clientData.AudioAgentMessageTone,
            AudioEndContactTone: (_k = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioEndContactTone) !== null && _k !== void 0 ? _k : clientData.AudioEndContactTone,
            AudioNewContactReplyTone: (_l = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioNewContactReplyTone) !== null && _l !== void 0 ? _l : clientData.AudioNewContactReplyTone,
            AudioNewContactTone: (_m = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioNewContactTone) !== null && _m !== void 0 ? _m : clientData.AudioNewContactTone,
        };
    }
}
exports.CXoneAudioVisualNotificationSettings = CXoneAudioVisualNotificationSettings;
//# sourceMappingURL=cxone-audio-visual-notification-settings.js.map