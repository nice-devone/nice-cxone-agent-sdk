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
        this.audioAgentMessage = data === null || data === void 0 ? void 0 : data.AudioAgentMessage;
        this.audioEndContact = data === null || data === void 0 ? void 0 : data.AudioEndContact;
        this.audioNewContactReply = data === null || data === void 0 ? void 0 : data.AudioNewContactReply;
        this.audioNewContact = data === null || data === void 0 ? void 0 : data.AudioNewContact;
        this.visualAgentMessage = data === null || data === void 0 ? void 0 : data.VisualAgentMessage;
        this.visualEndContact = data === null || data === void 0 ? void 0 : data.VisualEndContact;
        this.visualNewContactReply = data === null || data === void 0 ? void 0 : data.VisualNewContactReply;
        this.visualNewContact = data === null || data === void 0 ? void 0 : data.VisualNewContact;
        this.visualNewChat = data === null || data === void 0 ? void 0 : data.VisualNewChat;
        this.audioAgentMessageTone = data === null || data === void 0 ? void 0 : data.AudioAgentMessageTone;
        this.audioEndContactTone = data === null || data === void 0 ? void 0 : data.AudioEndContactTone;
        this.audioNewContactReplyTone = data === null || data === void 0 ? void 0 : data.AudioNewContactReplyTone;
        this.audioNewContactTone = data === null || data === void 0 ? void 0 : data.AudioNewContactTone;
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const avNotification = data === null || data === void 0 ? void 0 : data.avNotification;
        return {
            AudioAgentMessage: (_a = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioAgentMessage) !== null && _a !== void 0 ? _a : clientData.AudioAgentMessage,
            AudioEndContact: (_b = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioEndContact) !== null && _b !== void 0 ? _b : clientData.AudioEndContact,
            AudioNewContactReply: (_c = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioNewContactReply) !== null && _c !== void 0 ? _c : clientData.AudioNewContactReply,
            AudioNewContact: (_d = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioNewContact) !== null && _d !== void 0 ? _d : clientData.AudioNewContact,
            VisualAgentMessage: (_e = avNotification === null || avNotification === void 0 ? void 0 : avNotification.visualAgentMessage) !== null && _e !== void 0 ? _e : clientData.VisualAgentMessage,
            VisualEndContact: (_f = avNotification === null || avNotification === void 0 ? void 0 : avNotification.visualEndContact) !== null && _f !== void 0 ? _f : clientData.VisualEndContact,
            VisualNewContactReply: (_g = avNotification === null || avNotification === void 0 ? void 0 : avNotification.visualNewContactReply) !== null && _g !== void 0 ? _g : clientData.VisualNewContactReply,
            VisualNewContact: (_h = avNotification === null || avNotification === void 0 ? void 0 : avNotification.visualNewContact) !== null && _h !== void 0 ? _h : clientData.VisualNewContact,
            VisualNewChat: (_j = avNotification === null || avNotification === void 0 ? void 0 : avNotification.visualNewChat) !== null && _j !== void 0 ? _j : clientData.VisualNewChat,
            AudioAgentMessageTone: (_k = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioAgentMessageTone) !== null && _k !== void 0 ? _k : clientData.AudioAgentMessageTone,
            AudioEndContactTone: (_l = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioEndContactTone) !== null && _l !== void 0 ? _l : clientData.AudioEndContactTone,
            AudioNewContactReplyTone: (_m = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioNewContactReplyTone) !== null && _m !== void 0 ? _m : clientData.AudioNewContactReplyTone,
            AudioNewContactTone: (_o = avNotification === null || avNotification === void 0 ? void 0 : avNotification.audioNewContactTone) !== null && _o !== void 0 ? _o : clientData.AudioNewContactTone,
        };
    }
}
exports.CXoneAudioVisualNotificationSettings = CXoneAudioVisualNotificationSettings;
//# sourceMappingURL=cxone-audio-visual-notification-settings.js.map