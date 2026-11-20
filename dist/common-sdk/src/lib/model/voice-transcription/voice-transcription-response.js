"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceTranscriptionResponse = void 0;
const agent_assist_command_1 = require("../../enum/agent-assist-command");
const agent_assist_base_response_1 = require("../agent-assist/agent-assist-base-response");
//TODO: This class may not be needed, and will be evalueated once the socket data response returns in the lab.
/**
 * Represents the WebSocket response for voice transcription.
 */
class VoiceTranscriptionResponse extends agent_assist_base_response_1.AgentAssistBaseResponse {
    /**
     * Initializes a new instance of the VoiceTranscriptionWebSocketResponse class.
     * @example
     * const voiceTranscriptionWebSocketResponse = new VoiceTranscriptionWebSocketResponse();
     */
    constructor(response) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        super(agent_assist_command_1.AgentAssistCommand.message, response === null || response === void 0 ? void 0 : response.headers);
        const respBody = response === null || response === void 0 ? void 0 : response.body;
        const { Data: data } = respBody;
        this.body = {
            topic: respBody.Topic,
            vendorList: respBody.VendorList || [],
            mediaType: respBody.MediaType,
            busNo: respBody.BusNo,
            messageType: respBody.MessageType,
            version: respBody.Version,
            traceId: respBody.TraceId,
            data: {
                transcriptionEventId: data.transcriptionEventId || '',
                contactId: data.contactId || 0,
                busNo: data.busNo || 0,
                tenantId: data.tenantId || '',
                agentUUId: data.agentUUId || '',
                masterId: data.masterId || '',
                participantId: data.participantId || '',
                messageBody: data.messageBody || '',
                messageMetaData: {
                    completeUtterance: ((_a = data.messageMetaData) === null || _a === void 0 ? void 0 : _a.completeUtterance) || false,
                },
                agentAssistAppConfig: {
                    scriptParams: ((_b = data.agentAssistAppConfig) === null || _b === void 0 ? void 0 : _b.scriptParams) || '',
                },
                messageIsCompletedUtterance: data.messageIsCompletedUtterance || false,
                agentId: data.agentId || 0,
                mediaType: data.mediaType || '',
                transcriptionSrNo: data.transcriptionSrNo || 0,
                languageCode: data.languageCode || '',
                channelTag: data.channelTag || null,
                createdtimestamp: data.createdtimestamp || '',
                audioProcessed: data.audioProcessed || '',
                transcriptionProvider: data.transcriptionProvider || '',
                words: ((_c = data.words) !== null && _c !== void 0 ? _c : []).map((group) => {
                    var _a;
                    return (Object.assign(Object.assign({}, group), { words: ((_a = group.words) !== null && _a !== void 0 ? _a : []).map((word) => {
                            var _a;
                            return (Object.assign(Object.assign({}, word), { speakerLabel: (_a = word.speakerLabel) !== null && _a !== void 0 ? _a : undefined }));
                        }) }));
                }),
                // V3 Telephony Routing Data
                ani: (_d = data.ani) !== null && _d !== void 0 ? _d : undefined,
                dnis: (_e = data.dnis) !== null && _e !== void 0 ? _e : undefined,
                direction: (_f = data.direction) !== null && _f !== void 0 ? _f : undefined,
                callType: (_g = data.callType) !== null && _g !== void 0 ? _g : undefined,
                // V3 Enhanced Identity & SIP Data
                participantName: (_h = data.participantName) !== null && _h !== void 0 ? _h : undefined,
                agentName: (_j = data.agentName) !== null && _j !== void 0 ? _j : undefined,
                masterContactId: (_k = data.masterContactId) !== null && _k !== void 0 ? _k : undefined,
                participantContactId: (_l = data.participantContactId) !== null && _l !== void 0 ? _l : undefined,
                sipParticipantId: (_m = data.sipParticipantId) !== null && _m !== void 0 ? _m : undefined,
                interactionId: (_o = data.interactionId) !== null && _o !== void 0 ? _o : undefined,
            },
        };
    }
    ;
}
exports.VoiceTranscriptionResponse = VoiceTranscriptionResponse;
//# sourceMappingURL=voice-transcription-response.js.map