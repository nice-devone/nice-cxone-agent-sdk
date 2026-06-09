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
        var _a, _b;
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
                words: [
                    ...data.words
                ],
            },
        };
    }
    ;
}
exports.VoiceTranscriptionResponse = VoiceTranscriptionResponse;
//# sourceMappingURL=voice-transcription-response.js.map